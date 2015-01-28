define(["Ray", "vector"], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  var Ray = $__0.Ray;
  var V = $__2.V;
  var Color = function Color() {
    var r = arguments[0] !== (void 0) ? arguments[0] : 0.0;
    var g = arguments[1] !== (void 0) ? arguments[1] : 0.0;
    var b = arguments[2] !== (void 0) ? arguments[2] : 0.0;
    this.r = r;
    this.g = g;
    this.b = b;
  };
  ($traceurRuntime.createClass)(Color, {get asVector() {
      return V(this.r, this.g, this.b);
    }}, {});
  return {
    get Color() {
      return Color;
    },
    __esModule: true
  };
});

//# sourceMappingURL=Color.js.map