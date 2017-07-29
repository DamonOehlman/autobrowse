/* jshint node: true */
'use strict';

const debug = require('debug')('autobrowse');
const { checkArgument } = require('conditional');
const adapters = [
  require('./firefox'),
  require('./chrome')
];

/**
  # autobrowse

  A simple browser automation helper, given you know where you want to run
  your browsers from.  There is no automatic browser discovery (as per
  what [browser-launcher](https://github.com/substack/browser-launcher) does).

  ## Why?

  Unfortunately I require some functionality that differs from the way
  browser-launcher works at it's core.  Chances are that for most people's
  use cases, browser-launcher is probably a better choice.

  ## Reference

  ### autobrowse

  ```js
  autobrowse(browserName, uri, opts, callback?)
  ```

  ## Example

  <<< examples/firefox.js

  Launch the specified browser executable targeting the specified uri.  The
  `opts` arg can be used to specify particular [option packs](#option-packs)
  that you wish to enable when running the browser.

  ## Acknowledgements

  This module uses many tricks that
  [browser-launcher](https://github.com/substack/browser-launcher) does for
  creating profiles, etc. So massive thanks to @substack and other
  `browser-launcher` contributors for their efforts.

**/
module.exports = function(browser, uri, opts, callback) {
  // check and create fallback arguments where appropriate
  checkArgument(typeof browser == 'string', 'autobrowse browser argument must be a string');
  checkArgument(typeof uri == 'string', 'autobrowse url argument must be a string');
  checkArgument(typeof opts == 'object' || opts === null, 'autobrowse opts must be an object or null');
  callback = callback || {};

  // get the adapter (first matching) that works for the specified executable
  const adapter = adapters.filter(adapter => {
    return !!adapter.getExecutable();
  })[0];

  debug('found adapter for browser ' + browser);
  if (!browser) {
    return callback(new Error('Unable to find suitable adapter for browser executable: ' + executable));
  }

  // run the browser
  return adapter.exec(uri, opts, callback);
};
