const autobrowse = require('..');

autobrowse('firefox', 'http://www.google.com', (err, automator) => {
  // close the browser after 10s
  setTimeout(() => {
    automator.kill();
  }, 10e3);
});
