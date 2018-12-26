var iNode = function(name) {
    this.name = name;
    this.location = '';
    this.contents = '';
};

iNode.prototype.set = function(text) {
    this.contents = text;
};

iNode.prototype.append = function(text) {
    this.contents += text;
};

module.exports = iNode;
