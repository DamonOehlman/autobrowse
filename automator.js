const debug = require('debug')('autobrowser:automater');

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
  if (!!this.cleanup) {
    this.ps.once('exit', () => {
      debug('browser process exited, cleaning up');
      this.cleanup(callback || function() {});
    });
  }

  debug('sending kill signal to browser');
  this.ps.kill();
};
