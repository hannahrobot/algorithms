//optimized: not converting it to string

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let revertedNum = 0;

  while (x > revertedNum) {
    revertedNum = revertedNum * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  return x === revertedNum || x === Math.floor(revertedNum / 10);
};

//brute: converting to string (not optimal because requires extra space)
//time: o(n)
//space: 0(n)

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const str = x.toString();
  let start = 0;
  let end = str.length - 1;

  while (start <= end) {
    if (str[start] !== str[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
};
