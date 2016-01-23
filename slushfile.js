var gulp = require('gulp'),
    exec = require('child_process').exec,
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    inquirer = require('inquirer'),
    ignore = require('gulp-ignore'),
    rename = require('gulp-rename'),
    path = require('path');

gulp.task('run-scaffold', function (done) {
  var defaults = {
    name: path.basename(process.cwd()),
    description: '',
    includeFrontend: true,
    includeMongo: false,
    dbUrl: 'mongodb://127.0.0.1/test',
    license: "MIT"
  };

  var TPL_BASE = 'templates',
      STATIC_PATHS = ['*.*', ];

  function constructPaths (answers) {
    // paths to include (i.e. always required)
    var paths = ['routes'];

    // Add frontend capabilities
    if (answers.includeFrontend) {
      paths.push('views');
      paths.push('src');
    }

    // Add mongo capabilities
    if (answers.includeMongo) {
      paths.push('models');
    }

    // Turn paths into globs
    paths.forEach(function(_path, index){
      paths[index] = path.join(__dirname, TPL_BASE, _path) + '/**/*.*';
    });

    // Conditional files at project root
    if (answers.includeFrontend) {
      paths.push(path.join(__dirname, TPL_BASE, 'root_conditional/gulpfile.js'));
    }

    // Add files at root of templates dir
    paths.push(path.join(__dirname, TPL_BASE, '*.*'));
    paths.push(path.join(__dirname, TPL_BASE, '.*'));
    return paths;
  }

  function run (answers) {
    var includedPaths = constructPaths(answers),
        templatesPath = path.join(__dirname, TPL_BASE);

    gulp.src(includedPaths, {base: templatesPath})

    .pipe(template(answers))

    // Move root_conditional files to root
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('root_conditional', '');
    }))

    .pipe(gulp.dest(process.cwd()))
    .on('end', function() {
      console.log('App built. Installing dependencies...');
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
      type: 'confirm',
      name: 'includeMongo',
      message: 'Do you want to include MongoDB integration?',
      default: defaults.includeMongo
    },
    {
      when: function (_answers) {
        return _answers.includeMongo;
      },
      name: 'dbUrl',
      message: 'What is the mongo DB url?',
      default: defaults.dbUrl
    },
    {
      name: 'license',
      message: 'Licence',
      default: defaults.license
    }
  ], run);
});

gulp.task('install', ['run-scaffold'], function(cb) {
  exec('npm update --save', function(err) {
    cb(err);
  });
});

gulp.task('install:dev', ['run-scaffold'], function(cb) {
  exec('npm update --save-dev', function(err) {
    cb(err);
  });
});

gulp.task('build-and-install', ['run-scaffold', 'install', 'install:dev'], function (done) {
  console.log('Dependencies installed. Now run:\ngulp && npm start');
  done();
});

gulp.task('default', ['build-and-install']);
