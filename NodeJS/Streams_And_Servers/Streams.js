
/*
5 Streams
____________
Readable
Writable
duplex
transform
passthrough

Note: implementation of each requires us to define the specific abstract methods which starts with '_'


var stream = require('stream');
var writable = new stream.Writable({
  highWaterMark:10
});
writable._write = function(chunk, encodig, callback) {
  process.stdout.write(chunk);
  callback();
};

writable.on('drain', function() {
  writable.write('Z\n')
});


var buff = new Buffer(20, 'utf8');
buff.fill('A');

var w = writable.write(buff.toString());
//writable.end();
console.log(w); // AAAAAAAAAAAAAAAAAAAAtrue
                   Z

*/

//---------- duplex stream
var net = require('net');
var stream = require('stream');

net.createServer(function(socket) {
  socket.write('Go ahead and type something you prick!!');
  socket.on('readable', function() {
    process.stdout.write(this.read());
  });
}).listen(8080);
