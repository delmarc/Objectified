var gulp = require('gulp'),
	open = require("gulp-open"),
	config = require('../config');

gulp.task('open', function() {

	var options = {
		url: "http://localhost:" + config.port
	};

	return gulp.src("./index.html").pipe(open("", options));
});
