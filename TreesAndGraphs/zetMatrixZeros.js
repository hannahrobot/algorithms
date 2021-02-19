/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const columns = new Map();
  const rows = new Map();

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        rows.set(i, true);
        columns.set(j, true);
      }
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (rows.has(i) || columns.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
};
//time: 0(m*n)
//space:  0(m*n)
