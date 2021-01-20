/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let total = amount;
  let least = Infinity;
  const memo = {};

  //sort coins
  coins.sort((a, b) => a - b);

  //if smallest coin is greater than amount after sorting
  if (coins[0] > amount) {
    return -1;
  }

  function recursive(total, count, goldCoins) {
    //if we've hit 0, then we update our least coins required
    if (total === 0) {
      least = Math.min(count, least);
      return true;
    }
    //if the amount isnt divisible by remaining coin
    //or if there are no coins left and we still have money
    if (
      (goldCoins.length === 1 && total % goldCoins[0] !== 0) ||
      (goldCoins.length === 0 && total > 0)
    ) {
      return false;
    }

    //if total is divisible by largest coin
    if (goldCoins[goldCoins.length - 1] <= total) {
      memo[`${total}${count}`] = recursive(
        total - goldCoins[goldCoins.length - 1],
        count + 1
      );
    }
    //we should always check this alternate case;
    const cutCoins = goldCoins.slice(0, goldCoins.length - 1);
    recursive(total, count, cutCoins);
  }
  recursive(total, 0, coins);

  return least;
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let total = amount;
  let least = Infinity;
  const memo = {};

  //sort coins
  coins.sort((a, b) => a - b);

  //if smallest coin is greater than amount after sorting
  if (coins[0] > amount) {
    return -1;
  }

  function recursive(total, count, goldCoins) {
    //if we've hit 0, then we update our least coins required
    if (total === 0) {
      least = Math.min(count, least);
      return true;
    }
    //if the amount isnt divisible by remaining coin
    //or if there are no coins left and we still have money
    if (
      (goldCoins.length === 1 && amount % goldCoins[0] !== 0) ||
      (goldCoins.length === 0 && total > 0)
    ) {
      return false;
    }

    //if total is divisible by largest coin
    if (goldCoins[goldCoins.length - 1] <= total) {
      memo[`${total}${count}`] = recursive(
        total - goldCoins[goldCoins.length - 1],
        count + 1
      );
    }
    //we should always check this alternate case;
    const cutCoins = goldCoins.slice(0, goldCoins.length - 1);
    recursive(total, count, cutCoins);
  }
  recursive(total, 0, coins);

  return least;
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let total = amount;
  let least = Infinity;

  //this case is handled in our recursion
  // //if amount is 0 we have no options
  // if(amount === 0) {
  //     return 0;
  // }
  //sort coins
  coins.sort((a, b) => a - b);

  //if smallest coin is greater than amount after sorting
  if (coins[0] > amount) {
    return -1;
  }

  function recursive(total, count) {
    //if we've hit 0, then we update our least coins required
    if (total === 0) {
      least = Math.min(count, least);
      return;
    }
    //if the amount isnt divisible by remaining coin
    //or if there are no coins left and we still have money
    if (
      (coins.length === 1 && amount % coins[0] !== 0) ||
      (coins.length === 0 && total > 0)
    ) {
      return;
    }

    //if total is divisible by largest coin
    if (coins[coins.length - 1] <= total) {
      recursive(total - coins[coins.length - 1], count + 1);
    }
    //we should always check this alternate case;
    coins.pop();
    recursive(total, count);
  }
  recursive(total, 0);

  return least;
};
