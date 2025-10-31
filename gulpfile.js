import gulp from "gulp";
import replace from "gulp-replace";
import htmlmin from "gulp-htmlmin";
import zip from "gulp-zip";
import del from "del";

// 1. Clean the old dist.zip
gulp.task("clean", () => {
  return del(["dist.zip"]);
});

// 2. Minify HTML files in dist folder (Vite output)
gulp.task("minify-html", () => {
  return gulp
    .src("dist/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest("dist"));
});

// 3. Replace placeholder text (optional)
gulp.task("replace-text", () => {
  return gulp
    .src("dist/**/*.html")
    .pipe(replace("Devops", "Maxyfi")) // example replacement
    .pipe(gulp.dest("dist"));
});

// 4. Zip final build
gulp.task("zip", () => {
  return gulp
    .src("dist/**/*")
    .pipe(zip("dist.zip"))
    .pipe(gulp.dest("."));
});

// 5. Define main build task (run everything)
gulp.task("build", gulp.series("clean", "minify-html", "replace-text", "zip"));
