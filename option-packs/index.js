const fs = require('fs');
const path = require('path');

/**
  ## Option Packs

  Option Packs are used to modify browser functionality when being automated.

  In most cases an option pack is enabled by simply calling `autobrowse`
  making use of the options argument. For instance, the following is code that
  you might use to launch a url in firefox nightly with the `webrtc` option
  pack enabled.

  ```js
  autobrowse('~/ff/nightly/firefox', 'http://google.com', { webrtc: true });
  ```
**/
module.exports = function(targetPath) {
  const optionPackTuples = fs.readdirSync(targetPath)
    .filter(name => name !== 'index.js' || path.extname(name) !== '.js')
    .map(name => [path.basename(name, '.js'), require(path.resolve(targetPath, name))]);

  return new Map(optionPackTuples);
};
