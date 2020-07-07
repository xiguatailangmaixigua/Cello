let dataHandler = {
    set: function(obj, prop, value) {
        obj[prop] = value;
        triggerDomChange(prop);
    },
    get: function(target, name){
        return name in target ? target[name] : '';
    }
};
let dataSet = new Proxy({}, dataHandler);
export default dataSet;