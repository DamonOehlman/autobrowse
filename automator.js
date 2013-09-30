/* jshint node: true */
'use strict';

/**
  ## Automator

**/
function Automator(ps, cleanup) {
  if (! (this instanceof Automator)) {
    return new Automator(ps, cleanup);
  }

  // save the process instance so we can kill it
  this.ps = ps;

  // patch in the cleanup method
  if (typeof cleanup == 'function') {
    this.cleanup = cleanup;
  }
}

module.exports = Automator;

/**
  ### cleanup()

  Placeholder cleanup method.

**/
Automator.prototype.cleanup = function(callback) {
  callback();
};

/**
  ### kill()

  Close the process, run the cleanup method
  
**/
Automator.prototype.kill = function(callback) {
  var automator = this;

  // once the created process has exited, cleanup
  this.ps.once('exit', function() {
    automator.cleanup(callback);
  });

  // send the kill signal
  this.ps.kill();
};