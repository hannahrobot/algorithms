//3 binary searches: find peak, left, then right

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
const findInMountainArray = function (target, mountainArr) {
  const findPeak = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);
      const curr = mountainArr.get(pivot);
      const leftEl = mountainArr.get(pivot - 1);
      const rightEl = mountainArr.get(pivot + 1);

      if (leftEl < curr && curr > rightEl) {
        return pivot;
      } else if (leftEl > curr && rightEl < curr) {
        right = pivot - 1;
      } else if (leftEl < curr && rightEl > curr) {
        left = pivot + 1;
      }
    }

    return -1;
  };

  const findTargetLeft = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);

      const currEl = mountainArr.get(pivot);

      if (currEl === target) {
        return pivot;
      } else if (currEl < target) {
        left = pivot + 1;
      } else {
        right = pivot - 1;
      }
    }

    return -1;
  };

  const findTargetRight = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);

      const currEl = mountainArr.get(pivot);

      if (currEl === target) {
        return pivot;
      } else if (currEl > target) {
        left = pivot + 1;
      } else {
        right = pivot - 1;
      }
    }

    return -1;
  };

  const length = mountainArr.length();
  const peak = findPeak(0, length - 1);

  //if its the peak we can stop
  if (mountainArr.get(peak) === target) {
    return peak;
  }
  //we prioritize the left side
  const left = findTargetLeft(0, peak - 1);

  if (left !== -1) {
    return left;
  }

  const right = findTargetRight(peak + 1, length - 1);

  //if its not on the left, we return whatever the right returns
  //our bs returns -1 by default
  return right;
};

//2 binary searches: left and right based on slope

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
const findInMountainArray = function (target, mountainArr) {
  const binarySearch = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);
      const pivotEl = mountainArr.get(pivot);
      const rightEl = mountainArr.get(pivot + 1);

      if (pivotEl === target) {
        return pivot;
      } else {
        if (pivotEl < rightEl) {
          if (target > pivotEl) {
            left = pivot + 1;
          } else {
            right = pivot - 1;
          }
        } else if (pivotEl > rightEl) {
          if (target > pivotEl) {
            right = pivot - 1;
          } else {
            left = pivot + 1;
          }
        }
      }
    }

    return -1;
  };

  const length = mountainArr.length();

  const left = binarySearch(0, Math.floor(length / 2));

  if (left !== -1) {
    return left;
  }

  const right = binarySearch(Math.floor(length / 2) + 1, length - 1);

  return right;
};

//Binary search + cached values

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
const findInMountainArray = function (target, mountainArr) {
  const cache = {};

  const getCacheValue = function (i) {
    if (!cache.hasOwnProperty(i)) {
      cache[i] = mountainArr.get(i);
    }
    return cache[i];
  };

  const binarySearch = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);
      const pivotEl = getCacheValue(pivot);
      const rightEl = getCacheValue(pivot + 1);

      if (pivotEl === target) {
        return pivot;
      } else {
        if (pivotEl < rightEl) {
          if (target > pivotEl) {
            left = pivot + 1;
          } else {
            right = pivot - 1;
          }
        } else if (pivotEl > rightEl) {
          if (target > pivotEl) {
            right = pivot - 1;
          } else {
            left = pivot + 1;
          }
        }
      }
    }

    return -1;
  };

  const length = mountainArr.length();

  const left = binarySearch(0, Math.floor(length / 2));

  if (left !== -1) {
    return left;
  }

  const right = binarySearch(Math.floor(length / 2) + 1, length - 1);

  return right;
};

//--------get peak optimized, left, right

