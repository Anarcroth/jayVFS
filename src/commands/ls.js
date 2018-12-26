const jvfs = require('../jvfs');
const rpr = require('./relativePathResolution');

/*
  Returns a list of strings, representing all of the sub-directories and files on the current directory.
 */
let ls = function(paramDir) {
    let tarDir = [];
    if (paramDir === '/') {
        tarDir = ['/']; // might need to change to 'root'
    } else if (!paramDir) {
        tarDir = jvfs.getWd();
    } else {
        tarDir = rpr(paramDir);
    }
    try {
        return jvfs.getDirContents(tarDir).join('\n');
    } catch (e) {
        return 'ls: cannot access \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = ls;
