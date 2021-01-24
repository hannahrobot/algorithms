//optimized - binary search tree
//time: 0(log n)
//space: 0(1)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingElement = function (nums, k) {
  let n = nums.length;
  if (k > missing(n - 1, nums)) {
    return nums[n - 1] + k - missing(n - 1, nums);
  }
  let left = 0;
  let right = n - 1;
  let pivot;

  while (left !== right) {
    pivot = left + (right - left) / 2;
    if (missing(pivot, nums) < k) {
      left = pivot + 1;
    } else {
      right = pivot;
    }
  }

  return nums[left - 1] + k - missing(left - 1, nums);
};

const missing = function (idx, nums) {
  return nums[idx] - nums[0] - idx;
};

//time complexity: 0(n)
//space complexity: 0(1)
//"one pass" approach

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingElement = function (nums, k) {
  let n = nums.length;

  //if k is bigger than the number of missing numbers in our array
  if (k > missing(n - 1, nums)) {
    return nums[n - 1] + k - missing(n - 1, nums);
  }

  //if k isnt bigger than the number of missing nums in our array
  let idx = 1;
  while (missing(idx, nums) < k) {
    idx++;
  }

  return nums[idx - 1] + k - missing(idx - 1, nums);
};

const missing = function (idx, nums) {
  return nums[idx] - nums[0] - idx;
};

//[1, 2, 5, 6], 2
//returns 4

//time complexity: 0(n^2) or even worse, our while loop could go through so many numbers between indexes
//0(n^k) ?
//space complexity: 0(1)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingElement = function (nums, k) {
  let curr = 0;

  for (let i = 0; i < nums.length; i++) {
    curr = nums[i];
    while (i !== nums[nums.length - 1] && curr + 1 !== nums[i + 1] && k > 0) {
      curr++;
      k--;
    }

    if (k === 0) {
      return curr;
    }
  }
};

//input: array of unique nums
//output: kth missing number
//edge cases: array and k doesnt exist after checking array, nums is empty, k is 0

// ex:
// [1, 4, 7, 8, 9], k = 2
//output: 3
// [1, 3, 10, 11], k = 6
//output: 8

//naive approach:
//if the next el doesnt equal the value of the first el + 1, we increment our current number and decrement k, until the next element is i +1
//variables: curr
//when k is 0; we return our current number

//optimized approach:
