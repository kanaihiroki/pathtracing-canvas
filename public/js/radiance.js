define(["Color", "scene", "material", "vector", "Ray", "log", "Sphere"], function($__0,$__2,$__4,$__6,$__8,$__10,$__12) {
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
  if (!$__10 || !$__10.__esModule)
    $__10 = {'default': $__10};
  if (!$__12 || !$__12.__esModule)
    $__12 = {'default': $__12};
  var Color = $__0.Color;
  var intersect_scene = $__2.intersect_scene;
  var ReflectionType = $__4.ReflectionType;
  var $__7 = $__6,
      V = $__7.V,
      cross = $__7.cross,
      normalize = $__7.normalize,
      multiply = $__7.multiply;
  var Ray = $__8.Ray;
  var log = $__10.log;
  var kEPS = $__12.kEPS;
  var backgroundColor = new Color(0.0, 0.0, 0.0),
      kDepth = 5,
      kDpethLimit = 64;
  var kIor = 1.5;
  function sample_diffuse(u, v, w) {
    var r1 = 2 * Math.PI * Math.random(),
        r2 = Math.random(),
        r2s = Math.sqrt(r2),
        u_ = u.mul(Math.cos(r1) * r2s),
        v_ = v.mul(Math.sin(r1) * r2s),
        w_ = w.mul(Math.sqrt(1.0 - r2));
    return normalize(u_.add(v_).add(w_));
  }
  function reflect(normal, ray) {
    var cos = normal.dot(ray.dir).x;
    return ray.dir.sub(normal.mul(2.0 * cos));
  }
  function radiance(ray, depth) {
    var intersection = intersect_scene(ray);
    if (intersection == void 0) {
      return backgroundColor.asVector;
    }
    var object = intersection.object,
        hitpoint = intersection.hitPoint;
    var orienting_normal = hitpoint.normal.dot(ray.dir).x < 0.0 ? hitpoint.normal : (hitpoint.normal.mul(-1));
    var russian_roulette_probability = _.max([object.color.r, object.color.g, object.color.b]);
    if (depth > kDpethLimit) {
      russian_roulette_probability *= Math.pow(0.5, depth - kDpethLimit);
    }
    if (depth > kDepth) {
      if (Math.random() >= russian_roulette_probability) {
        return object.emission.asVector;
      }
    } else {
      russian_roulette_probability = 1.0;
    }
    var incoming_radiance,
        weight = 1.0,
        dir;
    switch (object.reflection_type) {
      case ReflectionType.DIFFUSE:
        {
          var w = orienting_normal,
              u = Math.abs(w.x[0]) > kEPS ? normalize(cross(V(0.0, 1.0, 0.0), w)) : normalize(cross(V(1.0, 0.0, 0.0), w)),
              v = cross(w, u);
          dir = sample_diffuse(u, v, w);
          incoming_radiance = radiance(new Ray(hitpoint.position, dir), depth + 1);
          weight = object.color.asVector.div(russian_roulette_probability);
        }
        break;
      case ReflectionType.SPECULAR:
        {
          dir = reflect(hitpoint.normal, ray);
          incoming_radiance = radiance(new Ray(hitpoint.position, dir), depth + 1);
          weight = object.color.asVector.div(russian_roulette_probability);
        }
        break;
      case ReflectionType.REFRACTION:
        {
          var reflection_ray = new Ray(hitpoint.position, reflect(hitpoint.normal, ray)),
              into = hitpoint.normal.dot(orienting_normal).x > 0.0;
          var nc = 1.0,
              nt = kIor,
              nnt = into ? nc / nt : nt / nc,
              ddn = ray.dir.dot(orienting_normal).x,
              cos2t = 1.0 - nnt * nnt * (1.0 - ddn * ddn);
          if (cos2t < 0.0) {
            incoming_radiance = radiance(reflection_ray, depth + 1);
            weight = object.color.asVector.div(russian_roulette_probability);
            break;
          }
          var r1 = ray.dir.mul(nnt),
              r2 = hitpoint.normal.mul(into ? 1.0 : -1.0).mul(ddn * nnt + Math.sqrt(cos2t)),
              refraction_ray = new Ray(hitpoint.position, normalize(r1.sub(r2)));
          var a = nt - nc,
              b = nt + nc,
              R0 = Math.pow(a, 2) / Math.pow(b, 2),
              c = 1.0 - (into ? -ddn : refraction_ray.dir.dot(orienting_normal.mul(-1.0)).x);
          var Re = R0 + (1.0 - R0) * Math.pow(c, 5.0);
          var nnt2 = Math.pow(into ? nc / nt : nt / nc, 2.0);
          var Tr = (1.0 - Re) * nnt2;
          var probability = 0.25 + 0.5 * Re,
              reflect_radiance = (function() {
                return radiance(reflection_ray, depth + 1).mul(Re);
              }),
              refract_radiance = (function() {
                return radiance(refraction_ray, depth + 1).mul(Tr);
              });
          if (depth > 2) {
            if (Math.random() < probability) {
              incoming_radiance = reflect_radiance();
              weight = object.color.asVector.div(probability * russian_roulette_probability);
            } else {
              incoming_radiance = refract_radiance();
              weight = object.color.asVector.div((1.0 - probability) * russian_roulette_probability);
            }
          } else {
            incoming_radiance = reflect_radiance().add(refract_radiance());
            weight = object.color.asVector.div(russian_roulette_probability);
          }
        }
        break;
    }
    return object.emission.asVector.add(multiply(weight, incoming_radiance));
  }
  return {
    get radiance() {
      return radiance;
    },
    __esModule: true
  };
});

//# sourceMappingURL=radiance.js.map