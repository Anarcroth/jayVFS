const jvfs = require('../jvfs');
const rpr = require('./relativePathResolution');

let mkdir = function(paramDir) {
    let tarDir;
    if (!paramDir) {
        return 'mkdir: missing operand';
    } else {
        tarDir = paramDir.split('/').filter(n => n);
        let tempDir = tarDir.pop();
        // If we are anyways in the current dir, no point in navigating away
        if (tarDir.length < 1) {
            tarDir = jvfs.getWd();
            tarDir.push(tempDir);
        } else {
            tarDir = rpr(tarDir.join('/'));
            tarDir.push(tempDir);
            tarDir = tarDir.filter(n => n !== '/');
        }
    }
    try {
        jvfs.makeDir(tarDir);
        return '';
    } catch (e) {
        return 'mkdir: cannot create directory \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = mkdir;
