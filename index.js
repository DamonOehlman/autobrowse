/* jshint node: true */
'use strict';

var adapters = [
  require('./firefox')
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
  autobrowse(browserExecutable, uri, opts?, callback?)
  ```

  Launch the specified browser executable targeting the specified uri.  The
  `opts` arg can be used to specify particular [option packs](#option-packs)
  that you wish to enable when running the browser.

  ## Acknowledgements

  This module uses many tricks that
  [browser-launcher](https://github.com/substack/browser-launcher) does for
  creating profiles, etc. So massive thanks to @substack and other
  `browser-launcher` contributors for their efforts.

**/
module.exports = function(executable, uri, opts, callback) {
  // get the adapter (first matching) that works for the specified executable
  var browser = adapters.filter(function(adapter) {
    return adapter.supports(executable);
  })[0];

  // handle the no opts case
  if (typeof opts == 'function') {
    callback = opts;
    opts = {};
  }

  // if we have no matching browser adapter, then report the error
  if (! browser) {
    return callback(new Error('Unable to find suitable adapter for browser executable: ' + executable));
  }

  // run the browser
  return browser.exec(executable, uri, opts, callback);
};