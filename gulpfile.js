'use strict'

let name       = require('./package.json').moduleName,
    gulp       = require('gulp'),
    tasks      = require('@electerious/basictasks')(gulp, name)

const catchError = tasks.catchError()

const scripts = tasks.scripts('./src/scripts/main.js')

const styles = tasks.styles('./src/styles/main.scss')

const watch = tasks.watch('./src/**/*.[scss, js]', ['scripts', 'styles'])

gulp.task('scripts', scripts)
gulp.task('styles', styles)
gulp.task('default', ['scripts', 'styles'])
gulp.task('watch', ['default'], watch)