//one pass: optimized
//time: 0(n)
//space: 0(1)

var maxProfit = function (prices) {
  let profit = 0;
  let min = Infinity;

  //one pass
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    } else if (prices[i] - min > profit) {
      profit = prices[i] - min;
    }
  }
  return profit;
};

//brute:
//time: 0(n^2)
//space: 0(1)

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[i] < prices[j]) {
        max = Math.max(prices[j] - prices[i], max);
      }
    }
  }

  return max;
};

//input: array ints, prices[i] is the price of stock ont he ith day
//output: int - max profit, you can buy on one day, sell on another day
//edge cases: prices is empty, do i have to approach days in order (buy before i sell), if profit is 0 return 0;

//ex:
//[3, 6, 2, 7, 8]
//output: 6

//find the lowest number, and highest num after
//brute:
//nested loop, compare prices[i] - prices[j] - update max

//time: 0(n^2)
//space: 0(1)
