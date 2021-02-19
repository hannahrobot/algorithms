//hash - optimized
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let count = 0;
  const hash = {};
  let sum = 0;
  hash[0] = 1;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (hash[sum - k]) {
      count += hash[sum - k];
    }
    if (hash.hasOwnProperty(sum)) {
      hash[sum]++;
    } else {
      hash[sum] = 1;
    }
  }

  return count;
};

//time: 0(n^2)
//space: 0(1)

//array: ints, k: int
//return the count of contiguous subarrays whose sum equals k
//edge cases: nums is empty, return 0, k is 0: return 0
//
//will there be negative numbers? no

//count = 2
//sum = 6
//             i. j
//[5, 2, 3, 4, 6], k=10
//output: 2

//approach:

//brute:

//nested array: check all possibilities together
//as we move forward adding, we keep a sum in the external loop, and we add j continuously to the sum,
//if sum is greater than k we break out of j
//if sum = k, we increment count and break out of the j loop

//dynamic programming problem

//----------------------------

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    if (sum === k) {
      count++;
    }
    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) {
        count++;
      }
    }
  }
  return count;
};

//time: 0(n^2)
//space: 0(1)

//array: ints, k: int
//return the count of contiguous subarrays whose sum equals k
//edge cases: nums is empty, return 0, k is 0: return 0
//
//will there be negative numbers? no

//count = 2
//sum = 6
//             i. j
//[5, 2, 3, 4, 6], k=10
//output: 2

//approach:

//brute:

//nested array: check all possibilities together
//as we move forward adding, we keep a sum in the external loop, and we add j continuously to the sum,
//if sum is greater than k we break out of j
//if sum = k, we increment count and break out of the j loop

//dynamic programming problem
