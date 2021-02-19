//time: 0(n)
//space: 0(1)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    const newIdx = Math.abs(nums[i]) - 1;
    if (nums[newIdx] > 0) {
      nums[newIdx] *= -1;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      res.push(i + 1);
    }
  }
  return res;
};
