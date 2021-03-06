
/*

  Code Examples from Mastering NodeJS by Sandro Pasquali

 */




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

/*

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

*/



// UDP client and servers
/*
var dgram = require('dgram');

var client = dgram.createSocket('udp4');

var server = dgram.createSocket('udp4');

var message = process.argv[2] || 'message';


message = new Buffer(message);


server.on('message', function(message) {
  process.stdout.write('got msg: ' + message);
  process.exit();
}).bind(41234);

client.send(message, 0, message.length, 41234, '10.174.0.190');

*/



// repl Client
/*

var net = require('net');
var sock = net.connect(5001);

process.stdin.pipe(sock);
sock.pipe(process.stdout);



*/


// repl server


/*
var net = require('net');
var repl = require('repl');

var server = net.createServer(function(socket){

  repl
    .start({
      prompt: '> ',
      input: socket,
      output: socket,
      terminal: true
    })
    .on('exit', function(){
      socket.end();
    });

});



server.listen(8080);

*/


//trying out POSIX signals

/*
 The node 'process' object exposes all the POSIX signals and we can subscribe to them.
#
 more details on https://en.wikipedia.org/wiki/Unix_signal#POSIX_signals
*

setInterval(function() {}, 1e6);

process.on('SIGINT', function() {
  process.stdout.write('sigint signal recieved');
  process.exit(1);
});  */


//---------------------------------------------------

/*
* basic node APIs and in built objects
*
* */

//Process.nextTick(callback)


/*

var events = require('events');



var getEmitter = function() {
    var emitter = new events.EventEmitter();
    process.nextTick(function() {
      emitter.emit('started');
    });
    return emitter;
};

var myEnitter = getEmitter();

myEnitter.on('started', function() {
  process.stdout.write('started');
});

*/

//Process.setImmediate(callback)

/*

nextTick and setImmediate are sister functions
The main difference between nextTick and setImmediate is the callback will be executed after I/O for nextTick and after I/O
for setImmediate

*/

//------------------- Timers

/*

setTimeout and setInterval (almost same as client side JS)

*/


//-------------------- Priority of executon in the V8 thread

/*


1. Execution blocks
2. Timers
3. I/O
4. Deferred Execution blocks


*/


//-------------------------- Example (twitter -  get tweets of #NodeJS)
