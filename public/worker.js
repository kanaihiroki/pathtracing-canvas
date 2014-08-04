importScripts(
    "js/lib/numeric.js",
    "js/lib/lodash.compat.js",
    "js/lib/require.js",
    "js/lib/traceur-runtime.js");

require.config({
    baseUrl: "js"
});

self.addEventListener('message', function(e) {
    require(["render"], function(render) {
            var args = e.data;
            var imageData = render.render(args.imageData, args.width, args.height, args.samples, args.y);
            self.postMessage(imageData);
        }
    );
}, false);
