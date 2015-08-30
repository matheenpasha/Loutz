// Since we do not have a twitter developer account, we will just send a array random texts
// Once we have Creds we can use npm twit

var tweets = ['NodeJs is awesome!!', 'Ryan Dahl, You the man!', 'I cant get take this shit', 'Java rules!!'];

var fs = require('fs'), tweetFile = 'tweets.txt';

var writeStream = fs.createWriteStream(tweetFile, {
  flags: 'a'
});


var cleanBuffer = function(len) {
  var buf = new Buffer(len);
  buf.fill('\0');
  return buf;
};


var check = function() {
  if(tweets.length > 0) {
    var buffer = cleanBuffer(tweets.length * 140);
    tweets.forEach(function(tweet, i) {
      buffer.write(tweet, i*140, 140);
    });

    writeStream.write(buffer);
  }

  setTimeout(check, 10000);

}

check();
