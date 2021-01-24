//fibonacci formula
//time complexity: 0(log n) - the pow method takes log n time
//space complexity: 0(1)

var climbStairs = function (n) {
  const sqrt = Math.sqrt(5);
  const fibn =
    Math.pow((1 + sqrt) / 2, n + 1) - Math.pow((1 - sqrt) / 2, n + 1);
  return fibn / sqrt;
};

//-----------------------
//Binets Method
//uses matrix multiplication
//time complexity: 0(log n)
//space complexity: 0(1)
//------------------------

//fibonacci number
//this is clearly a fibonacci sequence so we just need to find the nth fibonacci number - saving us space complexity
//time complexity: 0(n)
//space complexity: 0(1)

var climbStairs = function (n) {
  if (n === 1) {
    return 1;
  }

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }

  return second;
};

//dynamic programming
//bottom up
//time complexity: 0(n)
//space complexity: 0(n)
// Going bottom-up is a way to avoid recursion, saving the memory cost that recursion incurs when it builds up the call stack.
// Put simply, a bottom-up algorithm "starts from the beginning," while a recursive algorithm often "starts from the end and works backwards."

var climbStairs = function (n) {
  if (n === 1) {
    return 1;
  }

  const dp = new Array(n).fill(0);

  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

//mid - optimized
//recursion & memoization
//time complexity: 0(n)
//space complexity: 0(n)
/**
 * @param {number} n
 * @return {number}
 */

var climbStairs = function (n) {
  const memo = {};

  const recurse = function (i, n) {
    if (i > n) {
      return 0;
    }
    if (i === n) {
      return 1;
    }
    if (memo[i]) {
      return memo[i];
    } else {
      return (memo[i] = recurse(i + 1, n) + recurse(i + 2, n));
    }
  };

  return recurse(0, n);
};

//input: num
//output: number: how many distinct ways one can climb to the top
//edge cases: input is 0, return 0;

//recursive

//brute force: recursion
//time complexity: 0(n^2)
//space complexity: 0(n)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  return recurse(0, n);
};

const recurse = function (i, n) {
  if (i > n) {
    return 0;
  }
  if (i === n) {
    return 1;
  }
  return recurse(i + 1, n) + recurse(i + 2, n);
};

//input: num
//output: number: how many distinct ways one can climb to the top
//edge cases: input is 0, return 0;

//recursive
