let dataHandler = {
    set: function(obj, prop, value) {
        obj[prop] = value;
        triggerDomChange(prop);
        return true;
    },
    get: function(target, name){
        return name in target ? target[name] : '';
    }
};
let dataSet = new Proxy({}, dataHandler);
let relateiveDoms = {};

function traversal(node){
      //对node的处
      console.log('bbbb');
      var i = 0, childNodes = node.childNodes,item;
      for(; i < childNodes.length ; i++){
            item = childNodes[i];
            if (item && item.nodeType === 3){
                let text = item.textContent || ""
                let reg = new RegExp(/{{(.*)}}/, 'gi')
                if (text.match(reg)) {
                    // node.innerText = '';
                    let res = reg.exec(text);
                    if (res.length > 1) {
                        if (relateiveDoms[res[1]]) {
                            relateiveDoms[res[1]].push(item)
                        } else {
                            relateiveDoms[res[1]] = [item]
                        }
                        item.textContent = ''
                    }
                }
            }
            if(item.nodeType === 1){
                //递归先序遍历子节点
                traversal(item);
            }
      }
}

function initRely() {
    let app = document.getElementById('app')
    traversal(app);
    // relateiveDoms['txtVal'] = [document.getElementById('show-txt')];
}


function triggerDomChange(name) {
    relateiveDoms[name] && relateiveDoms[name].forEach(item=> {
        debugger;
        item.textContent = dataSet[name]
    }, this)
}
function changeHandler(val) {
    dataSet.txtVal = val.target.value
}

function addItem() {
    if (dataSet.txtVal) {
        dataSet.list = [...dataSet.list, dataSet.txtVal]
        // dataSet.txtVal = ''
    }
}
function initEvent() {
    let input = document.getElementById('txt')
    input.addEventListener('change', changeHandler)
    let btn = document.getElementById('btn')
    btn.addEventListener('click', addItem)
}
dataSet.txtVal = ''
dataSet.list = []
initEvent()
initRely()
addItem()