/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
  const dp = new Array(grid.length).fill(0);

  //set initial val
  dp[dp.length - 1] = grid[grid.length - 1][grid[0].length - 1];

  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[0].length - 1; j >= 0; j--) {
      //if im in the last row
      if (i === grid.length - 1 && j < grid[0].length - 1) {
        dp[j] = grid[i][j] + dp[j + 1];
        //if im in the last column
      } else if (j === grid[0].length - 1 && i !== grid.length - 1) {
        dp[j] = grid[i][j] + dp[j];
      } else if (j != grid[0].length - 1 && i !== grid.length - 1) {
        dp[j] = grid[i][j] + Math.min(dp[j], dp[j + 1]);
      } else {
        dp[j] = grid[i][j];
      }
    }
  }

  return dp[0];
};

//1d bottom up
//time: 0(n*m)
//space: 0(n)

//-------------------------------------
/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
  const dp = new Array(grid.length).fill(new Array(grid[0].length).fill(0));

  dp[grid.length - 1][grid[0].length - 1] =
    grid[grid.length - 1][grid[0].length - 1];

  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[0].length - 1; j >= 0; j--) {
      //if im in the last row
      if (i === grid.length - 1 && j < grid[0].length - 1) {
        dp[i][j] = grid[i][j] + dp[i][j + 1];
        console.log(dp);
        //if im in the last column
      } else if (i < grid.length - 1 && j === grid[0].length - 1) {
        dp[i][j] = grid[i][j] + dp[i + 1][j];
        //otherwise
      } else if (i === grid.length - 1 && j === grid[0].length - 1) {
        continue;
      } else {
        dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  return dp[0][0];
};

//2d bottom up
//time: 0(m*n) we traverse each index in matrix
//space: 0(m*n) we create a duplicate matrix

//--------------------------------------------------
/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
  const DFS = function (row, column) {
    if (row >= grid.length || column >= grid[0].length) {
      return Infinity;
    }
    if (row === grid.length - 1 && column === grid[0].length - 1) {
      return grid[row][column];
    }

    return (
      grid[row][column] + Math.min(DFS(row + 1, column), DFS(row, column + 1))
    );
  };

  return DFS(0, 0, 0);
};

//time: 0(2^m+n)
//space: 0(m+n)
