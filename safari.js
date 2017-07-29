const { spawn } = require('child_process');
const fs = require('fs');
const Automator = require('./automator');
// const optionPacks = require('./option-packs/chrome');

const executables = [
  // TODO: linux and windows executable locations
  '/Applications/Safari.app/Contents/MacOS/Safari'
];

// detection
exports.getExecutable = () => executables.filter(file => fs.existsSync(file))[0];

//execution
exports.exec = (uri, opts, callback) => {
  const executable = exports.getExecutable();
  console.log('starting safari');

  const ps = spawn('/usr/bin/open', ['-a', 'safari', uri]);
  callback(null, Automator.of(ps, () => {}));
};
