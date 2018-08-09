import gulp from 'gulp';
import del from 'del';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack';
import sass from 'gulp-sass';

const paths = {
  scripts: {
    src: 'src/assets/js/**/*.js',
    dest: 'dist/assets/js/'
  },
  styles: {
    src: 'src/assets/scss/**/*.scss',
    dest: 'dist/assets/css/'
  },
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

//Watch
export function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

const build = gulp.series(clean, gulp.parallel(scripts, styles));
const _default = gulp.series(clean, gulp.parallel(scripts, styles, watch));

gulp.task('build', build);

export default _default
