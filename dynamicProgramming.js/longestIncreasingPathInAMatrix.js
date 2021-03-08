/**
 * @param {number[][]} matrix
 * @return {number}
 */
const longestIncreasingPath = function (matrix) {
  if (!matrix.length) {
    return 0;
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let maxPath = 0;
  const memo = new Array(matrix.length)
    .fill(-1)
    .map((row) => new Array(matrix[0].length).fill(-1));

  const DFS = function (row, column, prev) {
    //basecase: out of bounds or not increasing
    if (
      row < 0 ||
      column < 0 ||
      row >= matrix.length ||
      column >= matrix[0].length ||
      matrix[row][column] <= prev
    ) {
      return 0;
    }

    if (memo[row][column] === -1) {
      let max = 0;

      //recursive case: check each direction
      for (let dir = 0; dir < 4; dir++) {
        const x = row + directions[dir][0];
        const y = column + directions[dir][1];
        max = Math.max(DFS(x, y, matrix[row][column]) + 1, max);
      }

      memo[row][column] = max;
    }

    return memo[row][column];
  };

  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[0].length; column++) {
      maxPath = Math.max(DFS(row, column, -Infinity), maxPath);
    }
  }

  return maxPath;
};
/**
 * @param {number[][]} matrix
 * @return {number}
 */
const longestIncreasingPath = function (matrix) {
  if (!matrix.length) {
    return 0;
  }

  let maxPath = 0;
  const memo = {};

  const DFS = function (row, column, prev) {
    //basecase: out of bounds or not increasing
    if (
      row < 0 ||
      column < 0 ||
      row >= matrix.length ||
      column >= matrix[0].length ||
      matrix[row][column] <= prev
    ) {
      return 0;
    }

    if (memo[`${row}#${column}`]) {
      return memo[`${row}#${column}`];
    }

    memo[`${row}#${column}`] = 0;

    //recursive case: check each direction
    memo[`${row}#${column}`] = Math.max(
      DFS(row + 1, column, matrix[row][column]) + 1,
      memo[`${row}#${column}`]
    );
    memo[`${row}#${column}`] = Math.max(
      DFS(row - 1, column, matrix[row][column]) + 1,
      memo[`${row}#${column}`]
    );
    memo[`${row}#${column}`] = Math.max(
      DFS(row, column + 1, matrix[row][column]) + 1,
      memo[`${row}#${column}`]
    );
    memo[`${row}#${column}`] = Math.max(
      DFS(row, column - 1, matrix[row][column]) + 1,
      memo[`${row}#${column}`]
    );

    return memo[`${row}#${column}`];
  };

  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[0].length; column++) {
      maxPath = Math.max(DFS(row, column, -Infinity), maxPath);
    }
  }

  return maxPath;
};

/*NOTES
input: matrix
output: longest increasing path in the matrix - int
edge cases: matrix is empty: 0

*if they are the same size int it doesnt count

examples:

input:
[
[9, 9, 4],
[6, 6, 8],
[2, 1, 1]
]
output: 4

input:
[
[3, 4, 5],
[3, 2, 6],
[2, 2, 1]
]
output: 4


approach:
  brute force:
      variables:
          maxPath: 0

      outerloop: i
          innerloop: j
              calls DFS on each cell: i, j, 1, cellnum

      DFS: takes i, j, count, prev(cell num)
          basecase: if its out of bounds or the number is equal to or greater than prev
              update MaxPath with count
              return;

              count ++

          recursive case:
              4 directions DFS
                  up
                  down
                  left
                  right
                  (if we go back in the same direction we came, it will be equal and cancel out)


      return maxPath
const longestIncreasingPath = function(matrix) {

  let maxPath = 0

  const DFS = function(row, column, count, prev){

      //basecase: out of bounds or not increasing
      if(row < 0 || column < 0 || row >= matrix.length || column >= matrix[0].length || prev !== null && matrix[row][column] <= prev){
          maxPath = Math.max(count, maxPath)
          return;
      }

      count ++

      //recursive case: check each direction
      DFS(row + 1, column, count, matrix[row][column])
      DFS(row - 1, column, count, matrix[row][column])
      DFS(row, column + 1, count, matrix[row][column])
      DFS(row, column - 1, count, matrix[row][column])
  }

  for(let i = 0; i < matrix.length; i ++) {
      for(let j = 0; j < matrix[0].length; j ++) {
          DFS(i, j, 0, null)
      }
  }

  return maxPath

};

  optimize: DFS with memoization: topdown
      variables:
          maxPath: 0
          memo:

      outerloop: i
          innerloop: j
              maxPath = Math max: DFS on each cell: i, j, 1, cellnum or maxPath

      DFS: takes i, j, prev(cell num)
          basecase: if its out of bounds or the number is equal to or greater than prev
              return 0

          if: memo[cell] exists
              return memo[cell]

          otherwise:
              memo[cell] = 0

          recursive case:
              4 directions DFS
                 memo[cell] = mathmax: up + 1  or memo
                 memo[cell] = mathmax: down + 1 or memo
                 memo[cell] = mathmax: left + 1 or memo
                 memo[cell] = mathMax: right + 1 or memo
                  (if we go back in the same direction we came, it will be equal and cancel out)

          return memo[cell]


      return maxPath

  optimize: topilogical sort

*/

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (grid) {
  if (!grid.length) {
    return 0;
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let m = grid.length;
  let n = grid[0].length;

  // padding the matrix with zero as boundaries
  // assuming all positive integer, otherwise use INT_MIN as boundaries
  const matrix = new Array(m + 2)
    .fill(0)
    .map((row) => new Array(n + 2).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = grid[i][j];
    }
  }
  // calculate outdegrees
  const outDegree = new Array(m + 2)
    .fill(0)
    .map((row) => new Array(n + 2).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      for (let dir = 0; dir < 4; dir++) {
        if (
          matrix[i][j] < matrix[i + directions[dir][0]][j + directions[dir][1]]
        ) {
          outDegree[i][j]++;
        }
      }
    }
  }

  // find leaves who have zero out degree as the initial level
  n += 2;
  m += 2;
  const leaves = [];
  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (outDegree[i][j] === 0) {
        leaves.push([i, j]);
      }
    }
  }
  // remove leaves level by level in topological order
  let height = 0;
  while (leaves.length) {
    height++;
    const size = leaves.length;
    for (let i = 0; i < size; i++) {
      const [row, column] = leaves.shift();
      for (let d = 0; d < 4; d++) {
        const x = row + directions[d][0];
        const y = column + directions[d][1];
        if (matrix[row][column] > matrix[x][y]) {
          if (outDegree[x][y]++ === 0) {
            leaves.push([x, y]);
          }
        }
      }
    }
  }
  return height;
};

/*
Topilogical sorting / Topilogical order

Directed Acrylic Graph

For topilogical sorting we perform "Peeling onion" technique



*/
