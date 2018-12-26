const jvfs = require('../jvfs');
const rpr = require('./relativePathResolution');

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
    let tarDir = paramDir.split('/').filter(n => n);
    let tarFile = tarDir.pop();
    tarDir = rpr(tarDir.join('/'));
    try {
        jvfs.deleteFile(tarDir.concat(tarFile));
        return '';
    } catch (e) {
        return 'rm: cannot remove \'' + paramDir + '\': ' + e.message;
    }
};

module.exports = rm;
