var gulp = require('gulp');

gulp.task('default', [
//	'lint',
	'objectifiedContainer',
	'objectifiedAll',
	'objectifiedClientOnly',
	'objectifiedNodeOnly',
//	'mocha',
	'watch',
	'serve'
//	'open'
]);
