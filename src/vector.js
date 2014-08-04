/**
 * 新しいベクトルを生成するファクトリメソッド。
 * @returns {numeric.T} 新しいベクトル
 */
export function V(x, y, z) {
    return Object.freeze(new numeric.T([x, y, z]));
}

/**
 * 正規化ベクトルを計算する。
 * @param v 対象のベクトル
 * @returns {numeric.T} 正規化したベクトル
 */
export function normalize(v) {
    const len = v.norm2();
    return Object.freeze(v.div(len));
}

/**
 * ベクトルの外積を計算する。
 * @param v1 左辺値
 * @param v2 右辺値
 * @returns {numeric.T} 計算された外積
 */
export function cross(v1, v2) {
    var a = v1.x;
    var b = v2.x;
    return V(a[1]*b[2] - a[2]*b[1],
            a[0]*b[2] - a[2]*b[0],
            a[0]*b[1] - a[1]*b[0]);
}
