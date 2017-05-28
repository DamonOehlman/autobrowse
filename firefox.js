/* jshint node: true */
'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;
const mkdirp = require('mkdirp');
const path = require('path');
const debug = require('debug')('autobrowse:firefox');
const uuid = require('uuid');
const rimraf = require('rimraf');
const automator = require('./automator');

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
  createProfile(opts, function(err, profile) {
    var ps;

    if (err) {
      return callback(err);
    }

    debug('attempting to start ' + executable);
    callback(null, automator(
      // spawn the process and pass to the automator
      ps = spawn(executable, ['-profile', profile, uri]),

      // define what happens at cleanup
      function(cb) {
        rimraf(profile, cb);
      }
    ));

    // handle the process erroring
    ps.on('error', callback);
  });
};

module.exports = {
  getExecutable,
  exec
};

function createProfile(opts, callback) {
  var profileOpts = getProfileOpts(opts);
  var profilePath = path.resolve(__dirname, '.profiles', uuid.v4());

  // create a temporary directory for the profile
  mkdirp(profilePath, function(err) {
    if (err) {
      return callback(err);
    }

    // write the file
    fs.writeFile(
      path.join(profilePath, 'user.js'),
      profileOpts.join('\n'), 'utf8',
      function(err) {
        callback(err, profilePath);
      }
    );
  });
}

function getProfileOpts(opts) {
  var profileOpts = [].concat(baselineProfile);

  // expand options
  Object.keys(opts).forEach(function(key) {
    var pack = optionPacks[key];

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

  return profileOpts.map(function(pairs) {
    return 'user_pref("' + pairs[0] + '", ' + pairs[1] + ');';
  });
}
