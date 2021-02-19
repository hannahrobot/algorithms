//swap: optimal
//time: 0(n)
//space: 0(1)

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  for (let last = 0, cur = 0; cur < nums.length; cur++) {
    if (nums[cur] !== 0) {
      [nums[last], nums[cur]] = [nums[cur], nums[last]];
      last++;
    }
  }
};

//swap

//Two pointer
//time: 0(n)
//space: 0(1)

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let lastNonZeroIdx = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastNonZeroIdx++] = nums[i];
    }
  }
  for (let i = lastNonZeroIdx; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
};

//write over elements in the beginning to maintain order
//keep a last non zero element
//fill the rest with zeros
