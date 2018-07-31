const Store = require('electron-store');
const { name } = require('../package.json');

const { readdirSync, statSync } = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3031';
const PROJECT_ROOT = '/Users/myang/git/RamPump/src';
const PROJECT_PATH = path.resolve(PROJECT_ROOT);

/**
 * Get list of all directories in a directory
 * @param {String} p Absolute path of directory
 */
function getDirectories(p) {
  return readdirSync(p).filter(f => statSync(path.join(p, f)).isDirectory());
}

function mapDirs(dirs) {
  let excludes = ['node_modules', 'tests'];

  return dirs
    .filter(dir => excludes.indexOf(dir) == -1 && dir[0] !== '_')
    .map(dir => {
      return {
        name: dir,
        dirname: dir,
        path: `/rampump/src/${dir}`,
        thumbnail: '',
        port: 3031,
        url: `${BASE_URL}/${dir}`
      };
    });
}

const store = new Store({
  name,
  defaults: {
    projects: [],
    pages: [],
    recents: [],
    baseUrl: BASE_URL,
    projectRoot: PROJECT_ROOT,
    projectPath: PROJECT_PATH
  }
});

store.set('pages', mapDirs(getDirectories(PROJECT_ROOT)));

module.exports = store;
