const jvfs = require('../jvfs');

/*
  Returns empty string if command executes.
  Throws missing directory exception.
*/
let rmdir = function(paramDir) {
    if (paramDir === '/') {
        throw Error('rmdir: cannot delete root directory!');
    } else if (paramDir === '.') {
        return 'rmdir: failed to remove \'.\': Invalid argument';
    } else if (!paramDir) {
        return 'rmdir: missing operand';
    }
    try {
        jvfs.deleteDir(paramDir);
        return '';
    } catch (e) {
        return 'rmdir: failed to remove \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = rmdir;
