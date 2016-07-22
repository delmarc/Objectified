var gulp       = require('gulp'),
	livereload = require('gulp-livereload');

gulp.task('watch', function() {
	var server = livereload(),
		reload = function(file) {
			server.changed(file.path);
		};

	//gulp.watch('./tests/*.js', ['mocha']);
	gulp.watch(['./dev/*.js', './dev/modules/*.js'], [
		'objectifiedContainer',
		'objectifiedAll',
		'objectifiedClientOnly',
		'objectifiedNodeOnly',

//		'objectifiedContainerMin',
//		'objectifiedAllMin',
//		'objectifiedClientOnlyMin',
//		'objectifiedNodeOnlyMin',

		'lint'
		//'mocha'
	]);
	//gulp.watch('./built/**').on('change', reload);
});
