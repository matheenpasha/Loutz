var express = require('express');
var app = express();
var http = require('http');


app.use('/', express.static(__dirname + '/'));




var server = http.createServer(app);

server.listen(5001);
console.log('MGallery prototype running on', 5001);
