var connect = require('connect'),
	gulp = require("gulp"),
	http = require('http'),
	config = require('../config');

gulp.task('serve', function(){
	var app = connect()
		.use(connect.logger('dev'))
		.use(connect.static(config.root));

	http.createServer(app).listen(config.port);
});
