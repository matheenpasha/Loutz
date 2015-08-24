
// Event Emitter
var events = require('events');
var emitter = events.EventEmitter;

var Counter = function(init) {

  this.increment = function() {
    init++;
    this.emit('incremented', init);
  }

};
Counter.prototype.__proto__ = emitter.prototype;

var counter = new Counter(10);

counter.on('incremented', function(count){
  console.log(count);
});

counter.increment();
counter.increment();