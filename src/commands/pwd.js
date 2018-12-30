const jvfs = require('../jvfs');

let pwd = function() {
    if (jvfs.getWd()[0] === '/') {
        return jvfs.getWd().join('/');
    } else {
        return '/' + jvfs.getWd().fullpath.join('/');
    }
};

module.exports = pwd;
