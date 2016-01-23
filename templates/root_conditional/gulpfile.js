var gulp = require('gulp'),
    browserify = require('browserify'),
    del = require('del'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    browsersync = require('browser-sync'),
    path = require('path');

var buildDir = 'build',
    paths = {
      scss_main: ['src/scss/main.scss'],
      scss_all: ['src/scss/**/*.scss'],
      images: ['src/images/**/*.*'],
      app_js: ['src/js/entry.js'],
      scripts: ['src/js/**/*.js'],
      build: [buildDir]
    };

var dests = {
  css: path.join(buildDir, 'css'),
  js: path.join(buildDir, 'js'),
  images: path.join(buildDir, 'images')
};

gulp.task('clean', function(done) {
  del(paths.build, done);
});

gulp.task('css', function() {
  return gulp.src(paths.scss_main)
    .pipe(sass())
    .pipe(gulp.dest(dests.css));
});

gulp.task('images', function() {
  gulp.src(paths.images)
  .pipe(gulp.dest(dests.images));
});

gulp.task('js', function() {
  browserify(paths.app_js)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(dests.js));
});

gulp.task('watch', function() {
  gulp.watch(paths.scss_all, ['css']);
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.images, ['images']);

  browsersync({
    baseDir: buildDir,
    files: [path.join(dests.css, 'main.css'), path.join(dests.js, 'bundle.js')]
  });
});

gulp.task('default', ['css', 'images', 'js']);
