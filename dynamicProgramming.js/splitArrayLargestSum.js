/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m) {
  let overall = Infinity;

  const DFS = function (i, count, maxSum) {
    if (count === m && i < nums.length) {
      const sum = nums.slice(i).reduce((a, b) => a + b, 0);
      overall = Math.min(overall, Math.max(maxSum, sum));
      return;
    }

    if (i === nums.length && count <= m) {
      return;
    }

    for (let j = i; j < nums.length; j++) {
      let sum = nums[i];
      for (let k = j + 1; j < nums.length; k++) {
        sum += nums[k];
        DFS(k + 1, count + 1, Math.max(maxSum, sum));
      }
    }
  };

  DFS(0, 0, 0);

  return overall;
};

/*

*questions:
  m is ever greater than nums length? no

brute force: top down approach:

  find every combination and record the smallest max out of all combinations of splicing

  vars:
      overallMinMaximumSide:

  DFS(i, count, maxSum){
      basecase: *valid
          count === m && i < nums.length
              sum = sum of remaining elements (reduce)
              compare sum to max sum
              overall = Math.min(maxSum, overall)
              return;

      basecase: *invalid
          i === nums.length && count <= m
              return;

      recursive case:
          new sum:
          iterate starting at i
              newSum += nums[i]
              DFS(i+1, Math.max(newSum, maxSum))


  return overallMinMaxumumSide

time: 0(n^m)
space: 0(n) recursive stack

optimized: bottom Up


Input: nums = [7,2,5,10,8], m = 2

*/

//binary search & greedy

var splitArray = function (nums, m) {
  /*Largest sum will be atleast as large as the largest number in nums*/
  let startS = Math.max(...nums);
  /*Largest sum that will be possible is the sum of all the nums*/
  let endS = 0;
  for (let num of nums) {
    endS += num;
  }
  while (startS <= endS) {
    let midS = Math.floor(startS + (endS - startS) / 2);
    /*If midS is the sum that we are trying to achieve then how many splits are required*/
    let noOfSplits = 1;
    let currSum = 0;
    /*Keep adding to currSum*/
    for (let num of nums) {
      currSum += num;
      /*If currSum exceeds the required sum we create a new split*/
      if (currSum > midS) {
        noOfSplits += 1;
        currSum = num;
      }
    }
    /*If number of splits is greater than m that means midS is
      too small so increase it by setting startS to midS + 1*/
    if (noOfSplits > m) {
      startS = midS + 1;
    } else {
      /*Number of splits are less than equal to m that means midS can be achieved using m splits
          so try to minimize it since need to minimize the largest sum*/
      endS = midS - 1;
    }
  }
  return startS;
};
