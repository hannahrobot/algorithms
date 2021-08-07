/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const res = [];

  const backtrack = function (arr, open, close) {
    //basecase
    if (arr.length === n * 2) {
      res.push(arr.join(""));
      return;
    }

    if (open < n) {
      arr.push("(");
      backtrack(arr, open + 1, close);
      arr.pop();
    }

    if (close < open) {
      arr.push(")");
      backtrack(arr, open, close + 1);
      arr.pop();
    }
  };

  backtrack([], 0, 0);

  return res;
};
