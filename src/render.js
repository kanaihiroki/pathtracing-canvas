import {V,normalize,cross} from "vector";
import {Ray} from "Ray";
import {radiance} from "radiance";
// カメラ位置
const camera_position = V(50.0, 52.0, 220.0),
    camera_dir      = V(0.0, -0.04, -1.0),
    camera_up       = V(0.0, 1.0, 0.0);

// スクリーンまでの距離
const screen_dist  = 40.0;

export function render(frameBuffer, width, height, samples, y) {
    // // ワールド座標系でのスクリーンの大きさ
    const screen_width = 30.0 * width / height,
        screen_height = 30.0;

    // スクリーンを張るベクトル
    const screen_x = normalize(cross(camera_dir, camera_up)).mul(screen_width),
        screen_y = normalize(cross(screen_x, camera_dir)).mul(screen_height),
        screen_center = camera_position.add(camera_dir.mul(screen_dist));

    return updateCanvas(frameBuffer, width, y, (x, y) => {
        let accumulated_radiance = V(0.0, 0.0, 0.0);

        // 元の実装(edupt)では、supersamplesとsamplesでイテレーションしているが、
        // samples回のイテレーションは必要ないと思われるので削除した
        for (let sx = 0; sx < samples; ++sx) {
            for (let sy = 0; sy < samples; ++sy) {
                // rate は samples回のイテレーションで足し合わされることで合計1になる
                // r1, r2 は rate/2 から 1 + rate/2 まで滑らかに動く
                // samples = 2のとき, [1/4, 3/4]
                // samples = 4のとき、[1/8, 3/8, 5/8, 7/8]
                // つまり、 [0,1]間を等間隔にサンプリングしている
                const rate = (1.0 / samples),
                    r1 = sx * rate + rate / 2.0,
                    r2 = sy * rate + rate / 2.0;

                // スクリーン上での座標を計算
                const x_screen = screen_x.mul((r1 + x) / width - 0.5),
                    y_screen = screen_y.mul((r2 + y) / height- 0.5),
                    screen_position = screen_center.add(x_screen.add(y_screen));

                // Rayを飛ばす方向のベクトルを計算
                const dir = normalize(screen_position.sub(camera_position));

                const ray = new Ray(camera_position, dir),
                    rad = radiance(ray, 0),
                    difference = rad.div(Math.pow(samples, 2));

                accumulated_radiance = accumulated_radiance.add(difference);
            }
        }

        const colorArray = accumulated_radiance.x;
        const ret = [to_int(colorArray[0]), to_int(colorArray[1]), to_int(colorArray[2]), 255];
        console.log(ret);
        return ret;
    });
}

function clamp(x){
    if (x < 0.0)
        return 0.0;
    if (x > 1.0)
        return 1.0;
    return x;
}

const gamma = 1.0/2.2;

function to_int(x){
    const gamma_collected = Math.pow(clamp(x), gamma);
    return Math.floor(gamma_collected * 255 + 0.5);
}

function updateCanvas(buffer, width, y, fn) {
    for (let x = 0; x < width; ++x) {
        let color = fn(x, y);
        for (let j = 0; j < 4; ++j) {
            buffer.data[x*4+j] = color[j];
        }
    }

    /*
    for (let i = 0, len = buffer.data.length; i < len; i += 4) {
        var color = fn(i);
        for (let j = 0; j < 4; ++j) {
            buffer.data[i+j] = color[j];
        }
    }
    */

    return buffer;
}
