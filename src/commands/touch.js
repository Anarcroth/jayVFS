const jvfs = require('../jvfs');
const rpr = require('./relativePathResolution');

/*
  Creates an empty file in the specified directory.
  Returns an empty string if executed.
  Throws a 'Could not create file' error.
 */

let touch = function(tarNode) {
    if (!tarNode) {
        return Error('touch: missing file operand');
    }
    let tarDir = tarNode.split('/').filter(n => n);
    let tarFile = tarDir.pop();
    if (tarDir.length === 0) {
        tarDir = jvfs.getWd();
    } else {
        tarDir = rpr(tarDir.join('/'));
    }
    tarDir.push(tarFile);
    try {
        return jvfs.createFile(tarDir);
    } catch (e) {
        return 'touch: could not create file \'' + tarNode + '\': ' + e.message;
    }
};

module.exports = touch;
