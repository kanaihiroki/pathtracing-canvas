/**
 * Sphereクラスのインスタンスを生成する。
 */
export function Sphere(radius, position, emission, color, reflection_type) {
    return Object.freeze(new Sphere(radius, position, emission, color, reflection_type));
}

/**
 * 球を表すクラス。
 */
class Sphere {
    /**
     * インスタンスを生成する。
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
     * @param ray 入力
     * @param hitpoint 交差点
     * @returns {boolean} 交差したらtrue,さもなくばfalseを返す。
     */
    intersect(ray, hitpoint) {
    /*
        const Vec p_o = position - ray.org;
    const double b = dot(p_o, ray.dir);
    const double D4 = b * b - dot(p_o, p_o) + radius * radius;

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
        return false;
    }
}