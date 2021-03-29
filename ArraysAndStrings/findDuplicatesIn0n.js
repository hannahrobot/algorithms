//use indexes to track numbers (since our elements will never be greater than n)

//one pass

var findDuplicates = function (nums) {
  const dups = [];

  //iterate through nums and mark number's index as negative
  for (let i = 0; i < nums.length; i++) {
    if (nums[Math.abs(nums[i]) - 1] < 0) {
      dups.push(Math.abs(nums[i]));
    }

    nums[Math.abs(nums[i]) - 1] *= -1;
  }

  return dups;
};

//two pass

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  const dups = [];

  //iterate through nums and mark number's index as negative
  for (let i = 0; i < nums.length; i++) {
    nums[Math.abs(nums[i]) - 1] *= -1;
  }
  //if the index is already negative mark it positive (this happens inherently)
  //iterate through again and check if its positive, if yes its a duplicate
  for (let i = 0; i < nums.length; i++) {
    if (nums[Math.abs(nums[i]) - 1] > 0) {
      dups.push(Math.abs(nums[i]));
      nums[Math.abs(nums[i]) - 1] *= -1;
    }
  }

  return dups;
};

/*

                    i
[-4,-3,-2,-7,8,2,-3,-1]

*/
