const jvfs = require('../jvfs');
const rpr = require('./relativePathResolution');

let cat = function(tarNode) {
    let tarDir = [];
    let tarFile = '';
    if (!tarNode) {
        return 'cat: missing file operand';
    }
    if (tarNode.startsWith('/')) {
        tarDir = rpr(['/']);
        tarFile = tarNode.split('/').filter(n => n).pop();
    } else {
        tarDir = tarNode.split('/').filter(n => n);
        tarFile = tarDir.pop();
        if (tarDir.length === 0) {
            tarDir = jvfs.getWd();
        } else {
            tarDir = rpr(tarDir.join('/'));
        }
    }
    tarDir.push(tarFile);
    try {
        let file = jvfs.getFile(tarDir);
        return file.contents;
    } catch (e) {
        return 'cat: \'' + tarNode + '\': ' + e.message;
    }
};

module.exports = cat;
