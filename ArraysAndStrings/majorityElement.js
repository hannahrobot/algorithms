//Booyer Moore algorithm
//time: 0(n)
//space: 0(1)
/*
 *  Algorithm :-
 *  1. Initialize majorityNumber as first item in array.
 *  2. Initialize count as 1. As we have found one majority number.
 *  3. Iterate over the array.
 *      i) if count ===0 at any iteration assign the current element as majority element
 *      ii) if current element is equal to majority element then increment count
 *      iii) if current element is not equal to majority element than decrement counter
 */

var majorityElement = function (nums) {
  let majorityNumber = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      majorityNumber = nums[i];
    }
    count = nums[i] === majorityNumber ? count + 1 : count - 1;
  }
  return majorityNumber;
};
//---------------------------------

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const hash = {};

  for (let i = 0; i < nums.length; i++) {
    if (hash.hasOwnProperty(nums[i])) {
      hash[nums[i]]++;
    } else {
      hash[nums[i]] = 1;
    }
    if (hash[nums[i]] > nums.length / 2) {
      return nums[i];
    }
  }
};

//input: array of nums
//output: int, marjority num that shows up more than n/2

//sort, return element that is at index n/2 +1
//time: 0(nlogn)
//space: 0(1)

//hash table, return el that reaches n/2+1
//time: 0(n)
//space: 0(n)
