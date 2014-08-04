import {Ray} from "Ray";
import {V} from "vector";

export class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    get asVector() {
        return V(this.r, this.g, this.b, 255);
    }
}