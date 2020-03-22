const gulp = require("gulp");
const babel = require("gulp-babel");
const eslint = require("gulp-eslint");

gulp.task("default", async () => {
  // do gulp task here

  // eslint
  gulp
    .src(["es6/**/*.js", "public/es6/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format());

  // nodejs source
  gulp
    .src("es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));

  // browser source
  gulp
    .src("public/es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist"));
});
