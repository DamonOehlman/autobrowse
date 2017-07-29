const debug = require('debug')('autobrowser:automater');

class Automator {
  constructor(ps) {
    this.ps = ps;
  }

  static of(ps, cleanup) {
    if (typeof cleanup == 'function') {
      ps.once('exit', () => {
        debug('browser process exited, cleaning up');
        cleanup()
      });
    }

    return new Automator(ps);
  }

  kill() {
    debug('sending kill signal to browser');
    this.ps.kill();
  }
}

module.exports = Automator;
