//time: 0(n)
//space: 0(n)

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const hash = {};

  for (let i = 0; i < nums.length; i++) {
    if (hash.hasOwnProperty(nums[i])) {
      hash[nums[i]] = false;
    } else {
      hash[nums[i]] = true;
    }
  }

  return Object.keys(hash).find((el) => hash[el] === true);
};

//---------an optimized solution could exist in java or python with bit manipulation
