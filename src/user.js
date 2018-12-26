const fs = require('fs');
const readline = require('readline').createInterface({
    input: require('fs').createReadStream('./.conf')
});
const path = require('path');

let user = function() {
    this.dirs = [];
    this.files = [];
    this.finalFiles = [];
    this.filesContents = [];

    this.configPath = './.conf';
    this.contentsPath = './contents/';
};

user.prototype.init = function() {
    this.readDirs();
    this.readFiles();
};

user.prototype.readFiles = function() {
    let dirContents = fs.readdirSync(this.contentsPath, 'utf8');
    for (let f = 0; f < dirContents.length; f++) {
        for (let fc = 0; fc < this.files.length; fc++) {
            if (this.files[fc].endsWith(dirContents[f])) {
                this.finalFiles.push(this.files[fc]);
                this.finalFiles.push(fs.readFileSync(this.contentsPath + dirContents[f], 'utf-8', function(){}));
            }
        }
    }
};

user.prototype.readDirs = function() {
    let lines = fs.readFileSync(this.configPath, 'utf8', function(){}).split('\n');
    for (var line = 0; line < lines.length; line++) {
        if (lines[line].charAt(0) === '#') {
            lines.splice(line, 1);
            line -= 1;
        }
    }
    lines = lines.filter(n => n);

    this.dirs = this.find(lines, 'sub_directories').split(' ');
    this.files = this.find(lines, 'files').split(' ');
};

user.prototype.find = function(lines, str) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].match(str)) {
            return lines[i].split(' = ')[1];
        }
    }
    return null;
};

user.prototype.getDirs = function() {
    return JSON.parse(JSON.stringify(this.dirs));
};

user.prototype.getFiles = function() {
    return JSON.parse(JSON.stringify(this.files));
};

user.prototype.getFilesContents = function() {
    return JSON.parse(JSON.stringify(this.filesContents));
};

user.prototype.getFinalFiles = function() {
    return JSON.parse(JSON.stringify(this.finalFiles));
};

let u = new user();
u.init();

module.exports = u;
