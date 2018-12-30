const jvfs = require('../jvfs');

/*
  Returns a list of strings, representing all of the sub-directories and files on the current directory.
 */
let ls = function(paramDir) {
    if (!paramDir) {
        paramDir = jvfs.getWd();
    }
    try {
        return jvfs.getDirContents(paramDir).join('\n');
    } catch (e) {
        return 'ls: cannot access \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = ls;
