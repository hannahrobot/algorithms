/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;

  for (let p = m + n - 1; p >= 0; p--) {
    if (p2 < 0) {
      break;
    }
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
  }

  return nums1;
};

//input: nums1: array of nums, m: int, nums2: array of nums;  n: int
//output: merges nums1 and nums2 inplace on nums1 array
//edge cases: nums2 is empty, nums1 is empty, they are both empty,
//m is the amount of numbers in nums1?

//examples:

//                i
//[1, 1, 2, 2, 3, 5, 6]
//       j
//[1, 2, 5, 6]

//[1, 1, 2, 2, 3, 5, 6]

//approach
//3 pointers iterate backwards
//time: 0(n)
//space: 0(1)
