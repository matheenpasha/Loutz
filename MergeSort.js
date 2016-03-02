 var sort = function(left, right){
    var result  = [],
        i      = 0,
        j      = 0;

    while (i < left.length && j < right.length){
        if (left[i] < right[j]){
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  };

var mergeSort = function(a) {
  var len = a.length, newLeftArray, newRightArray;
  if(len <= 1) {
    return a;
  }
  
  var leftArray = a.splice(0, Math.floor(len/2));
  var rightArray = a;
  
  var merge =  function() {
    newLeftArray = mergeSort(leftArray);
    newRightArray = mergeSort(rightArray);
    return sort(newLeftArray, newRightArray);
  };
  
  return merge();
};

//test
var numArr =  [7,6,1,5,3,4,2,8];
console.log(mergeSort(numArr));
