const user = require('../src/user');
const mTree = require('../src/mtree');

var jayVFS = function() {
    this.wd = ['/'];

    this.user = user;
    this.mtree = new mTree('root');

    this.mapDirs();
    this.mapFiles();
};

jayVFS.prototype.mapDirs = function() {
    this.user.getDirs().forEach(d => {
        // 'd' has to be an absolute path starting from root ('/').
        // 'd' is first cleaned from the separator character and then passed to the ADT.
        d = d.split('/').filter(n => n);
        this.mtree.addSubtree(d, this.mtree);
    });
};

jayVFS.prototype.mapFiles = function() {
    let files = this.user.getFinalFiles();
    for (let f = 0; f < files.length - 1; f += 2) {
        let file = files[f].split('/').filter(n => n);
        let createdFile = this.createFile(file);
        createdFile.append(files[f + 1]);
    }
};

jayVFS.prototype.deleteFile = function(filePath) {
    try {
        if (filePath.length === 1) {
            this.mtree.deleteINode(filePath.pop());
        } else {
            let file = filePath.pop();
            let tarDir = this.mtree.moveTo(filePath);
            tarDir.deleteINode(file);
        }
    } catch(e) {
        console.log(e);
        throw e;
    }
};

jayVFS.prototype.createFile = function(filePath) {
    try {
        if (filePath[0] === '/') {
            return this.mtree.addINode(filePath.pop().toString());
        } else {
            let file = filePath.pop();
            let tarDir = this.mtree.moveTo(filePath);
            return tarDir.addINode(file);
        }
    } catch(e) {
        console.log(e);
        throw e;
    }
};

jayVFS.prototype.getFile = function(filePath) {
    try {
        if (filePath[0] === '/') {
            return this.mtree.getINode(filePath.pop().toString());
        } else {
            let file = filePath.pop();
            let tarDir = this.mtree.moveTo(filePath);
            return tarDir.getINode(file);
        }
    } catch(e) {
        console.log(e);
        throw e;
    }
};

jayVFS.prototype.moveWdTo = function(dir) {
    if (dir[0] === '/' && dir.length === 1) {
        // This might need 'root' as a value.
        this.wd = ['/'];
    } else if (dir[0] === '.' || dir[0] === './') {
        // Do nothing.
    } else {
        try {
            this.wd = this.mtree.moveTo(dir).fullpath.slice();
        } catch(e) {
            console.log(e);
            throw Error(e.message);
        }
    }
};

jayVFS.prototype.getRoot = function() {
    return this.mtree;
};

jayVFS.prototype.getWd = function() {
    return JSON.parse(JSON.stringify(this.wd));
};

jayVFS.prototype.getWdSubtree = function(dir) {
    if (dir[0] === '/' && dir.length === 1) {
        return this.mtree;
    } else {
        return this.mtree.moveTo(dir);
    }
};

jayVFS.prototype.getDirContents = function(dir) {
    let lsContents = [];
    let movedToDir = {};
    if (dir[0] === '/' && dir.length === 1) {
        movedToDir = this.mtree;
    } else {
        try {
            movedToDir = this.mtree.moveTo(dir);
        } catch(e) {
            console.log(e);
            throw Error(e.message);
        }
    }
    movedToDir.subtrees.forEach(d => lsContents.push(d.name));
    movedToDir.inodes.forEach(i => lsContents.push(i.name));

    return lsContents.filter(n => n);
};

jayVFS.prototype.deleteDir = function(dir) {
    try {
        this.mtree.deleteSubtree(dir);
    } catch(e) {
        console.log(e);
        throw Error(e.message);
    }
};

jayVFS.prototype.makeDir = function(dir) {
    try {
        this.mtree.addSubtree(dir, this.mtree);
    } catch(e) {
        console.log(e);
        throw Error(e.message);
    }
};

module.exports = new jayVFS();
