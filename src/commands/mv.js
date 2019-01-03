const jvfs = require('../jvfs');

/*
 */
let mv = function(tarNode) {
    let argument = tarNode.split(' ');
    let dest = argument[0];
    let target = argument[1];

    if (!dest) {
        return Error('mv: missing file operand');
    }
    if (!target) {
        return Error('mv: missing destination file operand after ' + dest);
    }
    try {
        let file = jvfs.getFile(dest);
        // TODO add deep object copy
        // TODO add inode methods
        return jvfs.createFile(tarNode);
    } catch (e) {
        return 'touch: could not create file \'' + tarNode + '\': ' + e.message;
    }
};

module.exports = mv;
