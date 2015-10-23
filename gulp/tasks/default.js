var gulp = require('gulp');

gulp.task('default', [
	'lint',
	'objectifiedAll',
	'objectifiedClientOnly',
	'objectifiedNodeOnly',
	'mocha',
	'watch',
	'serve',
	'open'
]);
