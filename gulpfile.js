var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'concat-css', 'minify-css', 'concat-js']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('concat-css', function () {
  gulp.src('./www/css/*.css')
    .pipe(concatCss("epcr.css"))
    .pipe(gulp.dest('./www/dist/'));
});

gulp.task('minify-css', function() {
  return gulp.src('./www/dist/epcr.css')
    .pipe(minifyCss({keepBreaks:true}))
    .pipe(rename('epcr.min.css'))
    .pipe(gulp.dest('./www/dist/'))
});

gulp.task('concat-js', function() {
  return gulp.src('./www/js/*.js')
    .pipe(concat('epcr.js'))
    .pipe(gulp.dest('./www/dist/'));
});

//gulp.task('minify-js', function() {
//  gulp.src('./www/dist/epcr.js')
//    .pipe(uglify())
//    .pipe(rename('epcr.min.js'))
//    .pipe(gulp.dest('./www/dist/'))
//});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
