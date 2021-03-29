/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let count = 0;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        count++;
      }
    }
    nums[i] = count;
  }
  return nums;
};

/*notes

input: nums array
output: number of smaller elements to the right of current element
edge: nums is empty, nums is length 1

ex:
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.

Input: nums = [-1]
Output: [0]

Input: nums = [-1,-1]
Output: [0,0]


approach:
  brute force:
      nested forloop
          outerloop: i: current num
              variables:
                  count = 0
              innerloop: j:
                  if the number at j is smaller than i, count ++,
              change i to count

  return nums

approach: optimized
  stack?
  minstack
  maxstack






*/
