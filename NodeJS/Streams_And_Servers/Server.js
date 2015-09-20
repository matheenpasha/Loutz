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
