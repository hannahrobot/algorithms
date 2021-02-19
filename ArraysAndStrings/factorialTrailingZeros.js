/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let result = 0;
  while (n > 0) {
    result += Math.floor(n / 5);
    n = Math.floor(n / 5);
  }
  return result;
};

//time: 0(logn)
//space: 0(1)
