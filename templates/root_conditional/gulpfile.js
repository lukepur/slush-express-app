var gulp = require('gulp'),
    browserify = require('browserify'),
    del = require('del'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream');

var paths = {
  scss: ['src/scss/main.scss'],
  app_js: ['src/js/entry.js'],
  build: ['build']
};

var dests = {
  css: 'build/css',
  js: 'build/js'
};

gulp.task('clean', function(done) {
  del(paths.build, done);
});

gulp.task('css', function() {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(dests.css));
});

gulp.task('js', function() {
  browserify(paths.app_js)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(dests.js));
});

gulp.task('default', ['css']);
