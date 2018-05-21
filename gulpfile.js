var gulp = require('gulp');
var gulpAutoprefixer = require('gulp-autoprefixer');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var config = {
  SASS_SOURCE_DIR: './source/sass/composite/**/*.scss',
  SASS_SOURCES: [
    './partials/**/*.scss',
    './source/sass/composite/**/*.scss',
  ],
  SASS_OUT_DIR: './dist/css/composite/'
};

gulp.task('compile-sass', function() {
  gulp.src(config.SASS_SOURCE_DIR)
  .pipe(sass({
    outputStyle: 'compressed'
  })).on('error', sass.logError)
  .pipe(rename(function(path) {
    path.basename += '.min';
  }))
  .pipe(gulpAutoprefixer({
    browsers: [
      'last 1 version',
      'last 2 iOS versions'
    ],
  }))
  .pipe(gulp.dest(config.SASS_OUT_DIR));
});

gulp.task('watch-sass', function() {
  gulp.watch(config.SASS_SOURCES, ['compile-sass']);
});

gulp.task('build', ['compile-sass']);
gulp.task('grow-build', ['compile-sass']);
gulp.task('default', ['watch-sass']);
