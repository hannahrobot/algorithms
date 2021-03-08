/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let row = matrix.length - 1;
  let col = 0;

  while (row >= 0 && col < matrix[0].length) {
    if (matrix[row][col] > target) {
      row--;
    } else if (matrix[row][col] < target) {
      col++;
    } else {
      return true;
    }
  }

  return false;
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  if (matrix === null || !matrix.length) {
    return false;
  }

  const binarySearch = function (rowColumn, isVertical) {
    let left = rowColumn;
    let right = isVertical ? matrix.length - 1 : matrix[0].length - 1;

    if (isVertical) {
      while (left <= right) {
        const pivot = Math.floor((left + right) / 2);
        if (matrix[pivot][rowColumn] === target) {
          return true;
        } else if (matrix[pivot][rowColumn] < target) {
          left = pivot + 1;
        } else if (matrix[pivot][rowColumn] > target) {
          right = pivot - 1;
        }
      }
    } else {
      while (left <= right) {
        const pivot = Math.floor((left + right) / 2);
        if (matrix[rowColumn][pivot] === target) {
          return true;
        } else if (matrix[rowColumn][pivot] < target) {
          left = pivot + 1;
        } else if (matrix[rowColumn][pivot] > target) {
          right = pivot - 1;
        }
      }
    }
    return false;
  };

  //find shortest dimension
  const shortestDim =
    matrix.length < matrix[0].length ? matrix.length : matrix[0].length;

  //iterate through diagonals
  for (let i = 0; i < shortestDim; i++) {
    const vertical = binarySearch(i, true);
    const horizontal = binarySearch(i, false);
    if (vertical || horizontal) {
      return true;
    }
  }

  return false;
};
