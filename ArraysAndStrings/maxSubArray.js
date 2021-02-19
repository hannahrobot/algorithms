//Dynamic Programming (Kadane's algorithm)
//update in place
//optimal
//time: 0(n)
//space: 0(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > 0) {
      nums[i] += nums[i - 1];
    }
    maxSum = Math.max(nums[i], maxSum);
  }
  return maxSum;
};

//greedy
//time: 0(n)
//space: 0(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let currSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(currSum, maxSum);
  }
  return maxSum;
};

//brute force
//time: 0(n^2)
//space: 0(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let maxSum = nums[0];

  for (let i = 0; i < nums.length; i++) {
    let tmpSum = nums[i];
    if (tmpSum > maxSum) {
      maxSum = tmpSum;
    }
    for (let j = i + 1; j < nums.length; j++) {
      tmpSum += nums[j];
      if (maxSum < tmpSum) {
        maxSum = tmpSum;
      }
    }
  }

  return maxSum;
};

//input: array of integers, could be negative or positive
//output: integer: contiguous subarray with largest sum, return its sum
//edge cases: input array has one element, return that element; input array is empty?

//examples:
//[2, 5, 4, -6, 8]
//output is sum of entire array

//[5, -6, 8, -10, 1, 7, 5, -4]

//approach:

//brute force is a nested for loop

//dynamic programming
//we need every possible combination and a max sum that updates if we find a larger sum

//variables:
//maxSum

//mainfunc:
// for loop, each index calls helper func

//helper func:
//checks every possible combination from the starting point
//

//bottom up or top down>

//top down
//start with the whole thing and recursively pass one less index,
//get the sum from the beginning (outside for loop) and pass it through my helper func params, subtracting last index on each recurse so we arent recalculating it every time
