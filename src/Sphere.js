import {HipPoint} from "Intersection"
import {Ray} from "Ray";
import {Color} from "Color";
import {ReflectionType} from "material";

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
        this.refection_type = reflection_type;
    }

    /**
     * rayとの交差判定を行う。
     * @param {Ray} ray
     * @returns {HitPoint} 交差した場合、HitPointオブジェクトを返す。交差しなかった場合はnull。
     */
    intersect(ray) {
        const p_o = this.position.sub(ray.org), // Rayのベクトル
            b = p_o.mul(ray.dir),
            D4 = b * b - p_o.mul(p_o) + this.radius * this.radius;


        /*
    if (D4 < 0.0)
        return false;

    const double sqrt_D4 = sqrt(D4);
    const double t1 = b - sqrt_D4, t2 = b + sqrt_D4;

    if (t1 < kEPS && t2 < kEPS)
        return false;

    if (t1 > kEPS) {
        hitpoint->distance = t1;
    } else {
        hitpoint->distance = t2;
    }

    hitpoint->position = ray.org + hitpoint->distance * ray.dir;
    hitpoint->normal = normalize(hitpoint->position - position);
    return true;
*/
        return null;
    }
}
