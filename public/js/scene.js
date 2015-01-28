define(["Sphere", "Intersection", "material", "Color", "vector"], function($__0,$__2,$__4,$__6,$__8) {
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
  var Sphere = $__0.Sphere;
  var $__3 = $__2,
      HitPoint = $__3.HitPoint,
      Intersection = $__3.Intersection;
  var ReflectionType = $__4.ReflectionType;
  var Color = $__6.Color;
  var V = $__8.V;
  var spheres = [new Sphere(1e5, V(1e5 + 1, 40.8, 81.6), new Color(), new Color(0.75, 0.25, 0.25), ReflectionType.DIFFUSE), new Sphere(1e5, V(-1e5 + 99, 40.8, 81.6), new Color(), new Color(0.25, 0.25, 0.75), ReflectionType.DIFFUSE), new Sphere(1e5, V(50.0, 40.8, 1e5), new Color(), new Color(0.75, 0.75, 0.75), ReflectionType.DIFFUSE), new Sphere(1e5, V(50.0, 40.8, -1e5 + 250), new Color(), new Color(), ReflectionType.DIFFUSE), new Sphere(1e5, V(50.0, 1e5, 81.6), new Color(), new Color(0.75, 0.75, 0.75), ReflectionType.DIFFUSE), new Sphere(1e5, V(50.0, -1e5 + 81.6, 81.6), new Color(), new Color(0.75, 0.75, 0.75), ReflectionType.DIFFUSE), new Sphere(20, V(65.0, 20, 20), new Color(), new Color(0.25, 0.75, 0.25), ReflectionType.DIFFUSE), new Sphere(16.5, V(27.0, 16.5, 47), new Color(), new Color(0.99, 0.99, 0.99), ReflectionType.SPECULAR), new Sphere(16.5, V(77.0, 16.5, 78), new Color(), new Color(0.99, 0.99, 0.99), ReflectionType.REFRACTION), new Sphere(15.0, V(50.0, 90.0, 81.6), new Color(36.0, 36.0, 36.0), new Color(), ReflectionType.DIFFUSE)];
  function intersect_scene(ray) {
    var object = void 0,
        hitpoint = new HitPoint(Infinity, null, null),
        object_id = -1;
    for (var i = 0,
        n = spheres.length; i < n; ++i) {
      var newHitPoint = spheres[$traceurRuntime.toProperty(i)].intersect(ray);
      if (newHitPoint != void 0 && newHitPoint.distance < hitpoint.distance) {
        hitpoint = newHitPoint;
        object = spheres[$traceurRuntime.toProperty(i)];
        object_id = i;
      }
    }
    if (object == void 0) {
      return null;
    } else {
      return new Intersection(object, hitpoint);
    }
  }
  return {
    get intersect_scene() {
      return intersect_scene;
    },
    __esModule: true
  };
});

//# sourceMappingURL=scene.js.map