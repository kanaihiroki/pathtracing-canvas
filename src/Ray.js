/**
 * レイを表すクラス。
 */
export class Ray {
    /**
     * レイの発射地点と、発射方向からインスタンスを生成する。
     * @param org {numeric.T} レイの発射地点
     * @param dir {numeric.T} レイの発射方向(正規化されていること)
     */
    constructor(org, dir) {
        this._org = org;
        this._dir = dir;
    }

    /**
     * レイの発射方向を取得する。
     * @returns {numeric.T} レイの発射方向
     */
    get dir() {
        return this._dir;
    }

    /**
     * レイの発射地点を取得する。
     * @returns {numeric.T} レイの発射地点
     */
    get org() {
        return this._org;
    }
}
