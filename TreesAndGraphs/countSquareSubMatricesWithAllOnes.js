/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
  let submatrices = 0;

  const DFS = function (topRightCell, bottomLeftCell) {
    //basecase
    if (
      topRightCell[1] >= matrix[0].length ||
      bottomLeftCell[0] >= matrix.length
    ) {
      return 0;
    }

    for (
      let i = 0;
      bottomLeftCell[1] + i < matrix[0].length &&
      topRightCell[0] + i < matrix.length &&
      i < bottomLeftCell[1];
      i++
    ) {
      if (
        matrix[topRightCell[0] + i][topRightCell[1]] !== 1 ||
        matrix[bottomLeftCell[0]][bottomLeftCell[1] + i] !== 1
      ) {
        return 0;
      }
    }

    return (
      1 +
      DFS(
        [topRightCell[0], topRightCell[1] + 1],
        [bottomLeftCell[0] + 1, bottomLeftCell[1]]
      )
    );
  };

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 1) {
        submatrices += DFS([row, col], [row, col]);
      }
    }
  }

  return submatrices;
};

/*
given m*n matrix, count how many square submatrices have all ones
edge cases: matrix is empty, there are no ones
questions:

ex.


approach:

vars
-submatrices = 0


function DFS(topRightCell, bottomLeftCell) {

  //basecase
      out of bounds

      iterate from topRightCell down, from bottomleft cell right
          if both arent 1's, return 0

      return 1 + DFS([topRightCell[0], topRightCell[1] + 1], [bottomLeftCell[0] +1, bottomLeftCell[1]])

}


iterate through matrix
  if matrix[row][col] === 1
      submatrices += dfs(row, col)

return submatrices

*/

//dp - bottom up

/**
 * @param {number[][]} matrix
 * @return {number}
 */
const countSquares = (matrix) => {
  let count = 0;
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[0].length; ++j) {
      if (matrix[i][j] === 0) continue;
      if (i > 0 && j > 0) {
        matrix[i][j] += Math.min(
          matrix[i - 1][j],
          matrix[i][j - 1],
          matrix[i - 1][j - 1]
        );
      }
      count += matrix[i][j];
    }
  }
  return count;
};
