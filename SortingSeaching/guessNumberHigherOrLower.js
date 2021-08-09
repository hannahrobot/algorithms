/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let left = 0;
  let right = n;

  while (left <= right) {
    const pivot = Math.floor((left + right) / 2);
    const res = guess(pivot);
    if (res === 0) {
      return pivot;
    } else if (res === -1) {
      right = pivot - 1;
    } else {
      left = pivot + 1;
    }
  }
};
