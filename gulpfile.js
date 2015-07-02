var gulp = require('gulp'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
  return sass('src/stylesheets/', {
    style: 'compressed',
    loadPath: [
      './src/stylesheets',
      './bower_components/bootstrap-sass-official/assets/stylesheets',
      './bower_components/fontawesome/scss'
    ]})
    .pipe(gulp.dest('build/css'))
    .pipe(livereload());
});

gulp.task('connect', function() {
  connect.server({
    port: 3005,
    root: 'build',
    livereload: true
  });
});

gulp.task('js', function () {
  gulp.src('./src/javascripts/*.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload());
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./src/stylesheets/*.scss'], ['sass']);
  gulp.watch(['./src/javascripts/*.js'], ['js']);
  gulp.watch(['./src/*.html'], ['html']);
});

gulp.task('icons', function() {
  return gulp.src('./bower_components/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('default', ['connect', 'watch']);
