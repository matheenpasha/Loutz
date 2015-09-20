/*

var http = require('http');


var server = http.createServer();

server.on('connection', function(socket) {
  console.log('Client arrived: ' + new Date());

  socket.on('end', function() {
    console.log('cliet left: ' + new Date());
  });
});

server.on('request', function(req, res) {
  req.setEncoding('utf8');
  req.on('readable', function(){
    console.log(this.read());
  });
});

server.listen(8080);

//use curl to test the http server

//curl http://localhost:8080 -d "Here is some data"

*/



//-------- tunelling using a proxy


var http = require('http');
var net = require('net');
var url = require('url');


var proxy = new http.Server();

proxy.on('connect', function(req, clientSocket, head) {
  var reqData = url.parse('http://' + req.url);
  var remoteSocket = net.connect(reqData.port, reqData.hostname, function() {
    clientSocket.write('HTTP/1.1 200 \r\n\r\n');
    remoteSocket.write(head);
    remoteSocket.pipe(clientSocket);
    clientSocket.pipe(remoteSocket);
  });
}).listen(8080);

var request = http.request({
  port:8080,
  hostname: 'localhost',
  method: 'CONNECT',
  path: 'www.google.co.in:80'
});
request.end();

request.on('connect', function(res, socket, head){
  socket.setEncoding('utf8');
  socket.write('GET / HTTP/1.1\r\nHost:www.google.co.in:80\r\nConnection:close\r\n\r\n');
  socket.on('readable', function() {
    console.log(socket.read());
  });
  socket.on('end', function() {
    proxy.close();
  })
});
