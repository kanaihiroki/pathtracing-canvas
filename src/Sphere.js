import {HitPoint} from "Intersection";
import {Ray} from "Ray";
import {Color} from "Color";
import {ReflectionType} from "material";
import {normalize} from "vector";

// 微小な値。交差判定で使う。
export const kEPS = 1e-6;

/**
 * 球を表すクラス。
 */
export class Sphere {
    /**
     * インスタンスを生成する。
     * @param radius {number} 半径
     * @param position {numeric.T} 位置を表すベクトル
     * @param emission {Color} 放射光の色
     * @param color {Color} 物体の色
     * @param reflection_type {number} 表面での反射の仕方
     */
    constructor(radius, position, emission, color, reflection_type) {
        this.radius = radius;
        this.position = position;
        this.emission = emission;
        this.color = color;
        this.reflection_type = reflection_type;
    }

    /*
     intersect関数の説明(mathjaxとかのlatexを見られるところにコピペして)
     直線と円の交差判定を以下のようにして行う。
     半径r、中心座標\vec{p}の円があったとする.\\
     ある座標\vec{x}がこの円の表面だとすると、以下の式が成り立つ。\\

     ||\vec{p} - \vec{x}|| = r
     \\
     直線の始点(べつに直線上ならどこでもいいんですが)を\vec{o}、方向を表す正規ベクトルを\vec{d}、ベクトルの長さをtとする。\\
     そうすると、直線上の任意の点は下式で表すことができる。\\
     \vec{o}+t \vec{d}
     \\
     上記二つをまとめると、以下のとおり。\\
     \begin{gather}
     ||\vec{p}-(\vec{o}+t \vec{d})|| = r \\
     (\vec{p}-(\vec{o}+t \vec{d}))^2=r^2 \\
     ((\vec{p}-\vec{o}) - t \vec{d})^2=r^2 \\
     \vec{d} \cdot \vec{d}t^2 -2 \vec{d} (\vec{p}-\vec{o})t + (\vec{p}-\vec{o}) \cdot (\vec{p}-\vec{o}) - r^2 = 0\\
     A= \vec{d} \cdot \vec{d} = 1 \\
     B= -2 \vec{d} (\vec{p}-\vec{o}) \\
     C= (\vec{p}-\vec{o}) \cdot (\vec{p}-\vec{o}) - r^2 \\
     D=B^2 - 4AC \\
     = (-2\vec{d}\cdot(\vec{p}-\vec{o}))^2-4AC \\
     = 4(\vec{d}\cdot(\vec{p}-\vec{o}))^2-4AC \\
     D/4 = (\vec{d}\cdot(\vec{p}-\vec{o}))^2- ((\vec{p}-\vec{o}) \cdot (\vec{p}-\vec{o}) - r^2) \ \ (判別式) \\
     t = \frac{B \pm \sqrt{D}}{2A} = \frac{\frac{B}{2} \pm \sqrt{\frac{D}{4}}}{A}\\
     = (\vec{d}\cdot(\vec{p}-\vec{o})) \pm \sqrt{\frac{D}{4}}
     \end{gather} \\
     上記、判別式と解の公式を計算している。
     */
    /**
     * rayとの交差判定を行う。
     * @param {Ray} ray
     * @returns {HitPoint} 交差した場合、HitPointオブジェクトを返す。交差しなかった場合はnull。
     */
     intersect(ray) {
        const p_o = this.position.sub(ray.org),
            b = p_o.dot(ray.dir).x,
            // 判別式
            D4 = Math.pow(b, 2) - (p_o.dot(p_o).x - Math.pow(this.radius, 2));

        if (D4 < 0.0) {
            return null;
        }

        const sqrt_D4 = Math.sqrt(D4),
            t1 = b - sqrt_D4,
            t2 = b + sqrt_D4;

        // 交差地点がRayの始点からかなり近い場所であるので
        // この場合は、交差地点からRayが離れていくと考えて無視する。
        if (t1 < kEPS && t2 < kEPS) {
            return null;
        }

        const distance = t1 > kEPS ? t1 : t2,
            position = ray.org.add(ray.dir.mul(distance)),
            normal = normalize(position.sub(this.position));
        return Object.freeze(new HitPoint(distance, normal, position));
    }
}
