let gulp = require("gulp");
let babel = require("gulp-babel");

// TODO : move all the routes into constants.

gulp.task("transpile:providers", function(){
    return gulp.src("./providers/**/*.js")
               .pipe(babel({
                   presets : ["@babel/env"],
                }))
               .pipe(gulp.dest("./build/providers/"))
});

gulp.task("copy:templates", ["transpile:providers"], function(){
    return gulp.src("./templates/**/*")
               .pipe(gulp.dest("./build/templates/"))
});

gulp.task("copy:parent", ["copy:templates"], function(){
    return gulp.src(["./*", "!./gulpfile.js", "!./node_modules"])
               .pipe(gulp.dest("./build/"))
});

gulp.task("transpile:parent", ["copy:parent"], function(){
    let sources = [
        "./*.js",
        "!./gulpfile.js"
    ];   
    return gulp.src(sources)
                .pipe(babel({
                    presets : ["@babel/env"],
                }))
                .pipe(gulp.dest("./build"));
});

gulp.task("build", ["transpile:parent"]);