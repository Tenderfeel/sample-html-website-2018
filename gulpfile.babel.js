import gulp from 'gulp';
import del from 'del';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack';

const paths = {
  scripts: {
    src: 'src/assets/js/**/*.js',
    dest: 'dist/assets/js/'
  }
};

//clean up
export const clean = () => del([ 'dist' ]);

//JS
export function scripts () {
  return webpackStream( webpackConfig, webpack)
  .pipe(gulp.dest(paths.scripts.dest));
}

//Watch
export function watch() {
  gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(clean, gulp.parallel(scripts));
const _default = gulp.series(clean, gulp.parallel(scripts, watch));

gulp.task('build', build);

export default _default
