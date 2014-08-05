import {Color} from "Color";
import {intersect_scene} from "scene";
import {ReflectionType} from "material";
import {V,cross,normalize,multiply} from "vector";
import {Ray} from "Ray";
import {log} from "log";
import {kEPS} from "sphere"; // TODO: もっといい場所に移動

const backgroundColor = Object.freeze(new Color(0.0, 0.0, 0.0)),
    kDepth = 5, // ロシアンルーレットで打ち切らない最小数
    kDpethLimit = 64; // ロシアンルーレットで打ち切り確率を上げるときの再帰数しきい値

// TODO: 移動
const kIor = 1.5; // ガラスの屈折率


/**
 * コサイン項を使った重点的サンプリング。
 * ランバート反射面において BRDFは(反射率)/π となる。
 * 確率密度関数を cos(x)/π とするとサンプリングすると効率がよいとのこと。
 * TODO: ここはよくわからない!!
 * @param u {numeric.T} wに対する正規直行基底。
 * @param v {numeric.T} wに対する正規直行基底。
 * @param w {numeric.T} 法線方向の単位ベクトル。
 * @returns {numeric.T} [u,v,x]空間の上を覆う半径1の半球上のどこかをさすベクトル
 */
function sample_diffuse(u, v, w) {
    const r1 = 2 * Math.PI * Math.random(),
        r2 = Math.random(),
        r2s = Math.sqrt(r2),
        u_ = u.mul(Math.cos(r1) * r2s),
        v_ = v.mul(Math.sin(r1) * r2s),
        w_ = w.mul(Math.sqrt(1.0 - r2));

    return normalize(u_.add(v_).add(w_));
}

function reflect(normal, ray) {
    // TODO: ここも時間がないからよくわからない
    const cos = normal.dot(ray.dir);
    return ray.dir.sub(normal.mul(2.0 * cos));
}

