/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const stack = [];
  const res = [];
  for (let i = 2 * nums.length - 1; i >= 0; i--) {
    while (
      stack.length &&
      nums[stack[stack.length - 1]] <= nums[i % nums.length]
    ) {
      stack.pop();
    }
    res[i % nums.length] = !stack.length ? -1 : nums[stack[stack.length - 1]];
    stack.push(i % nums.length);
  }
  return res;
};

//input: nums
//output: nums(with next greater element from nums in the index place, if it doesnt exist -1)
//edge cases: next greater num doesnt exist: -1 in its place, nums is empty,

//optimized stack

//time:0(n)
//space: 0(n)

//------------------------------------

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const res = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    let j = i + 1;
    while (j % nums.length !== i) {
      const jm = j % nums.length;
      if (nums[i] < nums[jm]) {
        res[i] = nums[jm];
        break;
      }
      j++;
    }
    if (j % nums.length === i) {
      res[i] = -1;
    }
  }
  return res;
};

//input: nums
//output: nums(with next greater element from nums in the index place, if it doesnt exist -1)
//edge cases: next greater num doesnt exist: -1 in its place, nums is empty,

//ex:
//[1, 4, 2, 5, 3, 2, 1]
//[4, 5, 5, -1, 4, 4, 4]

//iterate over nums:
// for each num
//loop over array circularily (with modulo) until you hit the original index again
//if you hit a higher number, update the i index with that number and break
//if you hit the original index and havent breaked, replace it with -1

//circular end pointer and beginning pointer

//while(j % length !== i)

//time: 0(n^2)
//space: 0(n)
