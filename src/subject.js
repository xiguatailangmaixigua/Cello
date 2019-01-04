function Subject() {
    this.subscriber = []
}

Subject.prototype.notify = function() {
    this.subscriber.forEach((item) => {
        item.update();
    });
    console.log('notify');
}

Subject.prototype.subscribe = function(observer) {
    this.subscriber.push(observer);
}