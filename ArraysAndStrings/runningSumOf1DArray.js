/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] = nums[i] + nums[i - 1];
  }

  return nums;
};

//input: array of nums
//ouput: array of nums (the sum of the array at that index)

//clarification:
//

//edge cases:
//nums is empty?
//nums is 1 length?

//examples:
//input
//[1, 2, 3, 4, 5]
//output
//[1, 3, 6, 10, 15]

//appoach:
//fibonacci sequence
//find fibonacci at each el in the array and update the array index with sum
//return the original array

//iteration
//start at index 1;
//nums[i] = nums[i] + nums[i-1]
