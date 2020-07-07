var ELEM_NODE = 1;
var TEXT_NODE = 3;

function Cello(options) {
    this.data = options.data;
    // 劫持属性
    this.hijack();
    this.rootNode = getById(options.id);
    this.dom = this.nodeToFragment(this.rootNode, this);
    this.appendToRoot();
    return this;
}

Cello.prototype.appendToRoot = function() {
    this.rootNode.appendChild(this.dom);
}

Cello.prototype.hijack = function() {
    Object.keys(this.data).forEach((item) => {
        createReactive(this, item, this.data[item]);
    });
}

Cello.prototype.nodeToFragment = function(node, vm) {
    var fg = document.createDocumentFragment();
    var childNode = null;
    childNode = node.firstChild;
    while (childNode) {
        this.compile(childNode, vm);
        fg.append(childNode);
        childNode = node.firstChild;
    }
    return fg;
}

Cello.prototype.compile = function(node, vm) {
    var regData = /\{\{(.*)\}\}/;
    var duplexName = 'c-model';
    if (node.nodeType === ELEM_NODE) {
        var attrs = node.attributes;
        if (!attrs) {
            return null;
        }
        Array.from(attrs).forEach(function(item) {
            if (item.nodeName === duplexName) {
                node.addEventListener('input', function(e) {
                    vm[item.nodeValue] = e.target.value;
                });
                node.value = vm[item.nodeValue];
            }
        });
    }
    if (node.nodeType === TEXT_NODE) {
        if (regData.test(node.nodeValue)) {
            var varName = RegExp.$1.trim();
            // node.nodeValue = vm.data[varName];
            // node.nodeValue = vm[varName];
            new Watcher(varName, node, this);
        }
    }
}