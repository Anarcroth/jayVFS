const jvfs = require('../jvfs');

/*
  Returns empty string if command executes.
  Throws missing directory exception.
*/
let cd = function(paramDir) {
    // Since there is no $HOME directory, an empty parameter goes to root as well
    if (!paramDir) {
        paramDir = '/';
    }
    try {
        jvfs.moveWdTo(paramDir);
        return '';
    } catch (e) {
        return 'cd: no such file or directory: ' + paramDir;
    }
};

module.exports = cd;
