/* jshint node: true */
'use strict';

const fs = require('fs');
const { spawn } = require('child_process');
const mkdirp = require('mkdirp');
const path = require('path');
const debug = require('debug')('autobrowse:firefox');
const uuid = require('uuid');
const rimraf = require('rimraf');
const Automator = require('./automator');

const executables = [
  '/usr/local/bin/firefox',
  '/usr/local/bin/firefox-bin',
  '/Applications/Firefox.app/Contents/MacOS/firefox-bin'
];

var baselineProfile = [
  [ 'browser.shell.checkDefaultBrowser', false ],

  [ 'browser.cache.disk.capacity', 0 ],
  [ 'browser.cache.disk.smart_size.enabled', false ],
  [ 'browser.cache.disk.smart_size.first_run', false ],
  [ 'browser.sessionstore.resume_from_crash', false ],
  [ 'browser.startup.page', 0 ],

  // TODO: review update settings
  [ 'app.update.auto', false ],
  [ 'app.update.enabled', false ]

  // TODO: support proxies
];

var optionPacks = require('./option-packs/firefox');

/**
  ## Firefox Compatibility Layer

  This is the compatibility layer for firefox.

**/

// detection
const getExecutable = () => executables.filter(file => fs.existsSync(file))[0];

//execution
const exec = (uri, opts, callback) => {
  const executable = getExecutable();

  // create a temporary profile for firefox
  createProfile(opts, (err, profile) => {
    if (err) {
      return callback(err);
    }

    const ps = spawn(executable, ['-profile', profile, uri]);
    debug(`created process for ${executable}, creating automator`, callback);
    callback(null, Automator.of(ps, () => rimraf(profile, () => {})));
  });
};

module.exports = {
  getExecutable,
  exec
};

function createProfile(opts, callback) {
  const profileOpts = getProfileOpts(opts);
  const profilePath = path.resolve(__dirname, '.profiles', uuid.v4());

  // create a temporary directory for the profile
  mkdirp(profilePath, function(err) {
    if (err) {
      return callback(err);
    }

    // write the file
    fs.writeFile(
      path.join(profilePath, 'user.js'),
      profileOpts.join('\n'), 'utf8',
      (err) => callback(err, profilePath)
    );
  });
}

function getProfileOpts(opts) {
  let profileOpts = [].concat(baselineProfile);
  Object.keys(opts).forEach(function(key) {
    const pack = optionPacks.get(key);

    // if the option is a known option, then add to the profile opts
    if (pack) {
      // if this is an array, just add it on
      if (Array.isArray(pack)) {
        profileOpts = profileOpts.concat(pack);
      } else if (typeof pack == 'function') {
        profileOpts = profileOpts.concat(pack(opts[key]));
      }
    }
  });

  return profileOpts.map(([key, value]) => `user_pref("${key}", ${value});`);
}
