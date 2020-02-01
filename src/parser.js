const fs = require('fs');

const ls = require('./commands/ls');
const cd = require('./commands/cd');
const mv = require('./commands/mv');
const rm = require('./commands/rm');
const cat = require('./commands/cat');
const pwd = require('./commands/pwd');
const help = require('./commands/help');
const mkdir = require('./commands/mkdir');
const rmdir = require('./commands/rmdir');
const touch = require('./commands/touch');

let parser = function() {
    this.commandsDir = './src/commands/';
};

parser.prototype.parse = function(command) {
    let commandAndParams = command.split(' ');
    let c = commandAndParams[0];
    let params = commandAndParams[1];
    switch (c) {
    case 'ls':
        return ls(params);
    case 'rm':
        return rm(params);
    case 'mv':
        // Takes in the whole line after the 'mv' command
        return mv(commandAndParams.slice(1));
    case 'cd':
        return cd(params);
    case 'cp':
        throw Error('command not implemented yet');
    case 'cat':
        return cat(params);
    case 'pwd':
        return pwd();
    case 'help':
        return help(params);
    case 'mkdir':
        return mkdir(params);
    case 'rmdir':
        return rmdir(params);
    case 'touch':
        touch(params);
        return '';
    case '':
        return '';
    default:
        throw Error('command not found: ' + c);
    }
};

module.exports = new parser();
