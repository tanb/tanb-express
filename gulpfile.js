var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var embedTemplates = require('gulp-angular-embed-templates');
var shell = require('gulp-shell');
var webserver = require('gulp-webserver');
var minimist = require('minimist');
var jetpack = require('fs-jetpack');
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
            livereload: true,
            fallback: 'index.html'
        }));
});

var concat = require('gulp-concat');
gulp.task('foundation', function() {
    return gulp.src([
        "static/lib/js/jquery.min.js",
        "static/lib/js/jquery.cookie.js",
        "static/lib/js/bootstrap.min.js",
        "node_modules/core-js/client/shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js",
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./static/lib/js/'));
});

gulp.task('cp-lib-angular2', function() {
    var src = jetpack.cwd('node_modules/@angular');
    var dest = jetpack.dir('static/lib/js/@angular');
    src.copy('.', dest.path(), {
        overwrite: true,
        matching: ['*.js', '*.js.map', '!*/src/**/*', '!*/testing/**/*', '!*/esm/**/*']
    });
    var src = jetpack.cwd('node_modules/rxjs');
    var dest = jetpack.dir('static/lib/js/rxjs');
    src.copy('.', dest.path(), {
        overwrite: true,
        matching: ['*.js', '*.js.map', '!*/src/**/*', '!*/testing/**/*', '!*/esm/**/*']
    });
    var src = jetpack.cwd('node_modules/reflect-metadata');
    var dest = jetpack.dir('static/lib/js');
    src.copy('Reflect.js.map', dest.path('Reflect.js.map'), {
        overwrite: true,
    });

});

gulp.task('embed-template', function () {
    gulp.src('static/js/**/*.js')
        .pipe(embedTemplates())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('build', ['tsc', 'foundation', 'less']);

gulp.task('run-with-watch', ['tsc', 'foundation', 'less', 'watch', 'webserver']);
