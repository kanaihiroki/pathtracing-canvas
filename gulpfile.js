 var gulp = require('gulp'),
    traceur = require('gulp-traceur'),
    connect = require("gulp-connect"),
    bower = require('main-bower-files'),
    clean = require("gulp-clean");

var lib_dir = "public/js/lib";

gulp.task("clean", function() {
    return gulp.src("public/js/**/*", {read: false})
        .pipe(clean());
});

gulp.task('connect', ["build"],function(){
    connect.server({
        root: ['public/'],
        port: 8000,
        livereload: true
    });
});

gulp.task('bower', function() {
    return gulp.src(bower())
        .pipe(gulp.dest(lib_dir));
});

gulp.task("traceur-runtime", function() {
    return gulp.src(["node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js"])
        .pipe(gulp.dest(lib_dir));
});

gulp.task('traceur', function () {
    return gulp.src(['src/*.js'])
        .pipe(traceur({
            sourceMap: true,
            experimental: true,
            modules: "amd",
            "traceur.RUNTIME_PATH": "traceur-runtime.js"
        }))
        .pipe(gulp.dest('public/js'))
        .pipe(connect.reload());
});

gulp.task("libs", ["traceur-runtime", "bower"], function() {
});

gulp.task("build", ["traceur", "libs"], function() {
});

gulp.task("run", ["connect"], function() {
    gulp.watch("src/**/*.js", ["build"]);
});

gulp.task('default', ["clean", 'build', "run"]);
