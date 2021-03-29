//bottom up
/*
Use lavenshtein distance algorithm and dynamic programming implementation
Build a matrix from word1 and word2, each cell represents the minimum difference between the words up the current character
Each cell is trying to become the locally minimum difference, so we have 3 options, 1 + left cell, 1 + top cell, 1 + diagonal (two characters aren't the same) or 0 + diagonal (two characters are the same)
*/
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let dp = Array(word1.length + 1)
    .fill(null)
    .map(() => Array(word2.length + 1).fill(0));

  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = i;
  }

  for (let i = 0; i < dp[0].length; i++) {
    dp[0][i] = i;
  }

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // left
        dp[i][j - 1] + 1, // right
        dp[i - 1][j - 1] + (word1[i - 1] != word2[j - 1] ? 1 : 0) // diagonal
      );
    }
  }
  return dp[dp.length - 1][dp[0].length - 1];
};
//top down memoization
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const memo = new Map();

  function run(w1, w2) {
    if (memo.has(`${w1}-${w2}`)) return memo.get(`${w1}-${w2}`);
    if (w1 >= word1.length && w2 >= word2.length) return 0;

    // if it's a match
    if (word1[w1] === word2[w2]) return run(w1 + 1, w2 + 1);

    let insert = Infinity,
      del = Infinity,
      replace = Infinity;

    // insert
    if (w2 < word2.length) insert = run(w1, w2 + 1);

    // delete
    if (w1 < word1.length) del = run(w1 + 1, w2);

    // replace
    if (w1 < word1.length && w2 < word2.length) replace = run(w1 + 1, w2 + 1);

    const res = Math.min(insert, del, replace) + 1;
    memo.set(`${w1}-${w2}`, res);
    return res;
  }
  return run(0, 0);
};
