//one pass binary search
//time: 0(logn)
//space: 0(1)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  if (nums.length === 1) {
    return nums[0] === target ? 0 : -1;
  }

  return binarySearch(nums, 0, nums.length - 1, target);
};

const binarySearch = function (nums, left, right, target) {
  let pivot;

  while (left <= right) {
    pivot = Math.floor((left + right) / 2);

    if (nums[pivot] === target) {
      return pivot;
    }

    if (nums[left] <= nums[pivot]) {
      if (target < nums[pivot] && target >= nums[left]) {
        right = pivot - 1;
      } else {
        left = pivot + 1;
      }
    } else {
      if (target > nums[pivot] && target <= nums[right]) {
        left = pivot + 1;
      } else {
        right = pivot - 1;
      }
    }
  }
  return -1;
};

//------------------------------------
//two pass binary search
//time: 0(log n)
//space: 0(1)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  if (nums.length === 1) {
    return nums[0] === target ? 0 : -1;
  }

  //binary search to find rotation index (index of the smallest element)
  const rotationIdx = findRotationIdx(nums, 0, nums.length - 1);
  //pick the side that target could be on (compare target with nums[0])

  if (nums[rotationIdx] === target) {
    return rotationIdx;
  }
  if (rotationIdx === 0) {
    return binarySearch(nums, 0, nums.length - 1, target);
  }

  if (target < nums[0]) {
    return binarySearch(nums, rotationIdx, nums.length - 1, target);
  } else {
    return binarySearch(nums, 0, rotationIdx, target);
  }
  //binary search to find target in the chosen half
};

const binarySearch = function (nums, left, right, target) {
  let pivot;
  while (left <= right) {
    pivot = Math.floor((left + right) / 2);
    if (nums[pivot] === target) {
      return pivot;
    }
    if (nums[pivot] < target) {
      left = pivot + 1;
    } else {
      right = pivot - 1;
    }
  }
  return -1;
};

const findRotationIdx = function (nums, left, right) {
  if (nums[left] < nums[right]) {
    return 0;
  }

  let pivot;

  while (left <= right) {
    pivot = Math.floor((left + right) / 2);
    if (nums[pivot] > nums[pivot + 1]) {
      return pivot + 1;
    } else {
      if (nums[pivot] < nums[left]) {
        right = pivot - 1;
      } else {
        left = pivot + 1;
      }
    }
  }

  return 0;
};

//optimized
//binary search: trick is to figure out how to do it with the rotation
//0(logn)
