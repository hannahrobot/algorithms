/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  if (!nums.length) {
    return 1;
  }

  nums.sort((a, b) => a - b);

  //if our first num is greater than 1, we return 1
  // if(nums[0] > 1){
  //     return 1
  // }

  //if our last num is less than 1, we return 1
  if (nums[nums.length - 1] < 1) {
    return 1;
  }

  //search for the first missing positive num in our sorted array
  for (let i = 0; i < nums.length; i++) {
    if (i + 1 < nums.length && nums[i] > 0 && nums[i] + 1 < nums[i + 1]) {
      return nums[i] + 1;
    }
  }

  //otherwise we arent missing any nums, so we return whatever comes after our last number
  return nums[0] > 1 ? 1 : nums[nums.length - 1] + 1;
};

/*NOTES

input: array of nums (positive and negative)
output: smallest first missing positive int (starting from 1)
edge: nums is empty, nums is 1

ex:

Input: nums = [1,2,0]
Output: 3

Input: nums = [3,4,-1,1]
Output: 2

Input: nums = [7,8,9,11,12]
Output: 1

approach: brute force

  sort nums

  if our first num is greater than 1, we'd return 1

  iterate through nums and find first missing positive (if num isnt negative and num + 1 !== nums[i + 1]){
      return num + 1

  else
      if could be that we dont have any missing positives and we'd return whatever positive comes after the last num
          (if the last num is negative we'd return 1)





*/
