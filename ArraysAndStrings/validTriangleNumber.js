/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  let count = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let k = i + 2;
    for (let j = i + 1; j < nums.length - 1 && nums[i] != 0; j++) {
      k = binarySearch(nums, k, nums.length - 1, nums[i] + nums[j]);
      count += k - j - 1;
    }
  }

  return count;
};

const binarySearch = function (nums, left, right, x) {
  //use binary search to find k (the number where i and j no longer satisfy the triangle)
  while (right >= left && right < nums.length) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] >= x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

//binary search divided j+1 and nums length -1 by half to find pivot, if its less than the sum, find upper mid, if its higher than the sum, find lower mid until you have k
//time: 0(n^2logn) In worst case inner loop will take n\log nnlogn (binary search applied nn times)
//space: 0(logn) sorting takes 0(logn) space
