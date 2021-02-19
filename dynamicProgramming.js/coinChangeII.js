//dynamic programming: bottom up tabloidization

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  //each index represents the amount
  const res = new Array(amount + 1).fill(0);
  res[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j - coins[i] >= 0) {
        res[j] += res[j - coins[i]];
      }
    }
  }

  return res[amount];
};

//time: 0(n*a) coins length times amount
//space: 0(a) the amount that creates the length of the array

//-------------------------
//top down dfs(time limit exceeded)

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */

var change = function (amount, coins) {
  let dfs = function (amount, i) {
    if (amount == 0) return 1;
    if (i >= coins.length || amount < 0) return 0;
    return dfs(amount, i + 1) + dfs(amount - coins[i], i);
  };

  return dfs(amount, 0);
};
