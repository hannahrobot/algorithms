//optimized for space
//time complexity: 0(M*N)
//space complexity: 0(N)

//iterative dynamic programing
//an iterative dynamic programming based solution is almost always (almost) faster than its recursive memoization-based counterpart.

function numDistinct(s, t) {
  const M = s.length;
  const N = t.length;

  //dynamic programming table
  const dp = new Array(N).fill(0);

  let prev = 1;

  // Iterate over the strings in reverse so as to
  // satisfy the way we've modeled our recursive solution
  for (let i = M - 1; i >= 0; i--) {
    // At each step we start with the last value in
    // the row which is always 1. Notice how we are
    // starting the loop from N - 1 instead of N like
    // in the previous solution.
    prev = 1;
    for (let j = N - 1; j >= 0; j--) {
      // Record the current value in this cell so that
      // we can use it to calculate the value of dp[j - 1]
      let oldDPj = dp[j];
      // If the characters match, we add the
      // result of the next recursion call (in this
      // case, the value of a cell in the dp table
      if (s[i] === t[j]) {
        dp[j] += prev;
      }
      //update the prev variable
      prev = oldDPj;
    }
  }
  return dp[0];
}

//iterative dynamic programming
//matrix bottom up solution
//doesnt run in javascript i dont know why
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  //rows
  const M = s.length;
  //columns
  const N = t.length;

  const dp = new Array(M + 1).fill(new Array(N + 1));

  //base case initialization
  for (let j = 0; j <= N; j++) {
    dp[M][j] = 0;
  }

  //base case initialization
  for (let i = 0; i <= M; i++) {
    dp[i][N] = 1;
  }

  // Iterate over the strings in reverse so as to
  // satisfy the way we've modeled our recursive solution
  for (let i = M - 1; i >= 0; i--) {
    for (let j = N - 1; j >= 0; j--) {
      dp[i][j] = dp[i + 1][j];
      if (s[i] === t[j]) {
        dp[i][j] += dp[i + 1][j + 1];
      }
    }
  }
  console.log(dp);
  return dp[0][0];
};

//dp recursion and memoization
//time complexity: 0(m*n) where m is one string length and n is the other
//time complexity: 0(m*n) number of keys in hash table is total number of combinations of m and n

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const memo = {};

  const recurse = function (i, j) {
    if (i === s.length || j === t.length || s.length - i < t.length - j) {
      return j === t.length ? 1 : 0;
    }
    if (memo[`${i}${j}`]) {
      return memo[`${i}${j}`];
    }

    let ans = recurse(i + 1, j);

    if (s[i] === t[j]) {
      ans += recurse(i + 1, j + 1);
    }
    memo[`${i}${j}`] = ans;
    return ans;
  };

  return recurse(0, 0);
};
