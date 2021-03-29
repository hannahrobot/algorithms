/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const swap = function (index1, index2) {
    [nums[index1], nums[index2]] = [nums[index2], nums[index1]];
  };

  const reverse = function (index) {
    let start = index;
    let end = nums.length - 1;

    while (start < end) {
      swap(start, end);
      start++;
      end--;
    }
  };

  let i = nums.length - 2;

  while (i >= 0 && nums[i + 1] <= nums[i]) {
    i--;
  }

  if (i >= 0) {
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) {
      j--;
    }
    swap(i, j);
  }

  reverse(i + 1);
};

//time: 0(n)
//space: 0(1)
