//optimized: hashSet and intelligent sequence building

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (!nums.length) {
    return 0;
  }

  const set = new Set(nums);

  let longestStreak = 0;

  set.forEach((num) => {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (set.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }
      longestStreak = Math.max(currentStreak, longestStreak);
    }
  });

  return longestStreak;
};

//time: 0(n) we onlu enter the while loop if the current num is the start of a streak (the num before doesnt exiwst)
//space: 0(n) we save nums in hash

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (!nums.length) {
    return 0;
  }

  nums.sort((a, b) => a - b);

  console.log(nums);

  let count = 1;
  let maxSeq = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - 1 === nums[i - 1]) {
      count++;
    } else if (nums[i] - 1 > nums[i - 1]) {
      count = 1;
    }
    maxSeq = Math.max(maxSeq, count);
  }
  return maxSeq;
};

/*
brute force
sort array
whenever we hit char that isnt +1 bigger than before: we have to start our count over
at each iteration, we update maxSeq

time: n log n
space: logn

*/
