/**
 * Rayと物体の表面が交差した場所の情報を表す。
 */
export class HitPoint {
    /**
     * 新しいインスタンスを生成する。
     * @param distance {number} Rayと物体表面からの距離
     * @param normal {numeric.T} 法線ベクトル
     * @param position {numeric.T} 交差点の位置
     */
    constructor(distance, normal, position) {
        this.distance = distance;
        this.normal = normal;
        this.position = position;
    }
}

/**
 * 交差点を表す。
 */
export class Intersection {
    /**
     * 新しいインスタンスを生成する。
     * @param object {Sphere} 交差したオブジェクト
     * @param hitPoint {HitPoint} 詳細な交差した場所の情報
     */
    constructor(object, hitPoint) {
        this.object = object;
        this.hitPoint = hitPoint;
    }
}