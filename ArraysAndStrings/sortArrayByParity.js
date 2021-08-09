/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  const output = [];

  nums.forEach((num) => {
    if (num % 2 === 0) {
      output.unshift(num);
    } else if (num % 2 !== 0) {
      output.push(num);
    }
  });

  return output;
};

/*

variable: output array

iterate through array
if its an even numner, unshift it onto output
if its an odd number, push it onto output

time: 0(n)
space: 0(n)

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  return nums.sort((a, b) => {
    if (a % 2 === 0 && b % 2 === 0) {
      return 0;
    } else if (a % 2 === 0) {
      return -1;
    } else {
      return 1;
    }
  });
};

/*

time: 0(nlogn)
space: 0(logn)

*/
