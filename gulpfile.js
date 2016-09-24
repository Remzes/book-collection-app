var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglifyjs'),
    del = require('del'),
    browserSync = require('browser-sync');


gulp.task('del', function () {
    return del.sync('/styles/modules/index.css')
});

gulp.task('concat', function () {
    return gulp.src([
            './node_modules/jquery-validation/dist/jquery.validate.js',
            './node_modules/jquery/dist/jquery.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('scripts'))
});

gulp.task('css', function () {
    return gulp.src('styles/modules/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('styles/modules'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browserSync', function(){
   browserSync({
       server:{
           baseDir: 'Project/'
       },
       notify: false
   })
});

gulp.task('watch', ['browserSync','css'], function(){
    gulp.watch('styles/modules/**/*.css', ['css']);
});