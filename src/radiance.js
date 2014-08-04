import {Color} from "Color";


const backgroundColor = new Color(0.0, 0.0, 0.0);

function try_intersect_scene(ray) {
    // TODO: stub
    return [false, 0];
}

export function radiance(ray, depth) {
    const [ret, intersection] = try_intersect_scene(ray);
    if (!ret) {
        return backgroundColor;
    }
}
