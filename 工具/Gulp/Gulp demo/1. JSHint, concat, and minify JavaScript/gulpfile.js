

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


gulp.task('greet', function () {
   console.log('Hello world!');
});



gulp.task('scripts', function () {
   return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('common.js'))
      .pipe(gulp.dest('js_build'));
});



 // The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts']);
