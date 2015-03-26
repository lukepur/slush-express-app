var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    inquirer = require('inquirer'),
    ignore = require('gulp-ignore'),
    path = require('path');

gulp.task('default', function (done) {
  var defaults = {
    name: path.basename(process.cwd()),
    description: '',
    includeFrontend: 'yes',
    license: "MIT"
  };

  function run (answers) {
    var viewsGlobs = [path.join(__dirname, 'templates/views'),
      path.join(__dirname, 'templates/views/**/*')];

    gulp.src(path.join(__dirname, 'templates/**/*'))

    // Remove view if no frontend
    .pipe(ignore.exclude(!answers.includeFrontend ? viewsGlobs : ''))

    .pipe(template(answers))

    .pipe(gulp.dest('./'))

    .pipe(install())

    .on('end', function() {
      done();
    });
  }

  inquirer.prompt([
    {
      name: 'name',
      message: 'What is the name of this project?',
      default: defaults.name
    },
    {
      name: 'description',
      message: 'What is the description of this project?',
      default: defaults.description
    },
    {
      type: 'confirm',
      name: 'includeFrontend',
      message: 'Do you want to include the handlebars template engine?',
      default: defaults.includeFrontend
    },
    {
      name: 'license',
      message: 'Licence',
      default: defaults.license
    }
  ], run);
});
