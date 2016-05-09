var gulp = require('gulp');

gulp.task('default', [
	'lint',

	'objectifiedContainer',
	'objectifiedAll',
	'objectifiedClientOnly',
	'objectifiedNodeOnly',

	'objectifiedContainerMin',
	'objectifiedAllMin',
	'objectifiedClientOnlyMin',
	'objectifiedNodeOnlyMin',

//	'mocha',
	'watch',
	'serve'
//	'open'
]);
