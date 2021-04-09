//dp

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  if (!matrix.length) {
    return 0;
  }
  let maxArea = 0;
  const rows = new Array(matrix.length).fill([]);
  const dp = rows.map((el) => new Array(matrix[0].length).fill(0));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "1") {
        dp[i][j] = j === 0 ? 1 : dp[i][j - 1] + 1;
        let width = dp[i][j];

        for (let k = i; k >= 0; k--) {
          width = Math.min(width, dp[k][j]);
          maxArea = Math.max(maxArea, width * (i - k + 1));
        }
      }
    }
  }
  return maxArea;
};
