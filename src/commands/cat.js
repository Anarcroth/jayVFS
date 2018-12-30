const jvfs = require('../jvfs');

let cat = function(tarNode) {
    if (!tarNode) {
        return 'cat: missing file operand';
    }
    try {
        let file = jvfs.getFile(tarNode);
        return file.contents;
    } catch (e) {
        return 'cat: \'' + tarNode + '\': ' + e.message;
    }
};

module.exports = cat;
