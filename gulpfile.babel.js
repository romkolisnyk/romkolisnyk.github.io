import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import csso from 'gulp-csso';
import posthtml from 'gulp-posthtml';
import include from 'posthtml-include';
import w3cjs from 'gulp-w3cjs';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
import jsmin from 'gulp-uglify';
import babel from 'gulp-babel';
import concat from 'gulp-concat';

const server = browserSync.create();

gulp.task('copy', () => gulp.src([
  'source/fonts/**/*',
  'source/img/**/*',
], {
  base: 'source',
})
  .pipe(gulp.dest('build')));

gulp.task('clean', () => del('build'));

gulp.task('css', () => gulp.src('source/sass/main.sass')
  .pipe(plumber())
  .pipe(sass({
    includePaths: require('node-normalize-scss').includePaths}))
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(csso())
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream()));

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('server', () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/img/**/*', gulp.series('copy'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('js', 'refresh'));
});

gulp.task('images', () => gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest('build/img')));

gulp.task('html', () => gulp.src('source/*.html')
  .pipe(posthtml([
    include(),
  ]))
  .pipe(w3cjs())
  .pipe(htmlmin({
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
  }))
  .pipe(gulp.dest('build')));

gulp.task('js', () => gulp.src('source/js/**/*.js')
  .pipe(concat('scripts.js'))
  .pipe(babel({ presets: ['@babel/env'] }))
  .pipe(jsmin())
  .pipe(gulp.dest('build/js')));

gulp.task('start', gulp.series('clean', 'copy', 'css', 'html', 'js', 'server'));

gulp.task('build', gulp.series('clean', 'copy', 'css', 'html', 'js', 'images', 'server'));
