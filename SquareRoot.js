
// Square root of a number by newton's method


var sqrt = function(n, guess) {
  var guess = guess || 1, newGuess = 0;

  var goodEnough = function (sqr, root){
    return Math.abs(root * root - sqr) <= 0.00001;
  };


  if(goodEnough(n, guess)){
    return guess.toFixed(3)
  } else {
    newGuess = (guess + n/guess)/2;
    return sqrt(n, newGuess);
  }

};

var sqrtOfTwo = sqrt(2, 1);

console.log(sqrtOfTwo, sqrtOfTwo * sqrtOfTwo);