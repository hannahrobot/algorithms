//bottom up tabloidization
//time: 0(n)
//space: 0(n)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const memo = new Array(nums.length).fill("UNKNOWN");

  memo[memo.length - 1] = "GOOD";

  for (let i = nums.length - 2; i >= 0; i--) {
    let furthestJump = Math.min(i + nums[i], nums.length - 1);
    for (let j = i + 1; j <= furthestJump; j++) {
      if (memo[j] === "GOOD") {
        memo[i] = "GOOD";
        break;
      }
    }
  }
  return memo[0] === "GOOD";
};

//-----------------------------------------
//DFS backtracking & memoization
//time: 0(n^2)
//space: 0(n)
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = function (nums) {
  if (!nums.length || nums.length === 1) {
    return true;
  }

  if (nums[0] === 0) {
    return false;
  }

  const memo = {};

  const DFS = function (i) {
    if (i >= nums.length - 1) {
      return true;
    }
    if (nums[i] === 0) {
      return false;
    }
    if (memo.hasOwnProperty(i)) {
      return memo[i];
    }

    for (let j = 1; j <= nums[i]; j++) {
      if (DFS(Math.min(i + j, nums.length - 1))) {
        memo[i] = true;
        return true;
      }
    }
    memo[i] = false;
    return false;
  };

  for (let i = 1; i <= nums[0]; i++) {
    if (DFS(i)) {
      return true;
    }
  }

  return false;
};

//what if i jump over the last index

//backtracking

//outerloop i
//if nums[i] === 0 return false
//innerloop: 1-nums[i]
//    if(DFS(i+j)){
//        return true
//    }

/*
DFS
basecase: i = last index  return true
         nums[i] = 0 return false

     for loop j: 1-nums[i]
      if(dfs(i+j)){
          return true
      }

  return false


*/

//outerloop i
//call dfs
//innerloop j
//call dfs
