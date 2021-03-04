//2 pointers optimized
//time: 0(n)
//space: 0(1)
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let water = 0;
  let leftMax = 0;
  let rightMax = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= leftMax
        ? (leftMax = height[left])
        : (water += leftMax - height[left]);
      left++;
    } else {
      height[right] >= rightMax
        ? (rightMax = height[right])
        : (water += rightMax - height[right]);
      right--;
    }
  }

  return water;
};
//-----------------------------

//dp solution
//time: 0(n)
//space: 0(n)

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const leftMax = new Array(height.length);
  leftMax[0] = height[0];
  const rightMax = new Array(height.length);
  let water = 0;

  for (let i = 1; i < height.length; i++) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1]);
  }

  rightMax[height.length - 1] = height[height.length - 1];

  for (let i = height.length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  for (let i = 1; i < height.length - 1; i++) {
    const heightMin = Math.min(leftMax[i], rightMax[i]);
    water += heightMin - height[i];
  }

  return water;
};

/*NOTES

approaches:
  dp
  stack
  2 pointers

*/

//stack solution
//time: 0(n)
//space: 0(n)

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const stack = [];
  let water = 0;
  let index = 0;

  //if stack has no length, or index is at the last index, we are done
  while (index < height.length) {
    while (stack.length && height[index] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      if (!stack.length) {
        break;
      }
      const distance = index - stack[stack.length - 1] - 1;
      const boundedHeight =
        Math.min(height[index], height[stack[stack.length - 1]]) - height[top];
      water += distance * boundedHeight;
    }
    stack.push(index);
    index++;
  }

  return water;
};
