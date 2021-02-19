/**
 * @param {number[]} nums
 * @return {number}
 */
const findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  let pivot;

  while (left < right) {
    pivot = Math.floor((left + right) / 2);
    if (nums[pivot] < nums[pivot + 1]) {
      left = pivot + 1;
    } else {
      right = pivot;
    }
  }

  return left;
};

//iterative binary search

//time: 0(logn) binary search
//space: 0(1)

//----------------------
/**
 * @param {number[]} nums
 * @return {number}
 */
const findPeakElement = function (nums) {
  return search(nums, 0, nums.length - 1);
};

const search = function (nums, left, right) {
  if (left === right) {
    return left;
  }

  const pivot = Math.floor((left + right) / 2);

  if (nums[pivot] > nums[pivot + 1]) {
    return search(nums, left, pivot);
  } else {
    return search(nums, pivot + 1, right);
  }
};

//recursive binary search

//helper function for recursion, takes left and right as param

//divide and conquer
//basecase: if left = right
//return left
//left and right
//pivot is in the middle
//if pivot is on descending slope (\): recurse left & right(=pivot)
//if pivot is on ascending slope (/): recurse (right=pivot) & left

//time: 0(logn) binary search
//space: 0(logn) recursive call stack

//-------------------------

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    if (start === 0) {
      if (nums[start] <= nums[start + 1]) {
        start++;
      } else {
        return start;
      }
    } else if (
      nums[start - 1] >= nums[start] ||
      nums[start + 1] >= nums[start]
    ) {
      start++;
    } else {
      return start;
    }
    if (end === 0) {
      if (nums[end] <= nums[start - 1]) {
        end--;
      } else {
        return end;
      }
    } else if (nums[end - 1] >= nums[end] || nums[end + 1] >= nums[end]) {
      end--;
    } else {
      return end;
    }
  }

  return null;
};

//   S       E
//[1,2,1,3,5,6,4]

//input is an array of nums
//output: any index of a peak element: int
//edge cases: there are no peak elements: the array is empty; if the array is length 1 or length 2, what if the peak is at the beg or end? does it have to have two neighbors?

//a peak element is an element thats strictly greater than its neighbors

//approach:
//to cut time in half:
//two pointers: one at the end and one at the begininng
//return the first index that is a peak element

//start pointer: 1
//end pointer: end minus 2

//while start is less than or equal to end
//if el behind startpointer is greater or equal || el infront of start pointer is greater or equal, increment
//else: return index
//if el behind endpointer is greater or equal || el infront of end pointer is greater or equal, decrement
//else: return index

//time: 0(n)
//space: 0(1)

//--------------------------

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i + 1]) {
      return i;
    }
  }
  return nums.length - 1;
};
//time: 0(n)
//space: 0(1)
