var gulp = require('gulp');

gulp.task('default', [
	'objectifiedContainer',
	'objectifiedAll',
	'objectifiedClientOnly',
	'objectifiedNodeOnly',

	'objectifiedContainerMin',
	'objectifiedAllMin',
	'objectifiedClientOnlyMin',
	'objectifiedNodeOnlyMin',

	'lint',
	'serve',
//	'mocha',
	'watch'
//	'open'
]);
