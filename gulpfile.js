var	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

gulp.task('styles', function () {

	gulp.src('./src/styles/main.scss')
		.pipe(plugins.sass())
		.pipe(plugins.concat('basicModal.min.css', {newLine: "\n"}))
		.pipe(plugins.autoprefixer('last 2 version', '> 1%'))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest('./dist'));

});

gulp.task('scripts', function () {

	gulp.src('./src/scripts/*.coffee')
		.pipe(plugins.coffee({bare: true}).on('error', plugins.util.log))
		.pipe(plugins.concat('basicModal.min.js', {newLine: "\n"}))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('./dist'));

});

gulp.task('default', ['styles', 'scripts']);