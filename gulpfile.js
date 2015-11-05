'use strict'

let name       = require('./package.json').moduleName,
    gulp       = require('gulp'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    plugins    = require('gulp-load-plugins')()

const catchError = function(err) {

	console.log(err.toString())
	this.emit('end')

}

const scripts = function() {

	let bify = browserify({
		entries    : './src/scripts/main.js',
		standalone : name
	})

	let transformer = babelify.configure({
		presets: ['es2015']
	})

	bify.transform(transformer)
	    .bundle()
	    .on('error', catchError)
	    .pipe(source(name + '.min.js'))
	    .pipe(buffer())
	    .pipe(plugins.uglify())
	    .on('error', catchError)
	    .pipe(gulp.dest('./dist'))

}

const styles = function() {

	gulp.src('./src/styles/main.scss')
	    .pipe(plugins.sass())
	    .on('error', catchError)
	    .pipe(plugins.rename((path) => path.basename = name + '.min'))
	    .pipe(plugins.autoprefixer('last 2 version', '> 1%'))
	    .pipe(plugins.minifyCss())
	    .pipe(gulp.dest('./dist'))

}

const watch = function() {

	gulp.watch('./src/styles/**/*.scss', ['styles'])
	gulp.watch('./src/scripts/**/*.js', ['scripts'])

}

gulp.task('scripts', scripts)
gulp.task('styles', styles)
gulp.task('default', ['scripts', 'styles'])
gulp.task('watch', ['default'], watch)