var gulp        = require('gulp');
var browserSync = require('browser-sync');

// Static server
gulp.task('default', ['browser-sync']);
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./src/examples",
      directory: true,
      port: 8000,
      livereload: true,
      directoryListing: true,
      open: false
    }
  });
});
