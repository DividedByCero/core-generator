let gulp = require("gulp");
let babel = require("gulp-babel");
let clean = require("gulp-clean");

gulp.task("build:clean", function () {
    return gulp.src("./build/**/*.*").pipe(clean({ force: true }));
})

gulp.task("transpile:providers", ["build:clean"], function () {
    return gulp.src("./providers/**/*.js")
        .pipe(babel({
            presets: ["@babel/env"],
        }))
        .pipe(gulp.dest("./build/providers/"))
});

gulp.task("transpile:config", ["transpile:providers"], function () {
    return gulp.src("./config/**/*.js")
        .pipe(babel({
            presets: ["@babel/env"],
        }))
        .pipe(gulp.dest("./build/config/"))
});

gulp.task("copy:parent", ["transpile:config"], function () {
    return gulp.src(["./*", "!./gulpfile.js", "!./node_modules", "!./build"])
        .pipe(gulp.dest("./build/"))
});

gulp.task("copy:pjFile", ["copy:parent"], function () {
    return gulp.src("./testDir/*.csproj")
        .pipe(gulp.dest("./build/"))
});

gulp.task("transpile:parent", ["copy:pjFile"], function () {
    let sources = [
        "./*.js",
        "!./gulpfile.js"
    ];
    return gulp.src(sources)
        .pipe(babel({
            presets: ["@babel/env"],
        }))
        .pipe(gulp.dest("./build"));
});

gulp.task("build", ["transpile:parent"]);

gulp.task("build:watch", function () {
    var watcher = gulp.watch(["./*.js", "./providers/*.js", "./config/*.js"], ["build"]);
});
