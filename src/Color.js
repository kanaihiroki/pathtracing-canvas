import {Ray} from "Ray";
import {V} from "vector";

export class Color {
    constructor(r, g, b) {
        this._r = r;
        this._g = g;
        this._b = b;
    }

    get asVector() {
        return V(this._r, this._g, this._b, 255);
    }
}
