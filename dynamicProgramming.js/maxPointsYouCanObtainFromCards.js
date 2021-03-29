/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
  let start = k - 1;
  let end = cardPoints.length - 1;
  let iterations = k;
  let sum = cardPoints.slice(0, k).reduce((a, b) => a + b, 0);
  let max = sum;

  while (iterations) {
    sum -= cardPoints[start--];
    sum += cardPoints[end--];
    max = Math.max(sum, max);
    iterations--;
  }

  return max;
};

/*
sliding window

----------------

dynamic programming problem
use pointers (start and end) instead of slicing card points
first call DFS helper func with 0, cardPoints.length -1

DFS: start, end, countLeft, sum
  basecase: countLeft is 0
      update maxSum

  recursive case
      take the end
      DFS: decrement end, add end to sum, decrement k
      take the begining
      dfs: increment start, add start to sum, decrement k

return maxsum

*/
