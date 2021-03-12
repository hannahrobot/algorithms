/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let maxLength = 0;

  const DFS = function (index, arr) {
    maxLength = Math.max(arr.length, maxLength);

    //baseCase:
    if (index === nums.length) {
      return;
    }

    //recursiveCase
    for (let i = index; i < nums.length; i++) {
      if (nums[i] > arr[arr.length - 1]) {
        DFS(i + 1, arr.concat(nums[i]));
      } else {
        DFS(i + 1, [nums[i]]);
      }
    }
  };

  DFS(1, [nums[0]]);

  return maxLength;
};

/*NOTES

input: nums
output: length of longest increasing subsequence
edge: nums is empty or nums is length one

ex:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Input: nums = [0,1,0,3,2,3]
Output: 4

Input: nums = [7,7,7,7,7,7,7]
Output: 1

approach: dynamic programming

either next int is greater than last and we include it
or it isnt greater than last and we start over from the next int

backtracking: brute force: looks at prefix

  variables:
      maxlength

  call dfs (1, [firstindex num])

  DFS(i, arr)


      if(i === nums.length)
          update maxlength

      loop through i starting at start i

      check if nums[i] is greater than last el in array
          if yes:
              DFS(i + 1, arr + nums[i])

          if no:
              we start over
              DFS(i + 1, [i])

optimized: top down memoization: looks at postfix

  variables:
      memo

  DFS(i, arr)

      if(i === nums.length)
          return []

      if memo[i]
          return memo

      memo[i] = []

      loop through i starting at start i

      check if nums[i] is greater than last el in array
          if yes:
              const recurse = DFS(i + 1, arr + nums[i])
              memo[i] = memo[i].length < recurse.length + 1 ? recurse.unshift(nums[i]) : memo[i]

          if no:
              we start over
              const recurse = DFS(i + 1, [i])
              memo[i] = memo[i].length < recurse.length + 1 ? recurse.unshift(nums[i]) : memo[i]

      return memo[i]

  return dfs (1, [firstindex num])


optimized bottom up:

  [3, 2, 1, 4, 5, 6, 7]

  increaseCount
  lastgreatest
  smallestNum =

  we know the longest length is going to start from the smallest number
  as we iterate through, we check if the current number is smaller that the smallest number, if yes, we update smallest number and change count to 1, last greatest = smallest
  if num is greater than last greatest num, increment count


*/
