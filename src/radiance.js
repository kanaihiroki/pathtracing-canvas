import {Color} from "Color";
import {intersect_scene} from "scene";

const backgroundColor = Object.freeze(new Color(0.0, 0.0, 0.0));

export function radiance(ray, depth) {
    const intersection = intersect_scene(ray);
    if (intersection == void 0) {
        return backgroundColor;
    }

    // TODO: stub
    return backgroundColor;
}
