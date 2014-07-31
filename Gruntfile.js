module.exports = function (grunt) {
	'use strict';
    
    // No need for massive test cases, let's just minify our Gruntfile.
    grunt.initConfig({
		libFiles: [
			"src/*.js"
		],
        clean: ["dist", "public/tracing.js"],
        closurecompiler: {
            // test: {
            //     files: {
            //         "Gruntfile.min.js": [__filename]
            //     },
            //     options: {
            //         "compilation_level": "SIMPLE_OPTIMIZATIONS"
            //     }
            // },
			minify: {
				files: {
					"public/tracing.js": ["<%=libFiles%>"]
				},
				options: {
					"compilation_level": "SIMPLE_OPTIMIZATIONS",

					"language_in": "ECMASCRIPT6",
					"language_out": "ECMASCRIPT3",
					"process_common_js_modules": true,
					"common_js_entry_module": "lib",
					
					// Plus a simultaneous processes limit
					"max_processes": 5,
					
					// And an option to add a banner, license or similar on top
					"banner": "/* hello world! */"
				}
			}
        },
        nodeunit: {
            tests: ['tests/suite.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-closurecompiler');

    // grunt.registerTask('test', ['clean', 'closurecompiler:test', 'nodeunit']);
    // grunt.registerTask('default', ['test']);
	grunt.registerTask('default', ['minify']);
	grunt.registerTask('minify', ['closurecompiler:minify']);
};
