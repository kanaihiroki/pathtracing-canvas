define([], function() {
  "use strict";
  function log() {
    var $__1;
    for (var args = [],
        $__0 = 0; $__0 < arguments.length; $__0++)
      $traceurRuntime.setProperty(args, $__0, arguments[$traceurRuntime.toProperty($__0)]);
    if (console && console.log) {
      ($__1 = console).log.apply($__1, $traceurRuntime.spread(args));
    }
  }
  return {
    get log() {
      return log;
    },
    __esModule: true
  };
});

//# sourceMappingURL=log.js.map