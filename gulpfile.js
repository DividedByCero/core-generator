let gulp = require("gulp");
let babel = require("gulp-babel");
let clean = require("gulp-clean");

gulp.task("build:clean", function(){
    return gulp.src("./build").pipe(clean({force : true}));
})

gulp.task("transpile:providers", ["build:clean"], function(){
    return gulp.src("./providers/**/*.js")
               .pipe(babel({
                   presets : ["@babel/env"],
                }))
               .pipe(gulp.dest("./build/providers/"))
});

gulp.task("copy:config", ["transpile:providers"], function(){
    return gulp.src("./config/**/*")
               .pipe(gulp.dest("./build/config/"))
});

gulp.task("copy:parent", ["copy:config"], function(){
    return gulp.src(["./*", "!./gulpfile.js", "!./node_modules", "!./build"])
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

gulp.task("build:watch", function(){
    var watcher = gulp.watch(["./*.js", "./providers/*.js", "./config/*.js"], ["build"]);
});