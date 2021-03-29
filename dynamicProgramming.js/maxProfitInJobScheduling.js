//bottom up dp, sort by end time

/*
Sort by end time and find the job previous to it which can be non conflicting.
Property is either to include particular job or not and getting maximum out of it.
*/

var jobScheduling = function (startTime, endTime, profit) {
  let jobs = [];
  let n = startTime.length;
  for (let i = 0; i < n; i++) {
    jobs.push({ s: startTime[i], e: endTime[i], p: profit[i] });
  }
  jobs.sort(function (x, y) {
    return x.e - y.e;
  });
  let dp = new Array(n);
  dp[0] = jobs[0].p;
  for (let i = 1; i < n; i++) {
    let profit = jobs[i].p;
    let task = -1;
    for (let j = i - 1; j >= 0; j--) {
      if (jobs[j].e <= jobs[i].s) {
        task = j;
        break;
      }
    }
    if (task != -1) profit += dp[task];
    dp[i] = Math.max(profit, dp[i - 1]);
  }
  return dp[n - 1];
};

//memoization

var jobScheduling = function (startTime, endTime, profit) {
  const memo = {};

  //start times arent sorted
  const combined = startTime
    .map((start, i) => [start, endTime[i], profit[i]])
    .sort((a, b) => a[0] - b[0]);

  const DFS = function (lastEnd, index) {
    //baseCase
    if (index === startTime.length) {
      return 0;
    }

    if (memo.hasOwnProperty(index)) {
      return memo[index];
    }

    memo[index] = 0;

    for (let i = index; i < combined.length; i++) {
      const [newStart, newEnd, newProfit] = combined[i];
      if (lastEnd === null || newStart >= lastEnd) {
        memo[index] = Math.max(
          memo[index],
          newProfit + DFS(combined[i][1], i + 1)
        );
      }
    }

    return memo[index];
  };

  return DFS(null, 0, 0);
};

//backtracking

/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function (startTime, endTime, profit) {
  let maxProfit = 0;

  //start times arent sorted
  const combined = startTime
    .map((start, i) => [start, endTime[i], profit[i]])
    .sort((a, b) => a[0] - b[0]);

  const DFS = function (lastEnd, index, profitSum) {
    //baseCase
    if (index === startTime.length) {
      return;
    }

    for (let i = index; i < combined.length; i++) {
      const [newStart, newEnd, newProfit] = combined[i];
      if (lastEnd === null || newStart >= lastEnd) {
        maxProfit = Math.max(maxProfit, profitSum + newProfit);
        DFS(combined[i][1], i + 1, profitSum + combined[i][2]);
      }
    }
  };

  DFS(null, 0, 0);

  return maxProfit;
};

/*NOTES

input: start times[i], endTime[i], profit[i]
output: max profit such that no two jobs taken overlap
edge: arrays are empty or length 1

*are they sorted by start time?

ex:
Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth job.
Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.

Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: The subset chosen is the first, fourth and fifth job.
Profit obtained 150 = 20 + 70 + 60.

approach: dynamic programming

  1. create non overlapping combinations
  2. compare combinations


  backtracking:
      global variables:
          max profit

      *we would only be able to sort by start if we combine them all into an array together

      call dfs at index 0 with an empty array(array will take indexes, profit sum)

      DFS:
          1. iterate over arrays(i), have a 'taken' array with values we've taken
              *in each iteration, if the current i end doesnt conflict with the last i start
          2. pass i+1 to the next recursive call, add new profit and index to taken
          3. iterate from i to another job that we can take
          4. if i === n, update max profit (math max)

      return maxProfit



*/
