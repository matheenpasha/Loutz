
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
var repl = net.connect('repl');

net.createServer(function(socket){

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

}).listen(5001);


*/

