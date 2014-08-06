import {Ray} from "Ray";
import {V} from "vector";

export class Color {
    constructor(r = 0.0, g = 0.0, b = 0.0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    get asVector() {
        return V(this.r, this.g, this.b);
    }
}