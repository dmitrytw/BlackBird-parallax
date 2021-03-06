"use strict";

var gulp = require('gulp'),
	concatCSS = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
	connect = require('gulp-connect');

//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//css
gulp.task('css', function() {
  // place code for your default task here
  return gulp.src('css/*.css')
    .pipe(concatCSS("bundle.css"))
    .pipe(minifyCSS())
    .pipe(rename("bundle.min.css"))
    .pipe(autoprefixer({
            browsers: ['last 15 versions', 'ie 9'],
            cascade: true
        }))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
    //.pipe(notify('Done!'));
});

//html
gulp.task('html', function () {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});

//Js
gulp.task('js', function () {
  gulp.src('app/js/*.js')
    .pipe(plumber())
    .pipe(connect.reload());
});

//jade
gulp.task('jade', function () {
  gulp.src('jade/*.jade')
  	.pipe(plumber())
    .pipe(jade())
  	.pipe(gulp.dest('app/'));
});

//jade
gulp.task('sass', function () {
  gulp.src('sass/*')
	.pipe(plumber())
  .pipe(sass())
	.pipe(gulp.dest('css/'));
});

//watch
gulp.task('watch', function() {
	gulp.watch('css/*.css', ['css'])
	gulp.watch('app/*.html', ['html'])
	gulp.watch('jade/*.jade', ['jade'])
	gulp.watch('sass/*.sass', ['sass'])
  gulp.watch('app/js/*.js', ['js'])
});

//default
gulp.task('default', ['connect','css', 'html', 'jade', 'sass', 'js', 'watch']);