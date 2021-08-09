//top down

/**
 * @param {number[][]} mat
 * @return {number}
 */
var longestLine = function (mat) {
  const directions = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];
  let max = 0;
  const memo = {};

  const DFS = function (row, col, dir) {
    //basecase
    if (
      row < 0 ||
      row >= mat.length ||
      col < 0 ||
      col >= mat[0].length ||
      mat[row][col] !== 1
    ) {
      return 0;
    }

    if (memo[`${row}|${col}|${dir}`]) {
      return memo[`${row}|${col}|${dir}`];
    }

    //recursive case
    memo[`${row}|${col}|${dir}`] = 1 + DFS(row + dir[0], col + dir[1], dir);

    return memo[`${row}|${col}|${dir}`];
  };

  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      directions.forEach((dir) => {
        if (!memo[`${row}|${col}|${dir}`]) {
          max = Math.max(DFS(row, col, dir), max);
        }
      });
    }
  }

  return max;
};

/*

find length of longest line of consecutive one in the matrix

approach:
dfs through mat to find longest line

vars:
-directions

DFS: row, col, dir
  basecase: out of bounds or row/col is not a 1
      return 0

  return 1 + DFS(row + dir[0], col+ dir[1], dir)


iterate through matrix
  at each iteration: call dfs in all 4 directions with dir
      directions.forEach(dir => {
          DFS(row, col, dir)
      })

optimization with memoization:
  each dfs goes in every direction save the row|col|dir and memoize
  if you already have row|col|dir, return memo


*/

//bottom up

var longestLine = function (mat) {
  // dp = [[0, 0, 0, 0].... col's length] - (Accumulates) horizontal , vertical, diagonal, anti diagonal
  let dp = new Array(mat[0].length).fill(0).map(() => new Array(4).fill(0));

  let max = 0;

  for (let i = 0; i < mat.length; i++) {
    let currentDp = new Array(mat[0].length)
      .fill(0)
      .map(() => new Array(4).fill(0));
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 1) {
        currentDp[j][0] = j > 0 ? currentDp[j - 1][0] + 1 : 1; // horizontal
        currentDp[j][1] = dp[j][1] + 1; // vertical
        currentDp[j][2] = j > 0 ? dp[j - 1][2] + 1 : 1; // diagonal
        currentDp[j][3] = j < mat[0].length - 1 ? dp[j + 1][3] + 1 : 1; //anti diagonal
      }

      max = Math.max(max, Math.max(...currentDp[j]));
    }

    dp = currentDp;
  }

  return max;
};

//
