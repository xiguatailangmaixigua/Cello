function Watcher(name, node, vm) {
    Subject.tempWatcher = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.update();
    Subject.tempWatcher = null;
}

Watcher.prototype.getValue = function() {
    this.value = this.vm[this.name];
}

Watcher.prototype.update = function() {
    this.getValue();
    this.node.nodeValue = this.value;
}