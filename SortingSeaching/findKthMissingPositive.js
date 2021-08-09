/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
  arr.unshift(0);

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] + 1 < arr[i + 1]) {
      const between = arr[i + 1] - arr[i] - 1;
      if (between < k) {
        k -= between;
      } else {
        return arr[i] + k;
      }
    }
  }

  return arr[arr.length - 1] + k;
};

/*

brute force:
-iterate through and count missing ints
-if you get to end return arr[arr.length-1] + remainder
time: 0(n)
space: 0(1)


optimized: binary search
time: 0(logn)
space: 0(1)


*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
  //we know what the number should be by its index + 1
  //missing numbers are arr[pivot] - (index + 1)

  let left = 0;
  let right = arr.length;

  while (left < right) {
    const pivot = Math.floor((left + right) / 2);
    const missing = arr[pivot] - (pivot + 1);

    //found the interval where missing lies
    if (missing >= k) {
      right = pivot;
    } else {
      left = pivot + 1;
    }
  }

  return left + k;
};
