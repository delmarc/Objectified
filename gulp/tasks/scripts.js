var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var objectifiedBaseArray = ["./dev/Objectified-main.js"]

// This is just the container
gulp.task('objectifiedContainer', function() {
	return gulp.src(objectifiedBaseArray)
		.pipe(concat("Objectified-container.js"))
		.pipe(gulp.dest('./built/'));
});

gulp.task('objectifiedContainerMin', function() {
	return gulp.src(objectifiedBaseArray)
		.pipe(concat("Objectified-container.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest('./built/'));
});


// This is just for the client
gulp.task('objectifiedClientOnly', function() {
	return gulp.src([
		'./dev/Objectified-main.js',
		'./dev/modules/Objectified-client-module.js'
		])
		.pipe(concat("Objectified-client.js"))
		.pipe(gulp.dest('./built/'));
});

gulp.task('objectifiedClientOnlyMin', function() {
	return gulp.src([
		'./dev/Objectified-main.js',
		'./dev/modules/Objectified-client-module.js'
		])
		.pipe(concat("Objectified-client.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest('./built/'));
});

/*
// This is just for the node environments
gulp.task('objectifiedNodeOnly', function() {
	return gulp.src([
		'./dev/Objectified-main.js',
		'./dev/modules/Objectified-node-module.js'
		])
		.pipe(concat("Objectified-node.js"))
		.pipe(gulp.dest('./built/'));
});

gulp.task('objectifiedNodeOnlyMin', function() {
	return gulp.src([
		'./dev/Objectified-main.js',
		'./dev/modules/Objectified-node-module.js'
		])
		.pipe(concat("Objectified-node.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest('./built/'));
});

// for both node and client
gulp.task('objectifiedAll', function() {
	return gulp.src([
		'./dev/Objectified-main.js',
		'./dev/modules/Objectified-client-module.js',
		'./dev/modules/Objectified-node-module.js'
		])
		.pipe(concat("Objectified.js"))
		.pipe(gulp.dest('./built/'));
});

gulp.task('objectifiedAllMin', function() {
	return gulp.src([
		'./dev/Objectified-main.js',
		'./dev/modules/Objectified-client-module.js',
		'./dev/modules/Objectified-node-module.js'
		])
		.pipe(concat("Objectified.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest('./built/'));
});
*/

