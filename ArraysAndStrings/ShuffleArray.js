/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  const newArr = [];

  for (let i = 0; i < n; i++) {
    newArr.push(nums[i]);
    newArr.push(nums[i + n]);
  }

  return newArr;
};

//input: array of nums (x1-xn, y1-yn), n
//output: array of nums (x1, y1, - xn, yn)

//clarification:
//is the output array nested indices or 1D ?
//1D
//what if i only recieve 1 x coordinate? can i always assume that the array is an even number length (i.e the y axis starts at the center-end of array)

//^ 2n is the length of the array
//therefor, y would always start at n index

//edge cases:

//ex.
//[1, 2, 3, 4, 5, 6, 7, 8], 4
//the forst half becomes even indices, the second half becomes odds

//[1, 5, 2, 6, 3, 7, 4, 8]

//approach:
//brute:
//iterate through the array and push n,& 2n into a new array
//return new array

//time Complexity: 0(n)
//space complexity: 0(n)

//optimized:
//can i do this in place
