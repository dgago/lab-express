'use strict';

const gulp = require('gulp'),
	  del = require('del'),
	  tsc = require('gulp-typescript');

const distFolder = 'dist',
	  tsSource = 'app/**/*.ts';

gulp.task('clean', (x) => del([distFolder], x));

gulp.task('build', ['clean'], function(){
	var tsProject = tsc.createProject('tsconfig.json');
	var tsResult = gulp.src(tsSource)
		.pipe(tsc(tsProject));
	return tsResult.js
		.pipe(gulp.dest(distFolder));
});