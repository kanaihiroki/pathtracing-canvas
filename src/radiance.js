import {Color} from "Color";
import {intersect_scene} from "scene";
import {log} from "log";

// test
import {spheres} from "scene";

const backgroundColor = Object.freeze(new Color(0.0, 0.0, 0.0));

export function radiance(ray, depth) {
    const intersection = intersect_scene(ray);
    if (intersection == void 0) {
        return backgroundColor;
    }


    const s = spheres[intersection.object_id];
    return s.color;
    // return backgroundColor;
}
