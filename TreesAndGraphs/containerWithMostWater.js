//time: 0(n)
//space: 0(1)

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxVolume = 0;
  let l = 0;
  let r = height.length - 1;

  while (l < r) {
    maxVolume = Math.max(maxVolume, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }

  return maxVolume;
};

//----------optimized
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxVolume = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let width = j - i;
      let highest = height[j] < height[i] ? height[j] : height[i];
      maxVolume = Math.max(width * highest, maxVolume);
    }
  }

  return maxVolume;
};

//input: array: non negative ints
//output: volume of most water between two points
//edge cases: every line is 0: 0, one line is greater than 0: 0, arr is empty: 0, only two lines: one container

/*notes

approach:
  brute force
      variables:
          max volume:
      nested for loop
          outerloop: i: first index
              innerloop: j last index
                  width = j-i
                  height: shorter point
                      maxvolume = maxvalume vs newvolume

      return max volume

      time: 0(n^2)
      space: 0(1)






*/
