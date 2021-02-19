const uniquePaths = function (m, n) {
  const dp = new Array(m).fill(new Array(n).fill(0));
  //row 1's
  dp[0].fill(1);

  //column 1's
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};
//-------------------------------------

//concise top down recursive approach

const uniquePaths = function (m, n) {
  if (m === 1 || n === 1) {
    return 1;
  }

  return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
};
//-----------------------------------
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
  const memo = {};

  const DFS = function (row, column) {
    //basecase: if its out of bounds return 0, not a possible path
    if (row < 0 || column < 0 || row >= m || column >= n) {
      return 0;
    }
    //basecase: we reach the end, add one for a possible path
    if (row === m - 1 && column === n - 1) {
      return 1;
    }
    //if we've already visited and counted possibilities for this cell
    if (memo.hasOwnProperty(`${row}${column}`)) {
      return memo[`${row}${column}`];
    }
    //check possibilities for right
    const right = DFS(row, column + 1);
    //check possibilies for down
    const down = DFS(row + 1, column);
    //set the memo for this cell = to the sum of right + down possibilities
    memo[`${row}${column}`] = right + down;
    //return the sum
    return memo[`${row}${column}`];
  };
  //return the sum of all possibilites from cell at 0,0
  return DFS(0, 0);
};
/*
top down: dfs and count
  return: call dfs on 0,0
  DFS:
      basecase: out of bounds: return 0
      basecase: end cell: return 1

      recursive case: DFS right
      recursive case: DFS down

      return down + right
--------------------------------------
top down: dfs and count: memoization
  variables:
      memo
  return: call dfs on 0,0
  DFS:
      basecase: out of bounds: return 0
      basecase: end cell: return 1

      if memo for cell exists: return memo

      recursive case: DFS right
      recursive case: DFS down

      memo = down + right

      return memo
--------------------------------------
dynamic programming: bottom up


*/
