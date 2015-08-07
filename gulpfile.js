var gulp = require('gulp'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass');

const paths = {
  scripts: [
    './src/javascripts/*.js',
    './bower_components/bootstrap-sass-official/assets/javascripts/*.js',
    './bower_components/gsap/src/minified/*.js'
  ],
  stylesheets: [
    './src/stylesheets',
    './bower_components/bootstrap-sass-official/assets/stylesheets',
    './bower_components/fontawesome/scss'
  ]
};

gulp.task('sass', function() {
  return sass('src/stylesheets/', {
    style: 'compressed',
    loadPath: paths.stylesheets
  })
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
	gulp.src(paths.scripts)
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload());
});

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('images', function () {
  gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./build/img'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./src/stylesheets/*.scss'], ['sass']);
  gulp.watch(['./src/javascripts/*.js'], ['js']);
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/img/*.*'], ['images']);
});

gulp.task('icons', function() {
  return gulp.src('./bower_components/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('default', ['html', 'sass', 'js', 'images', 'connect', 'watch']);
