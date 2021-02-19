/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) return 0;

  let prod = 1;
  let ans = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    prod *= nums[right];
    while (prod >= k) {
      prod /= nums[left];
      left++;
    }
    ans += right - left + 1;
  }
  return ans;
};

//-----------------------------

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    if (sum < k) {
      count++;
    } else {
      continue;
    }
    for (let j = i + 1; j < nums.length; j++) {
      sum *= nums[j];
      if (sum < k) {
        count++;
      } else {
        break;
      }
    }
  }

  return count;
};

/*
input: array of nums
output: int: number of subarrays where the product is < 10
edge cases: nums is empty: return 0; k is 0: return 0;

notes:
can k be 0? yes
can nums[i] be 0? no

approach:
  brute force:
      find every contiguous subaray posibility with a nested for loop, if it works: count++
      time: 0(n^2)
      space: 0(1)
---------------------------------
  sliding window:

  time: 0(n)
  space: 0(1)
*/
