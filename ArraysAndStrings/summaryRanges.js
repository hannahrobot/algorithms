//dynamic programming?

/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  let low = nums[0];
  let hi;
  const res = [];

  if (nums.length === 1) {
    res.push(`${low}`);
    return res;
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + 1 !== nums[i + 1]) {
      hi = nums[i];
      if (hi === low) {
        res.push(`${low}`);
      } else {
        res.push(`${low}->${hi}`);
      }
      low = nums[i + 1];
    }
  }

  return res;
};
