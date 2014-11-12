/*------------------------------------------------------------------------------
	Dependencies
------------------------------------------------------------------------------*/
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	connect = require('gulp-connect'),
	preprocess = require('gulp-preprocess'),
	rename = require("gulp-rename"),
	del = require('del');


/*------------------------------------------------------------------------------
	Webserver
------------------------------------------------------------------------------*/
gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});


/*------------------------------------------------------------------------------
	Development tasks
------------------------------------------------------------------------------*/
gulp.task('clean-dev', function () {
	del(['./css/main.min.css']);
});

gulp.task('html', function () {
	gulp.src('./assets/html/*.html')
		.pipe(preprocess({context: { NODE_ENV: 'development'}}))
		.pipe(gulp.dest('./'))
		.pipe(connect.reload());
});

gulp.task('less', function () {
	gulp.src('./assets/less/main.less')
		.pipe(less())
		.pipe(gulp.dest('./css'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch('./assets/html/*.html', ['html']);
	gulp.watch('./assets/less/**/*.less', ['less']);
});


/*------------------------------------------------------------------------------
	Production tasks
------------------------------------------------------------------------------*/
gulp.task('clean-prod', function () {
	del(['./css/main.css']);
});

gulp.task('html-prod', function () {
	gulp.src('./assets/html/*.html')
		.pipe(preprocess({context: { NODE_ENV: 'production'}}))
		.pipe(gulp.dest('./'));
});

gulp.task('css-prod', function () {
	gulp.src('./assets/less/main.less')
		.pipe(less())
		.pipe(cssmin())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('./css'));
});


/*------------------------------------------------------------------------------
	Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['clean-dev', 'html', 'less', 'connect', 'watch']);

gulp.task('build', ['clean-prod', 'html-prod', 'css-prod']);