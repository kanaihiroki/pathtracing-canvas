import {log} from "log";

// ベクトルを定義する
const V = numeric.T;

// カメラ位置
const camera_position = new V([50.0, 52.0, 220.0]),
    camera_dir      = new V([0.0, -0.04, -1.0]),
    camera_up       = new V([0.0, 1.0, 0.0]);

// スクリーンまでの距離
const screen_dist  = 40.0;

function cross(v1, v2) {
    var a = v1.x;
    var b = v2.x;
    return new V([a[1]*b[2] - a[2]*b[1],
            a[0]*b[2] - a[2]*b[0],
            a[0]*b[1] - a[1]*b[0]]);
//    return new V([x[1]*y[2] - x[2]*y[1], x[0]*y[2] - x[2]*y[0], x[0]*y[1] - x[1]*y[0]]);
}

function normalize(v) {
    var len = v.norm2();
    return v.div(len);
}

export function render(frameBuffer, width, height, samples) {
    // // ワールド座標系でのスクリーンの大きさ
    const screen_width = 30.0 * width / height,
        screen_height = 30.0;

    // スクリーンを張るベクトル
    const screen_x = normalize(cross(camera_dir, camera_up)).mul(screen_width),
        screen_y = normalize(cross(screen_x, camera_dir)).mul(screen_height),
        screen_center = camera_position.add(camera_dir.mul(screen_dist));

    return updateCanvas(frameBuffer, () => {
        let accumulated_radiance = 0;

        // 元の実装(edupt)では、supersamplesとsamplesでイテレーションしているが、
        // samples回のイテレーションは必要ないと思われるので削除した
        for (let sx = 0; sx < samples; ++sx) {
            for (let sy = 0; sy < samples; ++sy) {
//            const rate = (1.0 / supersamples);
//            const r1 = sx * rate + rate / 2.0;
//            const r2 = sy * rate + rate / 2.0;
// スクリーン上の位置
//             const screen_position =
//                screen_center +
//                screen_x * ((r1 + x) / width - 0.5) +
//                screen_y * ((r2 + y) / height- 0.5);
// レイを飛ばす方向
//            const dir = normalize(screen_position - camera_position);

                // accumulated_radiance = accumulated_radiance + radiance(Ray(camera_position, dir), &rnd, 0) / samples;
                accumulated_radiance = accumulated_radiance + Math.random()*100;
            }
        }

        return [accumulated_radiance, accumulated_radiance, accumulated_radiance,255];
    });
}

function updateCanvas(buffer, fn) {
    for (let i = 0, len = buffer.data.length; i < len; i += 4) {
        var color = fn(i);
        for (let j = 0; j < 4; ++j) {
            buffer.data[i+j] = color[j];
        }
    }

    return buffer;
}
