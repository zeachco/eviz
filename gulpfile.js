var gulp        = require('gulp');
var browserSync = require('browser-sync');

// Static server
gulp.task('default', ['browser-sync']);
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// or...
/*
gulp.task('browser-sync', function() {
  browserSync({
    proxy: "yourlocal.dev"
  });
});
*/
