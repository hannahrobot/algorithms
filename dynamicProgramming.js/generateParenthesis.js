/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  if (n === 0) {
    return [""];
  }

  const ans = [];

  const backtrack = function (cur, open, close) {
    if (cur.length === n * 2) {
      ans.push(cur);
      return;
    }
    if (open < n) {
      backtrack(cur + "(", open + 1, close);
    }
    if (close < open) {
      backtrack(cur + ")", open, close + 1);
    }
  };

  backtrack("", 0, 0);
  return ans;
};

//time:
//space:
