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

var concat = require('gulp-concat');
gulp.task('foundation', function() {
    return gulp.src([
        "static/lib/js/jquery.min.js",
        "static/lib/js/jquery.cookie.js",
        "static/lib/js/bootstrap.min.js",
        "static/lib/js/angular2/es6/dev/src/testing/shims_for_IE.js",
        "static/lib/js/angular2/bundles/angular2-polyfills.js",
        "static/lib/js/systemjs/dist/system.src.js",
        "static/lib/js/rxjs/bundles/Rx.js",
        "static/lib/js/angular2/bundles/angular2.dev.js",
        "static/lib/js/angular2/bundles/router.dev.js",
        "static/lib/js/angular2/bundles/http.dev.js",
        "static/js/system.config.js",
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./static/js/'));
});

gulp.task('build', ['tsc', 'foundation', 'less']);

gulp.task('run-with-watch', ['tsc', 'foundation', 'less', 'watch', 'webserver']);
