var gulp = require('gulp'),
	jshint = require('gulp-jshint');

// Lint JS
gulp.task('lint', function() {
  return gulp.src('./dev/**/*.js')
    .pipe(jshint({
    	validthis:true
    }))
    .pipe(jshint.reporter('default'));
});
