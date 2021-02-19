//bottom up tabloidization
var findTargetSumWays = function (nums, S) {
  let sums = new Map();
  sums.set(0, 1);

  for (let num of nums) {
    const next = new Map();

    for (let [sum, amount] of sums) {
      const plus = sum + num;
      const minus = sum - num;

      next.set(plus, next.has(plus) ? next.get(plus) + amount : amount);
      next.set(minus, next.has(minus) ? next.get(minus) + amount : amount);
    }

    sums = next;
  }

  return sums.has(S) ? sums.get(S) : 0;
};

//-------------------------------------
//dfs with memoization
//time:
//space: 0(n) because our recursive stack becomes the height of nums.length

var findTargetSumWays = function (nums, S) {
  const hashMap = {};

  const DFS = function (i, sum) {
    if (i === nums.length && sum === S) {
      return 1;
    } else if (i >= nums.length && sum !== S) {
      return 0;
    }

    if (hashMap.hasOwnProperty(`${i}#${sum}`)) {
      return hashMap[`${i}#${sum}`];
    }
    hashMap[`${i}#${sum}`] =
      DFS(i + 1, sum - nums[i]) + DFS(i + 1, sum + nums[i]);

    return hashMap[`${i}#${sum}`];
  };

  return DFS(0, 0);
};

//-------------------------------------
//dfs
//time: 0(2^n)
//space: 0(n) because our recursive stack becomes the height of nums.length

/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function (nums, S) {
  const DFS = function (i, sum) {
    if (i === nums.length && sum === S) {
      return 1;
    } else if (i >= nums.length && sum !== S) {
      return 0;
    }

    return DFS(i + 1, sum - nums[i]) + DFS(i + 1, sum + nums[i]);
  };

  return DFS(0, 0);
};

/*
dfs

dfs with memoization

bottom up with tabloidization

*/
