'use strict';

const gulp = require('gulp'),
	del = require('del'),
    tsc = require('gulp-typescript');

/**
 * Limpia el directorio de distribución.
 */
gulp.task('clean', (x)=> {
    return del(['dist'], x);
});

/**
 * Compila el código.
 */
gulp.task('build', ['clean'], function () {
    var tsProject = tsc.createProject('tsconfig.json');
	var tsResult = gulp.src('src/**/*.ts')
		.pipe(tsc(tsProject));
	return tsResult.js.pipe(gulp.dest('dist'));
});
