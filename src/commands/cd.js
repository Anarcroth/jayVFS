const jvfs = require('../jvfs');
const rpr = require('./relativePathResolution');

/*
  Returns empty string if command executes.
  Throws missing directory exception.
*/
let cd = function(paramDir) {
    let tarDir;
    // Since there is no $HOME directory, an empty parameter goes to root as well
    if (paramDir === '/' || !paramDir) {
        tarDir = ['/'];
    } else {
        tarDir = rpr(paramDir);
    }
    try {
        jvfs.moveWdTo(tarDir);
        return '';
    } catch (e) {
        return 'cd: no such file or directory: ' + paramDir;
    }
};

module.exports = cd;
