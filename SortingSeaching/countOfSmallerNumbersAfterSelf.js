/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
  if (nums.length < 1) return [];
  var SegmentTreeNode = function (s, e) {
    this.start = s;
    this.end = e;
    this.left = null;
    this.right = null;
    this.count = 0;
  };
  var max = nums[0];
  var min = nums[0];

  //find max and min els in nums
  nums.forEach(function (num) {
    max = max < num ? num : max;
    min = min > num ? num : min;
  });
  //root has min and max els
  var root = new SegmentTreeNode(min, max);

  var insert = function (node, num) {
    ++node.count;
    //if start is equal to end its a leaf and we stop recursing
    if (node.start === node.end) {
      return 0;
    }
    //if branches dont exist we create them
    if (node.left === null) {
      var mid = (node.start + node.end) >> 1; //Math.floor((start+end) / 2)
      node.left = new SegmentTreeNode(node.start, mid);
      node.right = new SegmentTreeNode(mid + 1, node.end);
    }
    //we are looking for the position of current num, which numbers it fits between, and only numbers that are to the right of current num will be counted in the bucket because we are popping right to left over nums
    if (num > node.left.end) {
      var res = node.left.count + insert(node.right, num);
      return res;
    }
    //otherwise we need to go left because our num fits inside this segment
    return insert(node.left, num);
  };

  var res = [];
  //pop each el of the end of nums
  while (nums.length > 0) {
    //add return to the front of resArr
    res.unshift(insert(root, nums.pop()));
  }
  return res;
};

/*MERGESORT: count the number of times a number jumps over the curr number during merge sort, save it as a secondary el on each el and return map of those counts */

var countSmallerMergeSort = function (nums) {
  if (nums.length == 0 || !nums) return nums;

  let inversion = new Array(nums.length).fill(0);
  let map = nums.map((val, index) => {
    return { val: val, index: index };
  });

  var merge = function (arr) {
    if (arr.length == 1) {
      return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let left = merge(arr.slice(0, mid));
    let right = merge(arr.slice(mid));

    let li = 0,
      ri = 0,
      inversionCount = 0,
      sorted = [];
    // compare numbers from left part to right part
    while (li < left.length) {
      if (right[ri] && left[li].val > right[ri].val) {
        // inversion found
        inversionCount++;
        sorted.push(right[ri++]);
      } else {
        // no inversions for this number (or right is exhausted)
        // update its inversion count up to the current stack
        inversion[left[li].index] += inversionCount;
        sorted.push(left[li++]);
      }
    }

    // deal with left over right values and return
    return [...sorted, ...right.slice(ri)];
  };

  merge(map);
  return inversion;
};
