var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babel = require('gulp-babel');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var less = require('gulp-less');
var path = require('path');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('transform', function() {
    return gulp.src('./app/src/**/*.jsx')
        .pipe(babel({
            presets: ["@babel/react", "@babel/preset-env"]
        }))
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('js', gulp.series('transform', function() {
    return browserify('./app/dist/main.js')
        .bundle()
        .on('error', gutil.log)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./'))
        .pipe(connect.reload())
}));

gulp.task('less', function () {
    return gulp.src('./app/src/less/*.less')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./app/**/*.jsx', gulp.series('js'));
    gulp.watch('./app/**/*.less', gulp.series('less'));
});

gulp.task('connect', function() {
    return connect.server({
        root: './',
        livereload: true,
    });
});

gulp.task('open', gulp.series('connect', function() {
    gulp.src('./')
        .pipe(open({
            uri: 'localhost:8080',
            app: 'chrome'
        }));
}));

gulp.task('copy', function () {
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./css'));
});

gulp.task('default', gulp.parallel('open', 'watch', 'copy'));


