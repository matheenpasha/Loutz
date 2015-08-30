

var fs = require('fs');
var http =  require('http');

var theUser = null, userPos = 0; tweetFile = 'tweets.txt';


var Server = http.createServer(function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });

  theUser = res;

  res.write(':' +  Array(2049).join(' ') + '\n');
  res.write('retry: 2000\n');

  res.socket.on('close', function() {
    theUser = null;
  });

});

Server.listen(8080);


var sendNext = function(fd) {
  var buffer = new Buffer(140);
  fs.read(fd, buffer, 0, 140, userPos * 140, function(err, num) {
    if(!err && num) {
      ++userPos;
      theUser.write('data: ' + buffer.toString('utf-8', 0, num) + '\n\n');
      return process.nextTick(function() {
        sendNext(fd)
      });
    }
  });
};


function start() {
  fs.open(tweetFile, 'r', function(err, fd) {
    if(err) {
      return setTimeout(start, 1000);
    }
    fs.watch(tweetFile, function(event, fileanme) {
      if(event === 'change') {
        sendNext(fd)
      }
    });
  });
}


start();
