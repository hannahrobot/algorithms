/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/*       p
           r
       l
[5,7,7,8,8,10]

walk thru and check your bs placements


*/

var searchRange = function(nums, target) {

  const res = [-1, -1]

  const leftBinarySearch = function(left, right) {
      while(left <= right) {
          const pivot = Math.floor((left + right) / 2)
          if(nums[pivot] === target && nums[pivot-1] !== target) {
              return pivot
          }
          if(nums[pivot] < target) {
              left = pivot + 1
          } else if (nums[pivot] === target && nums[pivot-1] === target || nums[pivot] > target) {
              right = pivot - 1
          }
      }

      return -1
  }

  const rightBinarySearch = function(left, right) {
      while(left <= right) {
          const pivot = Math.floor((left + right) / 2)
          if(nums[pivot] === target && nums[pivot+1] !== target) {
              return pivot
          }
          if(nums[pivot] === target && nums[pivot+1] === target || nums[pivot] < target) {
              left = pivot + 1
          } else if (nums[pivot] > target) {
              right = pivot - 1
          }
      }

      return -1
  }

  const leftTarget = leftBinarySearch(0, nums.length-1)
  if(leftTarget !== -1) {
      res[0] = leftTarget
      const rightTarget = rightBinarySearch(leftTarget, nums.length-1)
      if(rightTarget === -1){
          res[1] = res[0]
      } else {
          res[1] = rightTarget
      }
  }

  return res;
};

/*
input: arr, target, sorted ascending order
output: [first, last]
edge: arr is empty, only 1 target is found (both indexes are target), no target found[-1,-1]
questions: are there negatives?


brute force:

variables:
first -1
last -1

loop through, mark first instance
as you continue, keep updating last instance until you get to end of array


time: 0(n)
space: 0(1)


-----
optimized 0(logn): binary search

edge cases:

options:
  write two different BS functions one to find right one to find left
  have more conditional checks and use one function

writing two functions will be more clear


vars:
res = [-1, -1]

binary search function

the array is sorted so we can do two binary searchs

left, right
pivot in middle
if pivot is less than target, go right
if pivot is more than target, go left

the second binary search starts from whichever side we found, if we found left side, the left target is our left start and right is end of array, if we found right side, the right target is right index and we go all the way left

*is it possible to do it with one binary search>?

time: 0(logn)
space: 0(1)

*/
