var gulp = require('gulp'),
	jshint = require('gulp-jshint');

// Lint JS
gulp.task('lint', function() {
  return gulp.src('./dev/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
