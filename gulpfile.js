const gulp = require("gulp");
const { deleteAsync } = require("del");
const replace = require("gulp-replace");
const htmlmin = require("gulp-htmlmin");
const zip = require("gulp-zip");

// Clean old zip files
gulp.task("clean", () => {
  return deleteAsync(["dist.zip"]);
});

// Minify HTML and replace text
gulp.task("minify", () => {
  return gulp
    .src("dist/**/*.html")
    .pipe(replace("localhost", "production"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

//  Create zip of dist folder
gulp.task("zip", () => {
  return gulp
    .src("dist/**/*")
    .pipe(zip("dist.zip"))
    .pipe(gulp.dest("./"));
});

//  Default task
gulp.task("default", gulp.series("clean", "minify", "zip"));
