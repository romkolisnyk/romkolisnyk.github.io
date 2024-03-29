import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import csso from 'gulp-csso';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
const sass = gulpSass(dartSass);

const server = browserSync.create();

gulp.task('copy', () => gulp.src([
  'source/fonts/**/*',
  'source/img/**/*',
], {
  base: 'source',
})
  .pipe(gulp.dest('docs')));

gulp.task('clean', () => del('docs'));

gulp.task('css', () => gulp.src('source/styles/main.scss')
  .pipe(plumber())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(postcss([autoprefixer()]))
  .pipe(csso())
  .pipe(gulp.dest('docs/css'))
  .pipe(server.stream()));

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('server', () => {
  server.init({
    server: 'docs/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('source/styles/**/*.{scss, sass}', gulp.series('css'));
  gulp.watch('source/img/**/*', gulp.series('copy'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
});

gulp.task('images', () => gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest('docs/img')));

gulp.task('html', () => gulp.src('source/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
  }))
  .pipe(gulp.dest('docs')));

gulp.task('start', gulp.series('clean', 'copy', 'css', 'html', 'server'));

gulp.task('docs', gulp.series('clean', 'copy', 'css', 'html', 'images', 'server'));
