'use strict';

const gulp = require('gulp'),
	del = require('del'),
	tsc = require('gulp-typescript'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	nodemon = require('gulp-nodemon'),
	runSequence = require('run-sequence'),
	contentDest = 'dist/client',
	jsDest = 'dist/client/js';

/**
 *	Remueve el directorio de distribución.
 */
gulp.task('clean', (x) => {
	return del(['dist'], x);
});

/**
 *	Compila el código.
 */
gulp.task('build:server', function() {
    var tsProject = tsc.createProject('server/tsconfig.json');
    var tsResult = gulp.src('server/**/*.ts')
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(gulp.dest('dist/server'));
});

gulp.task('build:client', function() {
    var tsProject = tsc.createProject('client/tsconfig.json');
    var tsResult = gulp.src('client/**/*.ts')
        .pipe(tsc(tsProject));
    return tsResult.js
		.pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
		.pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

/**
 * Copia todos los recursos que no son TypeScript en el directorio de distribución.
 */
gulp.task('content', () => {
    return gulp.src(['client/**/*', '!**/*.ts', '!client/typings', '!client/typings/**', '!client/*.json'], { nodir: true })
        .pipe(gulp.dest(contentDest));
});

/**
 * Copia todas las librerías requeridas al directorio de distribución.
 */
gulp.task('libs', () => {
    return gulp.src([
        // 'angular2/bundles/angular2-polyfills.js',
        // 'systemjs/dist/system.src.js',
        // 'rxjs/bundles/Rx.js',
        // 'angular2/bundles/angular2.dev.js',
        // 'angular2/bundles/router.dev.js',
        // 'angular2/bundles/http.dev.js',
    ], { cwd: 'node_modules/**' }) /* Glob required here. */
        .pipe(gulp.dest('dist/client/libs'));
});

/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 3. Build the Angular app
 * 4. Copy the resources
 * 5. Copy the dependencies.
 */
gulp.task('build', function(callback) {
    runSequence('clean', 'build:server', 'build:client', 'content', 'libs', callback);
});

/**
 * Reacciona a cambios en archivos TypeScript, HTML y CSS.
 */
gulp.task('watch', function() {
    gulp.watch(['client/**/*.ts'], ['build:client']).on('change', function(e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(['client/**/*.html', 'client/**/*.css'], ['content']).on('change', function(e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
	gulp.watch(['server/**/*.ts'], ['build:server']);
});

/**
 * Inicia el server express.
 */
gulp.task('start', function() {
	nodemon({
		script: 'dist/server/server.js'
		, ext: 'html js'
		, ignore: ['ignored.js']
		, tasks: [/*'tslint'*/]
	}).on('restart', function() {
		console.log('restarted!')
	});
});
