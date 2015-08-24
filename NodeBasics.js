
// Event Emitter

/*
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

*/


//streams and evented callbacks

var Readable = require('stream').Readable;
var readable = new Readable;
var fs = require('fs');
var writeStream = fs.createWriteStream('./counter.txt', {
  flags: 'w',
  mode: '0666'
});


var count = 0;

readable._read = function(){
  if(++count > 10) {
    //writeStream.end();
    return readable.push(null);
  }

  setTimeout(function(cnt) {
    readable.push(cnt + '\n');
    writeStream.write(cnt + '\n');
  }(count), 500)
};

readable.pipe(process.stdout);




