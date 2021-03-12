//top down

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const memo = {};
  let max = 0;

  const DFS = function (index) {
    if (index >= nums.length) {
      return 0;
    }

    if (memo.hasOwnProperty(index)) {
      return memo[index];
    }

    memo[index] = nums[index] + Math.max(DFS(index + 2), DFS(index + 3));

    return memo[index];
  };

  for (let i = 0; i < nums.length; i++) {
    max = Math.max(DFS(i), max);
  }

  return max;
};

/*NOTES

input: arr of nums
output: max amount of money you can rob without alerting the police
edge: nums is empty

ex:


approach:
  check which one is more: if we take the next next, or the next next next
  then we jump to the one we took

  we iterate through each index and call dfs

  variables:
      memo
      max

  iterate through array:
      mathmax(DFS(index), max)

  return max

  basecase
      if i >= nums.length
          return 0

      if memo[i]
          return memo[i]

      memo[i] = nums[i] + Math.max(DFS(i + 3),DFS(i + 2))

      return memo[i]

*/
