const { spawn } = require('child_process');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const os = require('os');
const debug = require('debug')('autobrowse:chrome');
const uuid = require('uuid');
const rimraf = require('rimraf');
const Automator = require('./automator');
const optionPacks = require('./option-packs/chrome');

const executables = [
  // TODO: linux and windows executable locations
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
];

// detection
exports.getExecutable = () => executables.filter(file => fs.existsSync(file))[0];

//execution
exports.exec = (uri, opts, callback) => {
  const profileDir = path.resolve(os.tmpdir(), `chrome-profile-${uuid.v4()}`);
  const executable = exports.getExecutable();
  const additionalArgs = Object.keys(opts).reduce((memo, key) => {
    return memo.concat(optionPacks.get(key) || []);
  }, []);

  const args = additionalArgs.concat([
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-default-apps',
    '--disable-sync',
    '--disable-restore-session-state',
    '--noerrdialogs',
    '--enable-automation',
    `--user-data-dir=${profileDir}`,
    uri
  ]);

  // create a temporary profile for firefox
  mkdirp(profileDir, (err) => {
    if (err) {
      return callback(err);
    }

    // console.log(args);
    const ps = spawn(executable, args);
    debug(`created process for ${executable}, creating automator`, callback);
    callback(null, Automator.of(ps, () => rimraf(profileDir, () => {})));
  });
};
