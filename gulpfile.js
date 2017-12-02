'use strict';

var
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	minifyjs = require('gulp-js-minify'),
	clean = require('gulp-clean'),
	browserSync = require('browser-sync'),
	rigger = require('gulp-rigger');

gulp.task('sass', function () {
	return gulp.src('dev/scss/**/*.scss')
		.pipe(sass.sync({outputStyle: 'uncompressed'})
		.on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('live/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('dev/*.html')
		.pipe(rigger())
		.pipe(htmlmin({collapseWhitespace: false}))
		.pipe(gulp.dest('live'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
	return gulp.src('dev/img/**')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest('live/img'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
	gulp.src('dev/js/**/*.js')
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

gulp.task('watch', ['browser-sync', 'sass', 'html', 'images', 'js'], function () {
	gulp.watch('dev/scss/**/*.scss', ['sass']);
	gulp.watch('dev/*.html', ['html']);
	gulp.watch('dev/img/**', function(event) {
		gulp.run('images');
	});
	gulp.watch('dev/js/**/*.js', ['js']);
});

gulp.task('clean', function () {
	return gulp.src('live/')
		.pipe(clean());
});

//Консольные команды
//gulp watch - следит за изменениями в файлах
//gulp clean - очищает папку live