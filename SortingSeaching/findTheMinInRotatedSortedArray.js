/**
 * @param {number[]} nums
 * @return {number}
 */

const findMin = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  if (nums[nums.length - 1] > nums[0]) {
    return nums[0];
  }

  const binarySearch = function (left, right) {
    while (left <= right) {
      let pivot = Math.floor((left + right) / 2);

      if (nums[pivot] > nums[pivot + 1]) {
        return nums[pivot + 1];
      }
      if (nums[pivot - 1] > nums[pivot]) {
        return nums[pivot];
      }
      if (nums[pivot] > nums[0]) {
        left = pivot + 1;
      } else {
        right = pivot - 1;
      }
    }
  };

  return binarySearch(0, nums.length - 1);
};

//find smallest element
//binary search

/*

finding the peak
*/
