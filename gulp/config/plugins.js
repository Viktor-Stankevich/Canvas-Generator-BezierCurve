import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import ifpugin from 'gulp-if';

const plugins = {
  plumber,
  notify,
  browsersync,
  if: ifpugin
};

export default plugins;
