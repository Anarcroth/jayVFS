const jvfs = require('../jvfs');

let resolve = function(tarDir) {
    let d = [];
    if (tarDir.startsWith('/')) {
        d.push('/'); // maybe needs to be root
    }
    d = d.concat(tarDir.split('/').filter(n => n));
    if (d === undefined || d.length === 0) {
        return jvfs.getWd();
    } else {
        return [...getAbsPath(d)]; // return a copy of the array
    }
};

let getAbsPath = function(d) {
    let wdStree = [];
    if (d[0] === '/') {
        wdStree = jvfs.getRoot();
    } else {
        wdStree = jvfs.getWdSubtree(jvfs.getWd());
    }
    let wd = wdStree.fullpath.slice();
    for (let i = 0; i < d.length; i++) {
        if (d[i] === '.') {
            // do nothing
        } else if (d[i] === '..') {
            if (wdStree.parenttree.name === 'root' || wdStree.name === 'root') {
                wd = ['/'];
                wdStree = jvfs.getWdSubtree(wd);
            } else {
                wd = wdStree.parentree.fullpath.slice();
                wdStree = jvfs.getWdSubtree(wd);
            }
        } else {
            if (wdStree.subtrees.find(s => s.name === d[i])) {
                wd = wdStree.fullpath.concat(d[i]);
            } else {
                wd.push(d[i]);
            }
        }
    }
    if (wd.length === 0) {
        wd.push('/');
    }
    return wd;
};

module.exports = resolve;
