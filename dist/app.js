
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
'use strict';

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var dataHandler = {
  set: function set(obj, prop, value) {
    obj[prop] = value;
    triggerDomChange(prop);
    return true;
  },
  get: function get(target, name) {
    return name in target ? target[name] : '';
  }
};
var dataSet = new Proxy({}, dataHandler);
var relateiveDoms = {};

function traversal(node) {
  //对node的处
  console.log('bbbb');
  var i = 0,
      childNodes = node.childNodes,
      item;

  for (; i < childNodes.length; i++) {
    item = childNodes[i];

    if (item && item.nodeType === 3) {
      var text = item.textContent || "";
      var reg = new RegExp(/{{(.*)}}/, 'gi');

      if (text.match(reg)) {
        // node.innerText = '';
        var res = reg.exec(text);

        if (res.length > 1) {
          if (relateiveDoms[res[1]]) {
            relateiveDoms[res[1]].push(item);
          } else {
            relateiveDoms[res[1]] = [item];
          }

          item.textContent = '';
        }
      }
    }

    if (item.nodeType === 1) {
      //递归先序遍历子节点
      traversal(item);
    }
  }
}

function initRely() {
  var app = document.getElementById('app');
  traversal(app); // relateiveDoms['txtVal'] = [document.getElementById('show-txt')];
}

function triggerDomChange(name) {
  relateiveDoms[name] && relateiveDoms[name].forEach(function (item) {
    debugger;
    item.textContent = dataSet[name];
  }, this);
}

function changeHandler(val) {
  dataSet.txtVal = val.target.value;
}

function addItem() {
  if (dataSet.txtVal) {
    dataSet.list = [].concat(_toConsumableArray(dataSet.list), [dataSet.txtVal]); // dataSet.txtVal = ''
  }
}

function initEvent() {
  var input = document.getElementById('txt');
  input.addEventListener('change', changeHandler);
  var btn = document.getElementById('btn');
  btn.addEventListener('click', addItem);
}

dataSet.txtVal = '';
dataSet.list = [];
initEvent();
initRely();
addItem();
