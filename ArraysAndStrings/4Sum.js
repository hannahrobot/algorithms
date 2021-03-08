/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  if (!nums.length) {
    return [];
  }

  nums.sort((a, b) => a - b);

  const result = [];

  const twoPointers = function (left, right, rem, i, j) {
    while (left < right) {
      let remSum = nums[left] + nums[right];
      if (remSum < rem) {
        left++;
      } else if (remSum > rem) {
        right--;
      } else {
        result.push([i, j, left, right]);
      }
    }
  };

  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    if (sum >= target) {
      break;
    }
    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        break;
      }
      twoPointers(j + 1, nums.length - 1, target - sum, i, j);
    }
  }

  return result;
};

/*NOTES

input: array of nums
output: all unique quadruplets that add up to target
edge: nums is empty:, target is 0,  return []

ex:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

approach: two pointers helper
  sort nums

  variables:
      result

  outerfunc:
      loop: i
          sum += i
          if sum >= target: break

          innerloop: j
              sum += j
              if sum >= target: break

                  innerloop k
                      sum += k
                      if sum >= target: break

                      call 2 pointers helper func to find remainder
                          if we find it: push all numbers in an array to result

approach: hashmap helper

      if hashmap has remainder as a key and the value(index) doesnt match the other indexes: its valid



*/
