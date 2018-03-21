var gulp  = require("gulp");
var sass  = require("gulp-sass");
var serve = require('gulp-serve');
var shell = require('gulp-shell');

// what goes where?
var buildSrc = "src";
var buildDest = "dist";


// local webserver for development
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));


// Compile SCSS files to CSS
gulp.task("scss", function () {
  gulp.src(buildSrc + "/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/css"))
});


// run the site generator
gulp.task('generate', shell.task('eleventy --config=eleventy.js'));


// Watch src folder for changes
gulp.task("watch", ["scss", "generate"], function () {
  gulp.watch(buildSrc + "/scss/**/*", ["scss"])
  gulp.watch(buildSrc + "/**/*", ["generate"])
});




