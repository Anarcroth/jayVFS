const fs = require('fs');
const readline = require('readline').createInterface({
    input: require('fs').createReadStream('./.conf')
});
const path = require('path');

let fsStructLoader = function() {
    this.dirs = [];
    this.files = [];

    this.configPath = './.conf';

    this.loadFileStructure();
};

fsStructLoader.prototype.loadFileStructure = function() {
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

fsStructLoader.prototype.find = function(lines, str) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].match(str)) {
            return lines[i].split(' = ')[1];
        }
    }
    return null;
};

fsStructLoader.prototype.getDirs = function() {
    return JSON.parse(JSON.stringify(this.dirs));
};

fsStructLoader.prototype.getFiles = function() {
    return JSON.parse(JSON.stringify(this.files));
};

let fsLoader = new fsStructLoader();

module.exports = fsLoader;
