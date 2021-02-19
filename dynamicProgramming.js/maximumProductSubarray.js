//optimized dp
//we save min so far and max so far in case we hit double negatives

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let maxSoFar = nums[0];
  let minSoFar = nums[0];
  let result = maxSoFar;

  for (let i = 1; i < nums.length; i++) {
    const curr = nums[i];
    const tempMax = Math.max(curr, Math.max(maxSoFar * curr, minSoFar * curr));
    minSoFar = Math.min(curr, Math.min(maxSoFar * curr, minSoFar * curr));
    maxSoFar = tempMax;
    result = Math.max(maxSoFar, result);
  }

  return result;
};

//time: 0(n)
//space: 0(1)

//---------------------------------------
//brute force
//nested for loop
//time: 0(n^2)
//space: 0(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let max = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    if (sum > max) {
      max = sum;
    }
    for (let j = i + 1; j < nums.length; j++) {
      sum *= nums[j];
      if (sum > max) {
        max = sum;
      }
    }
  }

  return max;
};

//input: array of nums: nums
//output: the largest product from a contiguous subarray
//edge cases: !nums.length: return 0; nums.length ===1: nums[0]
//notes: single number
//are there negative nums? yes; are they in any order? no
