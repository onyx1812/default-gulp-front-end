'use strict';

var
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	minifyjs = require('gulp-js-minify'),
	clean = require('gulp-clean'),
	browserSync = require('browser-sync'),
	rigger = require('gulp-rigger');

gulp.task('sass', function () {
	return gulp.src('dev/scss/**/*.scss')
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('live/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('dev/*.html')
		.pipe(rigger())
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('live'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img', () =>
	gulp.src('dev/img/**')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [{removeViewBox: true}]
		}))
		.pipe(gulp.dest('live/img'))
);

gulp.task('js', function(){
	gulp.src('dev/js/**/*.js')
		.pipe(minifyjs())
		.pipe(gulp.dest('live/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'live'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass', 'html', 'img', 'js'], function () {
	gulp.watch('dev/scss/**/*.scss', ['sass']);
	gulp.watch('dev/*.html', ['html']);
	gulp.watch('dev/img/**', ['img']);
	gulp.watch('dev/js/**/*.js', ['js']);
});

gulp.task('clean', function () {
	return gulp.src('live/')
		.pipe(clean());
});

//Консольные команды
//gulp watch - следит за изменениями в файлах
//gulp clean - очищает папку live