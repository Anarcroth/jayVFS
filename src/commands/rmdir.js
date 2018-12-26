const jvfs = require('../jvfs');
const rpr = require('./relativePathResolution');

/*
  Returns empty string if command executes.
  Throws missing directory exception.
*/
let rmdir = function(paramDir) {
    let tarDir;
    if (paramDir === '/') {
        throw Error('rmdir: cannot delete root directory!');
    } else if (paramDir === '.') {
        return 'rmdir: failed to remove \'.\': Invalid argument';
    } else if (!paramDir) {
        return 'rmdir: missing operand';
    } else {
        tarDir = paramDir.split('/').filter(n => n);
        tarDir = rpr(tarDir.join('/'));
    }
    try {
        jvfs.deleteDir(tarDir);
        return '';
    } catch (e) {
        return 'rmdir: failed to remove \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = rmdir;