//3 binary searches: find peak, left, then right

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
const findInMountainArray = function (target, mountainArr) {
  const findPeak = function (left, right) {
    let tempPeak = 0;

    while (left < right) {
      const pivot = Math.floor((left + right) / 2);

      const mid = mountainArr.get(pivot);
      const rightEl = mountainArr.get(pivot + 1);

      if (mid < rightEl) {
        left = pivot + 1;
        tempPeak = pivot + 1;
      } else {
        right = mid;
      }
    }

    return tempPeak;
  };

  const findTargetLeft = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);

      const currEl = mountainArr.get(pivot);

      if (currEl === target) {
        return pivot;
      } else if (currEl < target) {
        left = pivot + 1;
      } else {
        right = pivot - 1;
      }
    }

    return -1;
  };

  const findTargetRight = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);

      const currEl = mountainArr.get(pivot);

      if (currEl === target) {
        return pivot;
      } else if (currEl > target) {
        left = pivot + 1;
      } else {
        right = pivot - 1;
      }
    }

    return -1;
  };

  const length = mountainArr.length();
  const peak = findPeak(0, length - 1);

  //if its the peak we can stop
  if (mountainArr.get(peak) === target) {
    return peak;
  }
  //we prioritize the left side
  const left = findTargetLeft(0, peak - 1);

  if (left !== -1) {
    return left;
  }

  const right = findTargetRight(peak + 1, length - 1);

  //if its not on the left, we return whatever the right returns
  //our bs returns -1 by default
  return right;
};

//3 binary searches
//find peak only by checking pivot and right

//then do left by only checking mid
//and right by only checking mid

//---------
//3 binary searches: find peak, left, then right

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
const findInMountainArray = function (target, mountainArr) {
  const cache = {};

  const getCacheValue = function (i) {
    if (!cache.hasOwnProperty(i)) {
      cache[i] = mountainArr.get(i);
    }
    return cache[i];
  };

  const findPeak = function (left, right) {
    let tempPeak = 0;

    while (left < right) {
      const pivot = Math.floor((left + right) / 2);

      const mid = getCacheValue(pivot);
      const rightEl = getCacheValue(pivot + 1);

      if (mid < rightEl) {
        left = pivot + 1;
        tempPeak = pivot + 1;
      } else {
        right = mid;
      }
    }

    return tempPeak;
  };

  const findTargetLeft = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);

      const currEl = getCacheValue(pivot);

      if (currEl === target) {
        return pivot;
      } else if (currEl < target) {
        left = pivot + 1;
      } else {
        right = pivot - 1;
      }
    }

    return -1;
  };

  const findTargetRight = function (left, right) {
    while (left <= right) {
      const pivot = Math.floor((left + right) / 2);

      const currEl = getCacheValue(pivot);

      if (currEl === target) {
        return pivot;
      } else if (currEl > target) {
        left = pivot + 1;
      } else {
        right = pivot - 1;
      }
    }

    return -1;
  };

  const length = mountainArr.length();
  const peak = findPeak(0, length - 1);

  //we prioritize the left side
  const left = findTargetLeft(0, peak - 1);

  if (left !== -1) {
    return left;
  }

  const right = findTargetRight(peak + 1, length - 1);

  //if its not on the left, we return whatever the right returns
  //our bs returns -1 by default
  return right;
};

//3 binary searches
//find peak only by checking pivot and right

//then do left by only checking mid
//and right by only checking mid
//3 binary searches: find peak, left, then right

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
const findInMountainArray = function (target, mountainArr) {
  //1.find the peak- binary search
  let length = mountainArr.length();
  let left = 0,
    right = length - 1;
  let peak = 0;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
      left = mid + 1;
      peak = mid + 1;
    } else {
      right = mid;
    }
  }

  //2.apply binary search to the left and find the target
  (left = 0), (right = peak);
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midNum = mountainArr.get(mid);

    if (midNum === target) {
      return mid;
    } else if (midNum < target) {
      left = mid + 1;
    } else if (midNum > target) {
      right = mid - 1;
    }
  }

  //3.apply the binary search to the right if target not found in left
  (left = peak + 1), (right = length - 1);
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midNum = mountainArr.get(mid);

    if (midNum === target) {
      return mid;
    } else if (midNum < target) {
      right = mid - 1;
    } else if (midNum > target) {
      left = mid + 1;
    }
  }

  //if nothing found return -1
  return -1;
};
