/* jshint node: true */
'use strict';

var executables = [
  'firefox',
  'firefox-bin',
  'firefox.exe'
];

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
};