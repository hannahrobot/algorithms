/**
 * @param {string} num
 * @return {boolean}
 */
var isStrobogrammatic = function (num) {
  const hash = {
    9: "6",
    6: "9",
    8: "8",
    1: "1",
    0: "0",
  };

  let start = 0;
  let end = num.length - 1;

  while (start <= end) {
    if (hash[num[start]] && hash[num[start]] === num[end]) {
      end--;
      start++;
    } else {
      return false;
    }
  }

  return true;
};

/*
given a STRING number, return true it the num is a strobogrammatic number, otherwise return false
edge cases:


ex:

approach:

create a hash that has strobogrammatic pairs
use pointers to make sure start and end have matching pairs
increment and decrement pointers while <=

const hash = {
  9:6,
  6:9,
  8:8,
  1:1,
  0:0
}

while(start <= end) {
  if(hash[num[start]] && hash[num[start]] === num[end]) {
      end --
      start ++
  } else {
      return false
  }
}

return true




*/
