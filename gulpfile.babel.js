import gulp from 'gulp';
import del from 'del';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';

const paths = {
  scripts: {
    src: 'src/assets/js/**/*.js',
    dest: 'dist/assets/js/'
  },
  styles: {
    src: 'src/assets/scss/**/*.scss',
    dest: 'dist/assets/css/'
  },
  htmls: {
    src: ['src/**/*.pug', '!src/**/_*.pug'],
    watch: ['src/**/*.pug', 'src/**/_*.pug'],
    dest: 'dist/'
  },
  images: {
    src: 'src/assets/images/**/*',
    dest: 'dist/assets/images/'
  }
};

//clean up
export const clean = () => del([ 'dist' ]);

//JS
export function scripts () {
  return webpackStream( webpackConfig, webpack)
  .pipe(gulp.dest(paths.scripts.dest));
}

//CSS
export function styles() {
  return gulp.src(paths.styles.src)
      .pipe(sass({
        outputStyle: 'nested'
      }).on('error', sass.logError))
      .pipe(gulp.dest(paths.styles.dest));
}

//Pug(HTML)
export function htmls () {
  return gulp.src(paths.htmls.src)
  .pipe(pug())
  .pipe(gulp.dest(paths.htmls.dest));
}

//画像
export function images() {
  return gulp.src(paths.images.src)
       .pipe(imagemin({
         verbose: true
       }))
       .pipe(gulp.dest(paths.images.dest))
}

//Watch
export function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.htmls.watch,  htmls);
  gulp.watch(paths.images.src, images);
}


const build = gulp.series(clean, gulp.parallel(htmls, images, scripts, styles));
const _default = gulp.series(clean, gulp.parallel(htmls, images, scripts, styles, watch));

gulp.task('build', build);

export default _default
