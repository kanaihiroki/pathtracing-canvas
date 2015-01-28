define([], function() {
  "use strict";
  var Ray = function Ray(org, dir) {
    this._org = org;
    this._dir = dir;
  };
  ($traceurRuntime.createClass)(Ray, {
    get dir() {
      return this._dir;
    },
    get org() {
      return this._org;
    }
  }, {});
  return {
    get Ray() {
      return Ray;
    },
    __esModule: true
  };
});

//# sourceMappingURL=Ray.js.map