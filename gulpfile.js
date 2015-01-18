var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('default', function() {
  gulp.src('app')
  .pipe(server({
    livereload: true,
    root: 'app',
    directoryListing: true,
    open: false,
    port: 8000
  }));
});
