/* jshint node: true */
'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var executables = [
  'firefox',
  'firefox-bin',
  'firefox.exe'
];

var baselineProfile = [
  [ 'browser.cache.disk.capacity', 0 ],
  [ 'browser.cache.disk.smart_size.enabled', false ],
  [ 'browser.cache.disk.smart_size.first_run', false ],
  [ 'browser.sessionstore.resume_from_crash', false ],
  [ 'browser.startup.page', 0 ],

  // TODO: review update settings
  [ 'app.update.auto', false ],
  [ 'app.update.enabled', false ],


  // TODO: support proxies
];

var optionPacks = require('./option-packs/firefox');

/**
  ## Firefox Compatibility Layer

  This is the compatibility layer for firefox.

**/

// detection
exports.supports = function(executable) {
  return executables.indexOf(path.basename(executable)) >= 0;
};

//execution
exports.exec = function(executable, url, opts, callback) {
  // create a temporary profile for firefox
  
  console.log('it\'s firefox');
};