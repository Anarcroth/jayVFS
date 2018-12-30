const jvfs = require('../jvfs');

let mkdir = function(paramDir) {
    if (!paramDir) {
        return 'mkdir: missing operand';
    }
    try {
        jvfs.makeDir(paramDir);
        return '';
    } catch (e) {
        return 'mkdir: cannot create directory \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = mkdir;
