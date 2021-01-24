//pointers
//pros cons: con: have to sort,
//time complexity: n2
//overall complexity is 0(n log n + n2)
//space complexity: from 0(log n) to 0(n) depending on sorting algo

var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] !== nums[i - 1]) {
      let lo = i + 1;
      let hi = nums.length - 1;

      while (lo < hi) {
        const sum = nums[i] + nums[lo] + nums[hi];
        if (sum === 0) {
          res.push([nums[i], nums[lo], nums[hi]]);
          while (nums[lo] === nums[lo + 1]) {
            lo++;
          }
          while (nums[hi] === nums[hi - 1]) {
            hi--;
          }
          lo++;
          hi--;
        } else if (sum < 0) {
          lo++;
        } else if (sum > 0) {
          hi--;
        }
      }
    }
  }
  return res;
};

//hash
//pros cons: have to sort, higher space complexity,
//time complexity: 0(n2)
//space complexity: 0(n) for the hash set
//Like in the approach above, we will also sort the array so we can skip repeated values.

var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      const seen = {};
      for (let j = i + 1; j < nums.length; j++) {
        const compliment = -nums[i] - nums[j];
        if (seen.hasOwnProperty(compliment)) {
          res.push([nums[i], nums[j], compliment]);
          while (nums[j] === nums[j + 1]) {
            j++;
          }
        }
        //add it to seen
        seen[nums[j]] = j;
      }
    }
  }
  return res;
};

//no sort
//pros cons:
//What if you cannot modify the input array, and you want to avoid copying it due to memory constraints?
//time complexity:
//space complexity:

//unfinished
var threeSum = function (nums) {
  const res = [];
  const dups = [];
  const seen = [];

  for (let i = 0; i < nums.length; i++) {
    if (!dups.hasOwnProperty(nums[i])) {
      dups[nums[i]] = i;
      for (let j = i + 1; j < nums.length; j++) {
        const compliment = -nums[i] - nums[j];
        if (seen.hasOwnProperty(compliment) && seen[compliment] === i) {
          const triplet = [nums[i], nums[j], compliment];
          triplet.sort((a, b) => a - b);
          res.push(triplet);
        }
        seen[nums[j]] = i;
      }
    }
  }
  return res;
};
