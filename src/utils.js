function getById(id) {
    return document.getElementById(id);
}

function createReactive (obj, key, val) {
    var sub = new Subject();
    Object.defineProperty(obj, key, {
        get: function () {
            if (Subject.tempWatcher) {
                sub.subscribe(Subject.tempWatcher);
            }
            return val;
        },
        set: function (newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            sub.notify();
            console.log(val);
        }
    });
}