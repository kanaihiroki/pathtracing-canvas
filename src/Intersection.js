/**
 * Rayと物体の表面が交差した場所の情報を表す。
 */
export class HipPoint {
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

export class Intersection {
    constructor(object_id, hitPoint) {
        this.object_id = object_id;
        this.hitPoint = hitPoint;
    }
}