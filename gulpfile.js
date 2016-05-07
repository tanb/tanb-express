var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var shell = require('gulp-shell');
var webserver = require('gulp-webserver');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));
var host = argv.host;
var port = argv.port;

var tsccommand = 'node_modules/.bin/tsc';

gulp.task('less', function () {
    return gulp.src('./static/less/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function(){
    gulp.watch('./static/less/*.less', ['less']);
    gulp.watch('./static/ts/*.ts', ['tsc']);
});

gulp.task('tsc', shell.task([tsccommand]));

gulp.task('webserver', function() {
    var argv = minimist(process.argv.slice(2));
    var path = '/';
    gulp.src('./')
        .pipe(webserver({
            host: host,
            port: port,
            path: path,
            livereload: true
        }));
});

gulp.task('run-with-watch', ['tsc', 'less', 'watch', 'webserver']);
