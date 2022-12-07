import fileInclude from 'gulp-file-include';
import versionNumber from 'gulp-version-number';

const html = (() => app.gulp.src(app.path.src.html)
  .pipe(
    app.plugins.if(
      app.isDev,
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>'
        })
      )
    )
  )
  .pipe(
    app.plugins.if(
      app.isBuild,
      versionNumber({
        value: '%DT%',
        append: {
          key: '_v',
          cover: 0,
          to: [
            'css',
            'js'
          ]
        },
        output: {
          file: 'gulp/version.json'
        }
      })
    )
  )
  .pipe(fileInclude())
  .pipe(app.gulp.dest(app.path.build.html))
  .pipe(app.plugins.browsersync.stream())
);

export default html;
