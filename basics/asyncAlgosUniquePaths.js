/*NOTES

Unique Paths:

input: m:int, n:int
output: number of unique paths

m = height
n = width

ex:

uniquePaths(3,2);    // 3

[
  [0, 0]
  [0, 0]
  [0, 0]
]

uniquePaths(3,4);    // 10
[
  [0, 0, 0, 0]
  [0, 0, 0, 0]
  [0, 0, 0, 0]
]

uniquePaths(7,3);    // 28

[
  [0, 0, 1]
  [0, 0, 1]
  [0, 0, 1]
  [0, 0, 1]
  [0, 0, 1]
  [0, 0, 1]
  [1, 1, 1]
]

approaches:
  dynamic programming
    top down recursive
    top down memoization - recursive + hash map
    bottom up - iterative

  styles:
    recursive
    iterative

  clues:
    can only go down and right
    check every possible path from each cell down and right

-----------------------------------

  top down:
    basecase: out of bounds: return 0;
    basecase: (1,1): return 1;

    recursive case:
    return func(m-1, n) + func(m, n-1)

  time: 0(2^n*m)
  space: 0(m+n) worst case size of recursion callstack is m+n

  **top down can be improved with a hash. if you draw out the recursion as a tree, notice that we visit many of the cells multiple times, instead of recalculating that cell's paths each time, lets save the number of paths from that cell to a hash table and reference it next time we land on the cell.

------------------------------------
  top down w/ memoization:
    basecase: out of bounds: return 0;
    basecase: (1,1): return 1;

    if(memo[m, n]){
      return memo[m,n]
    }

    recursive case:
    memo[m,n] = func(m-1, n) + func(m, n-1)
    return memo[m,n]

  time: 0(n*m)
  space: 0(m+n) worst case size of recursion callstack is m+n

-------------------------------------

uniquePaths(7,3);    // 28
top down setup view:
[
  [0, 0, 1]
  [0, 0, 1]
  [0, 0, 1]
  [0, 0, 1]
  [0, 0, 1]
  [0, 0, 1]
  [1, 1, 1]
]
bottom up setup view
[
  [1, 1, 1]
  [1, 2, 3]
  [1, 3, 6]
  [1, 4, 10]
  [1, 5, 15]
  [1, 6, 21]
  [1, 7, 28]
]

  bottom up tabloidization: 2D

  create a matrix fill with 0's
  first row is 1's
  first column is 1's

  iterate through the matrix with nested loop starting at (1,1):
    matrix[row][column] = matrix[row-1][column] + matrix[row][column-1]

    time: 0(m*n)
    space: 0(m*n)

-------------------------------------

  bottom up tabloidization: 1D

 */

//top down
function uniquePaths(m, n) {
  //basecase out of bounds: we dont count it
  if (m <= 0 || n <= 0) {
    return 0;
  }
  //basecase: made it to end - we count it as one path
  //first row and first column count as one, so we stop before 0,0
  if (m === 1 || n === 1) {
    return 1;
  }

  //recursive case
  return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
}

//top down w/ memoization
function uniquePaths(m, n) {
  const memo = {};

  //we use a helper func so we can place our memo in the outer func and have global access
  function recurse(row, column) {
    //basecase out of bounds: we dont count it
    if (row <= 0 || column <= 0) {
      return 0;
    }
    //basecase: made it to end - we count it as one path
    //first row and first column count as one, so we stop before 0,0
    if (row === 1 && column === 1) {
      return 1;
    }

    //check if we've visited this cell before
    //if yes, we can just return its value
    if (memo.hasOwnProperty(`${row}${column}`)) {
      return memo[`${row}${column}`];
    }

    //recursive case
    //we save the result to our memo
    memo[`${row}${column}`] =
      recurse(row - 1, column) + recurse(row, column - 1);

    //return the memo value
    return memo[`${row}${column}`];
  }

  return recurse(m, n);
}

// console.log(uniquePaths(7, 3))

//bottom up tabloidization 2D
function uniquePaths(m, n) {
  const dp = new Array(m).fill(new Array(n).fill(0));

  //fill first column with 1
  for (let row = 0; row < m; row++) {
    dp[row][0] = 1;
  }

  //fill first row with 1
  for (let column = 0; column < n; column++) {
    dp[0][column] = 1;
  }

  //build paths
  for (let row = 1; row < m; row++) {
    for (let column = 1; column < n; column++) {
      dp[row][column] = dp[row - 1][column] + dp[row][column - 1];
    }
  }
  return dp[m - 1][n - 1];
}
// time: 0(m*n)
// space: 0(m*n)

console.log(uniquePaths(3, 3));
