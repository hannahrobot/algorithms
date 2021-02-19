//time: 0(logn)
//space: 0(1)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length;
  let pivot = Math.floor(nums.length / 2);

  while (nums[pivot] !== target && left < right) {
    if (nums[pivot] < target) {
      left = pivot + 1;
      pivot = Math.floor((left + right) / 2);
    } else {
      right = pivot;
      pivot = Math.floor((left + right) / 2);
    }
  }
  return nums[pivot] === target ? pivot : -1;
};

//input: array, nums, a-sorted, target val
//output: index of target - if it doesnt exist -1
//edge cases: nums empty, multiple nums repping target (return first num that satisfies?)
//ex:
//[4, 3, 5, 1, 2], 2
//output: 4

//left pointer, right pointer, get the middle of each
//middle is pivot
//could do recursively but lets save space doing it iteratively

//start from the middle, check if target is bigger or smaller, go in the direction, update pointers
//start from the middle of the next slice

//iteratively :
//time: o(nlogn)
//space: 0(1)
