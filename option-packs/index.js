var fs = require('fs');
var path = require('path');

module.exports = function(targetPath) {
  var flags = {};

  fs.readdirSync(targetPath)
    .filter(function(name) {
      return name !== 'index.js' || path.extname(name) !== '.js';
    })
    .forEach(function(name) {
      flags[path.basename(name, '.js')] = require(path.resolve(targetPath, name));
    });

  return flags;
};