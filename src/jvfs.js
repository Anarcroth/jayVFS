const user = require('../src/user');
const mTree = require('../src/mtree');

var jayVFS = function() {
    this.user = user;
    this.mtree = new mTree('root');
    this.wd = this.mtree;

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
        let createdFile = this.createFile(files[f]);
        createdFile.append(files[f + 1]);
    }
};

jayVFS.prototype.deleteFile = function(filePath) {
    try {
        let {file, tarDir} = this.filterPath(filePath);
        tarDir.deleteINode(file);
    } catch(e) {
        console.log(e);
        throw e;
    }
};

jayVFS.prototype.createFile = function(filePath) {
    try {
        let {file, tarDir} = this.filterPath(filePath);
        return tarDir.addINode(file);
    } catch(e) {
        console.log(e);
        throw e;
    }
};

jayVFS.prototype.getFile = function(filePath) {
    try {
        let {file, tarDir} = this.filterPath(filePath);
        return tarDir.getINode(file);
    } catch(e) {
        console.log(e);
        throw e;
    }
};

jayVFS.prototype.filterPath = function(path) {
    path = path.split('/').filter(n => n);
    let file = path.pop();
    let tarDir = this.resolve(path.join('/'));
    return {file, tarDir};
};

jayVFS.prototype.moveWdTo = function(dir) {
    if (dir === '/') {
        this.wd = this.mtree;
    } else if (dir === '.' || dir === './') {
        // Do nothing.
    } else {
        try {
            this.wd = this.resolve(dir);
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
    return this.wd;
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
    let movedToDir = dir;
    // There are cases where the working directory is root and sometimes it's not, so this comparison checks if
    if (dir !== this.wd) {
        movedToDir = this.resolve(dir);
    }
    movedToDir.subtrees.forEach(d => lsContents.push(d.name));
    movedToDir.inodes.forEach(i => lsContents.push(i.name));

    return lsContents.filter(n => n);
};

jayVFS.prototype.deleteDir = function(dir) {
    try {
        dir = this.resolve(dir).fullpath;
        this.mtree.deleteSubtree(dir);
    } catch(e) {
        console.log(e);
        throw Error(e.message);
    }
};

jayVFS.prototype.makeDir = function(dir) {
    try {
        let {file, tarDir} = this.filterPath(dir);
        this.mtree.addSubtree(tarDir.fullpath.concat(file), this.mtree);
    } catch(e) {
        console.log(e);
        throw Error(e.message);
    }
};

jayVFS.prototype.resolve = function(tarDir) {
    let d = [];
    if (tarDir.startsWith('/')) {
        d.push('/'); // maybe needs to be root
    }
    d = d.concat(tarDir.split('/').filter(n => n));
    if (!d || d.length === 0) {
        return this.wd;
    } else {
        return this.getAbsPath(d);
    }
};

jayVFS.prototype.getAbsPath = function(d) {
    let wdStree;
    if (d[0] === '/') {
        wdStree = this.mtree;
    } else {
        wdStree = this.wd;
    }
    for (let i = 0; i < d.length; i++) {
        if (d[i] === '.') {
            // do nothing
        } else if (d[i] === '..') {
            if (wdStree.parenttree.name === 'root' || wdStree.name === 'root') {
                wdStree = this.mtree;
            } else {
                wdStree = wdStree.parenttree;
            }
        } else {
            // Gets child subtree
            wdStree = this.getWdSubtree(wdStree.fullpath.concat(d[i]));
        }
    }
    return wdStree;
};

module.exports = new jayVFS();
