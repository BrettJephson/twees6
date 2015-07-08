var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "."
    }
  });

  gulp.watch(["**/*.html", "**/*.js"]).on('change', function() {
    browserSync.reload("*.html");
  }).on('error', function(err) {
    console.error(err);
  });
});
