/**
 * @param {number[][]} mat
 * @param {number} K
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, K) {
  const dup = new Array(mat.length).fill(new Array(mat[0].length).fill(0));

  const DFS = function (r, c, depth) {
    if (r < 0 || c < 0 || r >= mat.length || c >= mat[0].length || depth < 0) {
      return 0;
    }

    return mat[r][c] + DFS(r + 1, c, depth - 1);
    DFS(r - 1, c, depth - 1);
    DFS(r, c + 1, depth - 1);
    DFS(r, c - 1, depth - 1);
    DFS(r + 1, c + 1, depth - 1);
    DFS(r - 1, c - 1, depth - 1);
    DFS(r + 1, c - 1, depth - 1);
    DFS(r - 1, c + 1, depth - 1);
  };

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      dup[i][j] = DFS(i, j, K);
    }
  }

  return dup;
};

//input: matrix, integer k
//ouput: matrix
//

//everything horizontally, vertically, and diagonally adjacent of it
//do a dfs in all 8 directions to add the sum, if its out of bounds return 0

/*
[
  [1,2,3],
  [4,5,6],
  [7,8,9]], K = 1


Output:
[
  [12,21,16],
  [27,45,33],
  [24,39,28]]


approach:
  //----------------------------
  brute force
      duplicate matrix, filled with zeros
      iterate through each element in my duplicate matrix:
          dup[i][j] = DFS(i, j, k)

          DFS adds sum from 8 directions
              basecase: out of bounds returns 0, or k = 0 returns 0
              recursive case: add 8 directions, subtract 1 from k each time

*/

/**
 * @param {number[][]} mat
 * @param {number} K
 * @return {number[][]}
 */
var matrixBlockSum = function (mat, K) {
  //create an empty matrix copy
  const dup = new Array(mat.length).fill(new Array(mat[0].length).fill(0));
  let vis;

  const DFS = function (r, c, depth) {
    if (
      r < 0 ||
      c < 0 ||
      r >= mat.length ||
      c >= mat[0].length ||
      depth < 0 ||
      vis[r][c] === "v"
    ) {
      return 0;
    }

    //mark node as visited so we dont add it more than once
    vis[r][c] = "v";

    return (
      mat[r][c] +
      DFS(r + 1, c, depth - 1) +
      DFS(r - 1, c, depth - 1) +
      DFS(r, c + 1, depth - 1) +
      DFS(r, c - 1, depth - 1) +
      DFS(r + 1, c + 1, depth - 1) +
      DFS(r - 1, c - 1, depth - 1) +
      DFS(r + 1, c - 1, depth - 1) +
      DFS(r - 1, c + 1, depth - 1)
    );
  };

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      //new visited arr
      vis = new Array(mat.length).fill(new Array(mat[0].length).fill(0));
      //dfs to add block sums surrounding grid point for k cycles
      dup[i][j] = DFS(i, j, K);
    }
  }

  return dup;
};

//input: matrix, integer k
//ouput: matrix
//

//everything horizontally, vertically, and diagonally adjacent of it
//do a dfs in all 8 directions to add the sum, if its out of bounds return 0

/*
[
  [1,2,3],
  [4,5,6],
  [7,8,9]], K = 1


Output:
[
  [12,21,16],
  [27,45,33],
  [24,39,28]]


Input: mat = [
[1,2,3],
[4,5,6],
[7,8,9]
],
K = 2
Output: [
[45,45,45],
[45,45,45],
[45,45,45]
]



approach:
  //----------------------------
  brute force
      duplicate matrix, filled with zeros
      iterate through each element in my duplicate matrix:
          dup[i][j] = DFS(i, j, k)

          DFS adds sum from 8 directions
              basecase: out of bounds returns 0, or k = 0 returns 0
              recursive case: add 8 directions, subtract 1 from k each time

*/
