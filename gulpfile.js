// Modules
const gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require("gulp-rename"),
  plumber = require('gulp-plumber'),
  prefixer = require('gulp-autoprefixer'),

  // Config
  options = {
    babel: {
      presets: ['@babel/env']
    },
    prefixer: {
      versions: ['last 2 browsers']
    },
    pug: {
      pretty: true
    },
    sass: {
      outputStyle: 'compressed'
    },
    paths: {
      pug: `./src/pug/`,
      sass: `./src/scss`,
      es6: `./src/es6`,
      css: `./src/pug/assets/css`,
      js: `./src/pug/assets/js`,
      html: `./dist/`
    }
  }

// Tasks
gulp.task('pug', () =>
  gulp
  .src(`${options.paths.pug}/index.pug`) // Only compile index
  .pipe(plumber())
  .pipe(pug(options.pug))
  .pipe(rename('template.xml'))
  .pipe(gulp.dest(options.paths.html))
)

gulp.task('sass', () =>
  gulp
  .src(`${options.paths.sass}/**/*.scss`)
  .pipe(plumber())
  .pipe(sass(options.sass))
  .pipe(prefixer(options.prefixer))
  .pipe(gulp.dest(options.paths.css))
)

gulp.task('babel', () =>
  gulp
  .src(`${options.paths.es6}/**/*.js`)
  .pipe(plumber())
  .pipe(concat('main.js'))
  .pipe(babel(options.babel))
  .pipe(uglify())
  .pipe(gulp.dest(options.paths.js))
)

// // Watchers
// gulp.task('default', () => {
//   gulp.watch(`${options.paths.pug}/**/*.pug`, ['pug'])
//   gulp.watch(`${options.paths.sass}/**/*.scss`, ['sass'])
//   gulp.watch(`${options.paths.es6}/**/*.js`, ['babel'])
// })