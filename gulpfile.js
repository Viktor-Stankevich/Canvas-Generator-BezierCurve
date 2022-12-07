import gulp from 'gulp';
import path from './gulp/config/path.js';
import plugins from './gulp/config/plugins.js';
import reset from './gulp/tasks/reset.js';
import html from './gulp/tasks/html.js';
import scss from './gulp/tasks/scss.js';
import js from './gulp/tasks/js.js';
import server from './gulp/tasks/server.js';

global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  gulp,
  path,
  plugins
};

function watcher() {
//   gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
}

const mainTasks = gulp.parallel(html, scss, js);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

export { dev };
export { build };

gulp.task('default', dev);
