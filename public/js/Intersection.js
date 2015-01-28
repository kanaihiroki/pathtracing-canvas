define([], function() {
  "use strict";
  var HitPoint = function HitPoint(distance, normal, position) {
    this.distance = distance;
    this.normal = normal;
    this.position = position;
  };
  ($traceurRuntime.createClass)(HitPoint, {}, {});
  var Intersection = function Intersection(object, hitPoint) {
    this.object = object;
    this.hitPoint = hitPoint;
  };
  ($traceurRuntime.createClass)(Intersection, {}, {});
  return {
    get HitPoint() {
      return HitPoint;
    },
    get Intersection() {
      return Intersection;
    },
    __esModule: true
  };
});

//# sourceMappingURL=Intersection.js.map