export function radiance(ray, depth) {
    const intersection = intersect_scene(ray);
    if (intersection == void 0) {
        return backgroundColor;
    }

    const object = intersection.object,
        hitpoint = intersection.hitPoint;

    // 交差位置の法線（物体からのレイの入出を考慮）
    // N・R < 0 のとき、２つのベクトルの角度は、180度以上になるので
    const orienting_normal = hitpoint.normal.dot(ray.dir).x < 0.0
        ? hitpoint.normal // レイが物体にあたっている場合
        : (hitpoint.normal.mul(-1)); // レイが物体から出ている場合

    // 色の反射率最大のものを得る。ロシアンルーレットで使う。
    // ロシアンルーレットの閾値は任意だが色の反射率等を使うとより良い。
    let russian_roulette_probability =
        _.max([object.color.r, object.color.g, object.color.b]);

    // 反射回数が一定以上になったらロシアンルーレットの確率を急上昇させる。（スタックオーバーフロー対策）
    if (depth > kDpethLimit) {
        russian_roulette_probability *= Math.pow(0.5, depth - kDpethLimit);
    }

    // ロシアンルーレットを実行し追跡を打ち切るかどうかを判断する。
    // ただしDepth回の追跡は保障する。
    if (depth > kDepth) {
        if (Math.random() >= russian_roulette_probability)
            return object.emission;
    } else { // 最小試行回数以下では必ずレイの追跡を続ける。
        russian_roulette_probability = 1.0;
    }

    let incoming_radiance,
        weight = 1.0,
        dir; // 次のRayの方向

    switch (object.reflection_type) {
        // 完全拡散面
        case ReflectionType.DIFFUSE: {
            // orienting_normalの方向を基準とした正規直交基底(w, u, v)を作る。この基底に対する半球内で次のレイを飛ばす。
            let w, u, v;
            w = orienting_normal;
            // ベクトルwと直交するベクトルを作る。
            // w.xが0に近い場合とそうでない場合とで使うベクトルを変える。
            u = Math.abs(w.x[0]) > kEPS
                ? normalize(cross(V(0.0, 1.0, 0.0), w))
                : normalize(cross(V(1.0, 0.0, 0.0), w));
            v = cross(w, u);

            // 次にレイを飛ばす方向をインポータンスサンプリングで取得。
            dir = sample_diffuse(u, v, w);

            /*
             レンダリング方程式に対するモンテカルロ積分を考えると、outgoing_radiance = weight * incoming_radiance。
             ここで、weight = (ρ/π) * cosθ / pdf(ω) / R になる。
             ρ/πは完全拡散面のBRDFでρは反射率、cosθはレンダリング方程式におけるコサイン項、pdf(ω)はサンプリング方向についての確率密度関数。
             Rはロシアンルーレットの確率。
             今、コサイン項に比例した確率密度関数によるサンプリングを行っているため、pdf(ω) = cosθ/π
             よって、weight = ρ/ R。
             */
            incoming_radiance = radiance(new Ray(hitpoint.position, dir), depth+1);
            weight = object.color.asVector.div(russian_roulette_probability);
        } break;
        case ReflectionType.SPECULAR: {
            // 完全鏡面なのでレイの反射方向は決定的。
            // ロシアンルーレットの確率で除算するのは上と同じ。
            dir = reflect(hitpoint.normal, ray);
            incoming_radiance = radiance(new Ray(hitpoint.position, dir), depth+1);
            weight = object.color.asVector.div(russian_roulette_probability);
        } break;

        case ReflectionType.REFRACTION: {
            // 屈折率kIorのガラス
            const reflection_ray = new Ray(hitpoint.position, reflect(hitpoint.normal, ray)),
                into = hitpoint.normal.dot(orienting_normal).x > 0.0; // レイがオブジェクトから出るのか、入るのか
            // Snellの法則
            const nc = 1.0, // 真空の屈折率
                nt = kIor, // オブジェクトの屈折率
                nnt = into ? nc / nt : nt / nc,
                ddn = ray.dir.dot(orienting_normal).x,
                cos2t = 1.0 - nnt * nnt * (1.0 - ddn * ddn);

            if (cos2t < 0.0) { // 全反射
                incoming_radiance = radiance(reflection_ray, depth+1);
                weight = object.color.asVector.div(russian_roulette_probability);
                break;
            }

            // 屈折の方向
            const r1 = ray.dir.mul(nnt),
                r2 = hitpoint.normal.mul(into ? 1.0 : -1.0).mul(ddn * nnt + Math.sqrt(cos2t)),
                refraction_ray = new Ray(hitpoint.position, normalize(r1.sub(r2)));

// SchlickによるFresnelの反射係数の近似を使う
            const a = nt - nc, b = nt + nc;
            const R0 = (a * a) / (b * b);

            /*
            const c = 1.0 - (into ? -ddn : dot(refraction_ray.dir, -1.0 * orienting_normal));
            const Re = R0 + (1.0 - R0) * pow(c, 5.0); // 反射方向の光が反射してray.dirの方向に運ぶ割合。同時に屈折方向の光が反射する方向に運ぶ割合。
            const nnt2 = pow(into ? nc / nt : nt / nc, 2.0); // レイの運ぶ放射輝度は屈折率の異なる物体間を移動するとき、屈折率の比の二乗の分だけ変化する。
            const Tr = (1.0 - Re) * nnt2; // 屈折方向の光が屈折してray.dirの方向に運ぶ割合

// 一定以上レイを追跡したら屈折と反射のどちらか一方を追跡する。（さもないと指数的にレイが増える）
// ロシアンルーレットで決定する。
            const double probability = 0.25 + 0.5 * Re;
            if (depth > 2) {
                if (rnd->next01() < probability) { // 反射
                    incoming_radiance = radiance(reflection_ray, rnd, depth+1) * Re;
                    weight = now_object.color / (probability * russian_roulette_probability);
                } else { // 屈折
                    incoming_radiance = radiance(refraction_ray, rnd, depth+1) * Tr;
                    weight = now_object.color / ((1.0 - probability) * russian_roulette_probability);
                }
            } else { // 屈折と反射の両方を追跡
                incoming_radiance =
                    radiance(reflection_ray, rnd, depth+1) * Re +
                    radiance(refraction_ray, rnd, depth+1) * Tr;
                weight = now_object.color / (russian_roulette_probability);
            }
             */
        } break;
    }

    // return object.emission.add(multiply(weight, incoming_radiance));

    // return now_object.emission + multiply(weight, incoming_radiance);

    // フラットシェーディング
    return object.color;
}
