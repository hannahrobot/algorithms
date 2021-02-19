/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
  if (!nums.length) {
    return [-1, -1];
  }

  let left = 0;
  let right = nums.length;
  let result = -1;

  function binarySearch(l, r, direction) {
    //l<=r
    while (l <= r) {
      let pivot = Math.floor((l + r) / 2);
      if (nums[pivot] > target) {
        r = pivot - 1;
      } else if (nums[pivot] === target) {
        result = pivot;
        if (direction === "left") {
          r = pivot - 1;
        } else {
          l = pivot + 1;
        }
      } else {
        l = pivot + 1;
      }
    }
    return result;
  }

  let start = binarySearch(left, right, "left");
  let end = binarySearch(left, right, "right");

  return [start, end];
}

//given an array of int nums, sorted in ascending order, find the start and end positions of a given target value, if not found, return [-1, -1]

//input: sorted array, target value
//output: the first index the value is found, last index val is found
//edge cases: the whole is target val, if theres one target start and end are the same. if not found -1-1

//ex:
/*
input: [1,,2 ,4, 5, 6, 6, 6, 6, 7], 6
output: [4, 7]

input: [], 6
output: [-1-1]

input: [1,,2 ,4, 5, 7]
output: [-1-1]

*/

//approach:
//one pass, iterate
//iterate find the start, end, stop iterating once you hit the last one
//0(1)

//two pointers
//0(n) ^ optimized
//0(1)

//binary search
//time: 0(logn)
//space: 0(1)
