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

gulp.task('sass', function () {
    return gulp.src('./app/src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./app/**/*.jsx', gulp.series('js'));
    gulp.watch('./app/**/*.scss', gulp.series('sass'));
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

gulp.task('default', gulp.parallel('open', 'watch'));


