define(["Intersection", "Ray", "Color", "material", "vector"], function($__0,$__2,$__4,$__6,$__8) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {'default': $__4};
  if (!$__6 || !$__6.__esModule)
    $__6 = {'default': $__6};
  if (!$__8 || !$__8.__esModule)
    $__8 = {'default': $__8};
  var HitPoint = $__0.HitPoint;
  var Ray = $__2.Ray;
  var Color = $__4.Color;
  var ReflectionType = $__6.ReflectionType;
  var normalize = $__8.normalize;
  var kEPS = 1e-6;
  var Sphere = function Sphere(radius, position, emission, color, reflection_type) {
    this.radius = radius;
    this.position = position;
    this.emission = emission;
    this.color = color;
    this.reflection_type = reflection_type;
  };
  ($traceurRuntime.createClass)(Sphere, {intersect: function(ray) {
      var p_o = this.position.sub(ray.org),
          b = p_o.dot(ray.dir).x,
          D4 = Math.pow(b, 2) - (p_o.dot(p_o).x - Math.pow(this.radius, 2));
      if (D4 < 0.0) {
        return null;
      }
      var sqrt_D4 = Math.sqrt(D4),
          t1 = b - sqrt_D4,
          t2 = b + sqrt_D4;
      if (t1 < kEPS && t2 < kEPS) {
        return null;
      }
      var distance = t1 > kEPS ? t1 : t2,
          position = ray.org.add(ray.dir.mul(distance)),
          normal = normalize(position.sub(this.position));
      return new HitPoint(distance, normal, position);
    }}, {});
  return {
    get kEPS() {
      return kEPS;
    },
    get Sphere() {
      return Sphere;
    },
    __esModule: true
  };
});

//# sourceMappingURL=Sphere.js.map