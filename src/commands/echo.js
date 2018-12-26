const jvfs = require('../jvfs');
const touch = require('./touch');

/*
  Display texts from input.
*/
let echo = function(param) {
    let stringArgs = [];
    let targetFilePath = '';
    // Separate the passed arguments to strings, redirection char, and target file.
    for (var i = 0; i < param.length; i++) {
        if (param[i] === '>' || param[i] === '>>') {
            targetFilePath = param[i + 1];
            break;
        }
        stringArgs.push(param[i]);
    }
    if (param.includes('>')) {
        let file = touch(targetFilePath);
        file.set(stringArgs.join(' '));
        return '';
    } else if (param.includes('>>')) {
        let file = touch(targetFilePath);
        file.append(stringArgs.join(' '));
        return '';
    } else {
        return param.join(' ');
    }
};

module.exports = echo;
