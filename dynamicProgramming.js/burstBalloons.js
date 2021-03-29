//bottom up
const maxCoins = (nums) => {
  const vals = [1, ...nums, 1];
  const n = nums.length;
  const dp = [...Array(n + 2)].map(() => Array(n + 2).fill(0));
  for (let len = 1; len <= n; len++) {
    for (let i = 1; i + len <= n + 1; i++) {
      const j = i + len - 1;
      for (let k = i; k <= j; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k - 1] + vals[i - 1] * vals[k] * vals[j + 1] + dp[k + 1][j]
        );
      }
    }
  }
  return dp[1][n];
};

//topDown memoization with balloon popping backwards (divide and conquer)

var maxCoins = function (nums) {
  let memo = {};
  let n = nums.length + 2;
  const newNums = new Array(n);

  for (let i = 0; i < nums.length; i++) {
    newNums[i + 1] = nums[i];
  }

  newNums[0] = 1;
  newNums[n - 1] = 1;

  const DFS = function (left, right) {
    //basecase:
    if (left + 1 === right) {
      return 0;
    }

    const str = `${left}|${right}`;

    if (memo[str]) {
      return memo[str];
    }

    memo[str] = -Infinity;

    //recursive case:
    for (let i = left + 1; i < right; i++) {
      const product = newNums[left] * newNums[i] * newNums[right];
      memo[str] = Math.max(memo[str], product + DFS(left, i) + DFS(i, right));
    }
    return memo[str];
  };

  return DFS(0, n - 1);
};

//topdown memoization
var maxCoins = function (nums) {
  let memo = {};

  const DFS = function (balloons) {
    //basecase:
    if (!balloons.length) {
      return 0;
    }

    const str = balloons.join("#");

    if (memo[str]) {
      return memo[str];
    }

    memo[str] = -Infinity;

    //recursive case:
    for (let i = 0; i < balloons.length; i++) {
      const behind = i - 1 < 0 ? 1 : balloons[i - 1];
      const ahead = i + 1 < balloons.length ? balloons[i + 1] : 1;
      const product = balloons[i] * ahead * behind;
      memo[str] = Math.max(
        memo[str],
        product + DFS(balloons.slice(0, i).concat(balloons.slice(i + 1)))
      );
    }
    return memo[str];
  };

  return DFS(nums, 0);
};

//backtracking

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  let maxSum = 0;

  const DFS = function (balloons, sum) {
    //basecase:
    if (!balloons.length) {
      maxSum = Math.max(sum, maxSum);
      return;
    }

    //recursive case:
    for (let i = 0; i < balloons.length; i++) {
      const behind = i - 1 < 0 ? 1 : balloons[i - 1];
      const ahead = i + 1 < balloons.length ? balloons[i + 1] : 1;
      const product = balloons[i] * ahead * behind;
      DFS(balloons.slice(0, i).concat(balloons.slice(i + 1)), product + sum);
    }
  };

  DFS(nums, 0);

  return maxSum;
};

//if its the last index or first index, we dont count the left or right, so just the two balloons in bounds
//

/*

DP problem

backtracking

  variable: maxSum

  DFS(baloons, sum)
      basecase: no balloons left, update max sum

      iterate through remaining balloons
          DFS(pop balloon at index, total += balloon[i] * i+1 || 1 && i-1 || 1 )

  DFS(balloons, 0)


greedy rabbit and hare?
*/
