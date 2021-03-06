import {Sphere} from "Sphere";
import {HitPoint, Intersection} from "Intersection";
import {ReflectionType} from "material";
import {Color} from "Color";
import {V} from "vector";

// レンダリングするシーンデータ
const spheres = [
    new Sphere(1e5, V( 1e5+1, 40.8, 81.6), new Color(), new Color(0.75, 0.25, 0.25), ReflectionType.DIFFUSE), // 左
    new Sphere(1e5, V(-1e5+99, 40.8, 81.6),new Color(), new Color(0.25, 0.25, 0.75), ReflectionType.DIFFUSE), // 右
    new Sphere(1e5, V(50.0, 40.8, 1e5), new Color(), new Color(0.75, 0.75, 0.75), ReflectionType.DIFFUSE), // 奥
    new Sphere(1e5, V(50.0, 40.8, -1e5+250), new Color(), new Color(), ReflectionType.DIFFUSE), // 手前
    new Sphere(1e5, V(50.0, 1e5, 81.6), new Color(), new Color(0.75, 0.75, 0.75), ReflectionType.DIFFUSE), // 床
    new Sphere(1e5, V(50.0, -1e5+81.6, 81.6),new Color(), new Color(0.75, 0.75, 0.75), ReflectionType.DIFFUSE), // 天井
    new Sphere(20,  V(65.0, 20, 20), new Color(), new Color(0.25, 0.75, 0.25), ReflectionType.DIFFUSE), // 緑球
    new Sphere(16.5,V(27.0, 16.5, 47), new Color(), new Color(0.99, 0.99, 0.99), ReflectionType.SPECULAR), // 鏡
    new Sphere(16.5,V(77.0, 16.5, 78), new Color(), new Color(0.99, 0.99, 0.99), ReflectionType.REFRACTION), //ガラス
    new Sphere(15.0,V(50.0, 90.0, 81.6), new Color(36.0,36.0,36.0), new Color(), ReflectionType.DIFFUSE) //照明
];

/**
 * 交差点を探す。
 * @returns {Intersection} 交差点オブジェクト。見つからなかった場合はnull。
 */
export function intersect_scene(ray) {
    var object = void 0,
        hitpoint = new HitPoint(Infinity, null, null),
        object_id = -1;

    // 線形探索(Kd-木を使った最適化が可能とのこと)
    for (var i = 0, n = spheres.length; i < n; ++i) {
        var newHitPoint = spheres[i].intersect(ray);
        if (newHitPoint != void 0 &&
            newHitPoint.distance < hitpoint.distance) {
            hitpoint = newHitPoint;
            object = spheres[i];
            object_id = i;
        }
    }

    if (object == void 0) {
        return null;
    } else {
        return new Intersection(object, hitpoint);
    }
}
