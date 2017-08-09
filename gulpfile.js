var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var useref = require('gulp-useref');
var templateCache = require('gulp-angular-templatecache');

var historyApiFallback = require('connect-history-api-fallback')

var browserSync = require('browser-sync').create();

var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
 


var paths = {
  sass: ['./app/styles/*.scss'],
  templates: ['!./app/index.html', './app/src/**/**.html']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  return gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./app/www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./app/www/css/'))
    .pipe(browserSync.stream())
    // .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});


gulp.task('templates', function () {
  sh.rm('app/src/layout/layout.module.js');

  return gulp.src(paths.templates)
    .pipe(templateCache('layout.module.js',{
      module: 'mastori.layout',
      moduleSystem: 'IIFE',
      standalone: true
    }))
    .pipe(gulp.dest('app/src/layout/'));
});

gulp.task('build', ['install','sass'], function(){
  console.log('---- built successfully ---');
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

gulp.task('serve', ['sass', 'build'], function() {

    browserSync.init({
        server: "./www",
        middleware: [historyApiFallback()]
    });

    gulp.watch("app/styles/*.scss", ['sass','build']);
    gulp.watch("app/styles/**/*.scss", ['sass','build']);
    gulp.watch("app/**/*.html", ['build']).on('change', browserSync.reload);
    gulp.watch("app/**/*.js", ['build']).on('change', browserSync.reload);
});
gulp.task('assets', function(){
  sh.cp('-R', 'app/images/', 'www/images');
  sh.cp('-R', 'app/fonts/', 'www/fonts');
  sh.cp('-R', 'app/svg/', 'www/svg');
});

gulp.task('build',['assets'], function(){
  // Copy landing page assets to www

  sh.mkdir('-p', 'www/js/landing');
  sh.mkdir('-p', 'www/css/landing');
  sh.cp('-R', './app/scripts/landing/', './www/js/landing');
  sh.cp('-R', './app/styles/landing/', './www/css/landing');

  return gulp.src('app/index.html')
             .pipe(useref({searchPath: './app'}))
             .pipe(gulp.dest('./www'));
});

gulp.task('deploy', function(){
  sh.rm('-rf', 'dist');
  sh.mkdir('-p', 'dist');
  sh.cp('-R', 'www/', 'dist');
})


gulp.task('serve:before', ['sass', 'watch']);
