var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

// concat signup wizard stuff

gulp.task('objectifiedContainer', function() {
	return gulp.src([
		'./dev/Objectified-main.js'
		])
		.pipe(concat("Objectified-container.js"))
		.pipe(gulp.dest('./built/'));
});

gulp.task('objectifiedContainerMin', function() {
	return gulp.src([
		'./dev/Objectified-main.js'
		])
		.pipe(concat("Objectified-container.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest('./built/'));
});

gulp.task('objectifiedClientOnly', function() {
	return gulp.src([
		'./dev/Objectified-main.js',
		'./dev/modules/Objectified-client-module.js'
		])
		.pipe(concat("Objectified-client.min.js"))
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


// 
gulp.task('objectifiedAll', function() {
	return gulp.src([
		'./dev/Objectified-main.js',
		'./dev/modules/Objectified-client-module.js',
		'./dev/modules/Objectified-node-module.js'
		])
		.pipe(concat("Objectified.min.js"))
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

