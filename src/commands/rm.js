const jvfs = require('../jvfs');

/*
  Returns empty string if command executes.
  Throws missing directory exception.
*/
let rm = function(paramDir) {
    if (paramDir === '.' || paramDir === '/') {
        return 'rm: cannot remove: Is a directory';
    } else if (!paramDir) {
        return 'rm: missing operand';
    }
    try {
        jvfs.deleteFile(paramDir);
        return '';
    } catch (e) {
        return 'rm: cannot remove \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = rm;
