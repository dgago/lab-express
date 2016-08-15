'use strict';

const gulp = require('gulp'),
	del = require('del'),
	tsc = require('gulp-typescript'),
	nodemon = require('gulp-nodemon');

const distFolder = 'dist',
	tsSource = 'app/**/*.ts';

/**
 * Remueve el directorio de distribución.
 */
gulp.task('clean', (x) => del([distFolder], x));

gulp.task('build', ['clean'], function () {
	var tsProject = tsc.createProject('tsconfig.json');
	var tsResult = gulp.src(tsSource)
		.pipe(tsc(tsProject));
	return tsResult.js
		.pipe(gulp.dest(distFolder));
});

/**
 * Reacciona a cambios en archivos TypeScript.
 */
gulp.task('watch', function () {
	gulp.watch([tsSource], ['build'])
		.on('change', function (e) {
			console.log('Compiling...');
		});
});

/**
 * Inicia el server express.
 */
gulp.task('start', function () {
	nodemon({
		script: distFolder + '/server.js'
		, ext: 'html js'
		, ignore: ['ignored.js']
		, tasks: [/*'tslint'*/]
	}).on('restart', function () {
		console.log('Restarted.')
	});
});
