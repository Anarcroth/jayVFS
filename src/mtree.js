const iNode = require('./inode.js');

// TODO add exception handling
// TODO refactor all repeating parts of the structure - mainly navigation and initialization of temp objects
let mTree = function(name) {
    this.size = 0;
    this.root = null;
    this.name = name;
    this.inodes = [];
    this.subtrees = [];
    this.fullpath = [];
    this.parenttree = {};
};

mTree.prototype.init = function() {
    this.root = true;
    // TODO add more initialization data, such as that from the config file
};

/*
  Add an inode to a directory.
  The keyword 'this' is the directory that will  hold the file and it is propagated from the above layer.
*/
mTree.prototype.addINode = function(node) {
    // TODO might be a good idea to refactor this and not allow 'this' to create a file but go to the needed directory and make it happen there.
    let inode = this.inodes.find(i => i.name === node);
    if (inode) {
        // TODO change access time if this is even implemented in the future.
        // Potentially this does not erase files.
        return inode;
    } else {
        let newNode = new iNode(node);
        this.inodes.push(newNode);
        return newNode;
    }
};

/*
  Returns a inode object
 */
mTree.prototype.getINode = function(node) {
    let inode = this.inodes.find(i => i.name === node);
    if (inode) {
        return inode;
    } else {
        throw Error('File doesn\'t exist');
    }
};

/*
  Delete an inode of a specific directory.
*/
mTree.prototype.deleteINode = function(node) {
    if (this.inodes.find(i => i.name === node)) {
        // much like the other filter/find functions,
        // this just creates a new array that filters out everything
        // except the unwanted inode.
        this.inodes = this.inodes.filter(i => i.name !== node);
    } else {
        throw Error('File doesn\'t exist');
    }
};

/*
  Returns a sub-tree that would correspond to the directory passed as an argument.
  The 'targetSubDirs' represents the wanted directory from the user. Because the whole argument is split into an array, each array element is a part of the path to the final destination, hence the name - 'targetSubDirs'.
  Expects absolute path, starting from root.
*/
mTree.prototype.moveTo = function(dir) {
    let workingDir = dir.shift();
    if (dir.length === 0) {
        let nextSubtree = this.subtrees.find(s => s.name === workingDir);
        if (!nextSubtree) {
            throw Error('directory doesn\'t exist.');
        }
        return nextSubtree;
    } else {
        let nextSubtree = this.subtrees.find(s => s.name === workingDir);
        return nextSubtree.moveTo(dir);
    }
};

/*
  Add a sub-tree in a specific path.
  Expects absolute path, starting form root.
*/
mTree.prototype.addSubtree = function(dir, parent) {
    let workingDir = dir.shift();
    if (this.subtrees.find(s => s.name === workingDir)) {
        if (dir.length === 0) {
            throw Error('File exists');
        } else {
            let nextSubtree = this.subtrees.find(x => x.name === workingDir);
            nextSubtree.addSubtree(dir, nextSubtree);
        }
    } else {
        this.subtrees.push(new mTree(workingDir));
        let nextSubtree = this.subtrees.find(x => x.name === workingDir);
        nextSubtree.parenttree = parent;
        nextSubtree.fullpath = nextSubtree.getFullPath(nextSubtree);
        if (dir.length > 0) {
            nextSubtree.addSubtree(dir, nextSubtree);
        }
    }
};

/*
  Delete a sub-tree in a specific path.
  Expects absolute path, starting form root.
*/
mTree.prototype.deleteSubtree = function(dir) {
    let workingDir = dir.shift();
    if (dir.length === 0) {
        let nextSubtree = this.subtrees.find(s => s.name === workingDir);
        if (!nextSubtree) {
            throw Error('Directory doesn\'t exist');
        }
        if (nextSubtree.inodes.length === 0 &&
            nextSubtree.subtrees.length === 0) {
            this.subtrees = this.subtrees.filter(s => s.name !== workingDir);
            return '';
        } else {
            throw Error('Directory not empty');
        }
    } else {
        let nextSubtree = this.subtrees.find(s => s.name === workingDir);
        return nextSubtree.deleteSubtree(dir);
    }
};

/*
  Returns an array indicating the full path to the desired directory.
  Takes in a subtree object.
 */
mTree.prototype.getFullPath = function(subtree) {
    let fullpath = [];
    fullpath.push(subtree.name);
    let nextParentSubtree = subtree.parenttree;
    while (nextParentSubtree.name !== 'root') {
        fullpath.unshift(nextParentSubtree.name);
        nextParentSubtree = nextParentSubtree.parenttree;
    }
    return JSON.parse(JSON.stringify(fullpath));
};

mTree.prototype.list = function() {
    console.log('Dir name: ' + this.name);
    console.log('Dir children:');
    this.subtrees.forEach(s => console.log(s.name));
    console.log('Parent: ' + this.parenttree.name);
    console.log('Full path: ' + this.fullpath);
    console.log('Dir files:');
    this.inodes.forEach(i => console.log(i.name));
    console.log();
    if (this.subtrees.length > 0) {
        this.subtrees.forEach(s => s.list());
    }
};

module.exports = mTree;
