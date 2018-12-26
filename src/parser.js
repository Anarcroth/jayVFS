const fs = require('fs');

const ls = require('./commands/ls');
const cd = require('./commands/cd');
const cat = require('./commands/cat');
const pwd = require('./commands/pwd');
const date = require('./commands/date');
const echo = require('./commands/echo');
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
        return 'TBD';
    case 'mv':
        return 'TBD';
    case 'cd':
        return cd(params);
    case 'cp':
        return 'TBD';
    case 'cat':
        return cat(params);
    case 'pwd':
        return pwd();
    case 'date':
        return date();
    case 'echo':
        // This takes in the whole line after the 'echo' command
        return echo(commandAndParams.slice(1));
    case 'help':
        return help(params);
    case 'mkdir':
        return mkdir(params);
    case 'rmdir':
        return rmdir(params);
    case 'touch':
        // This command needs to specifically return an empty string,
        // because it returns an object that might be used by other commands
        touch(params);
        return '';
    case '':
        return '';
    default:
        throw Error('mishmash: command not found: ' + c);
    }
};

module.exports = new parser();
