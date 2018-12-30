const jvfs = require('../jvfs');

/*
  Creates an empty file in the specified directory.
  Returns an empty string if executed.
  Throws a 'Could not create file' error.
 */
let touch = function(tarNode) {
    if (!tarNode) {
        return Error('touch: missing file operand');
    }
    try {
        return jvfs.createFile(tarNode);
    } catch (e) {
        return 'touch: could not create file \'' + tarNode + '\': ' + e.message;
    }
};

module.exports = touch;
