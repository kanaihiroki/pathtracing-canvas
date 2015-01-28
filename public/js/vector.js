define([], function() {
  "use strict";
  function V(x, y, z) {
    return new numeric.T([x, y, z]);
  }
  function normalize(v) {
    return v.div(v.norm2());
  }
  function cross(v1, v2) {
    var a = v1.x,
        b = v2.x;
    return V(a[1] * b[2] - a[2] * b[1], a[0] * b[2] - a[2] * b[0], a[0] * b[1] - a[1] * b[0]);
  }
  function multiply(v1, v2) {
    var a = v1.x,
        b = v2.x;
    return V(a[0] * b[0], a[1] * b[1], a[2] * b[2]);
  }
  return {
    get V() {
      return V;
    },
    get normalize() {
      return normalize;
    },
    get cross() {
      return cross;
    },
    get multiply() {
      return multiply;
    },
    __esModule: true
  };
});

//# sourceMappingURL=vector.js.map