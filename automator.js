/* jshint node: true */
'use strict';

/**
  ## Automator

**/
function Automator(ps, cleanup) {
  if (! (this instanceof Automator)) {
    return new Automator(ps);
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
Automator.prototype.cleanup = function() {

};

/**
  ### terminate()

  Close the process, run the cleanup method
  
**/
Automator.prototype.terminate = function() {

};