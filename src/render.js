import {log} from "log";

var cross = function(v1, v2) {
    return [v1[2]*v2[3] - v2[2]*v1[3]];
};

var normalize = function(v) {
    var len = numeric.norm2(v);
    return [for (a of v) a/len];
};

// カメラ位置
const camera_position = [50.0, 52.0, 220.0];
const camera_dir      = [0.0, -0.04, -1.0];
const camera_up       = [0.0, 1.0, 0.0];

// スクリーンまでの距離
const screen_dist  = 40.0;

export function render(width, height, samples) {
    // // ワールド座標系でのスクリーンの大きさ
    const screen_width = 30.0 * width / height;
    const screen_height = 30.0;

    // スクリーンを張るベクトル
    const screen_x = normalize(cross(camera_dir, camera_up)) * screen_width;
    const screen_y = normalize(cross(screen_x, camera_dir)) * screen_height;
    const screen_center = camera_position + camera_dir * screen_dist;
}
