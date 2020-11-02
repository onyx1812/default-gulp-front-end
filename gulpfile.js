'use strict';

var
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rigger = require('gulp-rigger'),
	browserSync = require('browser-sync').create();


sass.compiler = require('node-sass');

gulp.task('sass', function () {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass.sync({outputStyle: 'uncompressed'})
		.on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(rigger())
		.pipe(htmlmin({collapseWhitespace: false}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(rigger())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
	return gulp.src('src/img/**')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "dist"
		},
		notify: false,
		port: 5050
	});
});

gulp.task('default', ['browser-sync', 'sass', 'html', 'images', 'js'], function () {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/img/**', ['images']);
	gulp.watch('src/js/**/*.js', ['js']);
});
