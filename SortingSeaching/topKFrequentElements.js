//methods:

//create hash, sort keys with quickselect

//medium:
// (the time complexity of heap push pop is 0(logk))
//time complexity: 0(nlogk)
//space complexity: 0(n+k)
//create hash, heapify top k elements

//naive:
//time complexity: 0(nlogn)
//space complexity: 0(n)
//create a hash, sort keys, return top k in array

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  if (nums.length === k) return nums;
  const map = nums.reduce((total, elem) => {
    total[elem] = (total[elem] || 0) + 1;

    return total;
  }, {});

  //console.log('======' , map);
  const newNums = Object.keys(map).map((elem) => parseInt(elem));
  if (newNums.length === k) return newNums;
  quickSelect(newNums, map, 0, newNums.length - 1, k);
  //.log(newNums);

  return newNums.slice(0, k);
};

function quickSelect(nums, map, start, end, k) {
  console.log("quickselect ", nums);
  const pivot = nums[(start + end) >> 1];
  let low = start,
    high = end;

  while (low <= high) {
    while (map[nums[low]] > map[pivot] && low <= high) low++;
    while (map[nums[high]] < map[pivot] && low <= high) high--;

    if (low <= high) {
      swap(nums, low, high);
      low++;
      high--;
    }
  }

  if (low <= k) quickSelect(nums, map, low, end, k);
  if (high >= k) quickSelect(nums, map, start, high, k);
}

function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}

//quick select method commented explanation:
var findKthLargest = function (nums, k) {
  // the final position of the kth largest number in a sorted array
  const finalIdx = nums.length - k;
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // random num between left and right
    const pivot = Math.floor(Math.random() * (right - left + 1)) + left;
    // the final position of the pivot in a sorted array
    const pivotIdx = pivotHelper(pivot, left, right);
    // the target number is in its correct postion, thus return
    if (pivotIdx === finalIdx) return nums[finalIdx];

    // if pivotIdx is smaller we undershot, so look only on the right half
    if (pivotIdx < finalIdx) left = pivotIdx + 1;
    // else we overshot, so look only on the left half
    else right = pivotIdx - 1;
  }

  function pivotHelper(pivot, start, end) {
    // move the pivot to the end (get it out of the way)
    swap(pivot, end);

    let i = start;
    let j = start;

    // move smaller nums to the begining of the array
    while (j < end) {
      if (nums[j] <= nums[end]) {
        swap(i, j);
        i++;
      }
      j++;
    }
    // swap pivot to its final position
    swap(i, end);
    return i;
  }

  function swap(i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
};

//quick select method:

var topKFrequent = function (nums, k) {
  const map = new Map();
  for (let n of nums) map.set(n, (map.get(n) || 0) + 1);
  const keys = [...map.keys()],
    finalIdx = keys.length - k;
  let start = 0,
    end = keys.length - 1;

  while (start <= end) {
    const pivot = Math.floor(Math.random() * (end - start + 1)) + start;
    const pivotIdx = pivotHelper(pivot, start, end);

    if (pivotIdx === finalIdx) return keys.slice(finalIdx);
    if (pivotIdx < finalIdx) start = pivotIdx + 1;
    else end = pivotIdx - 1;
  }

  function pivotHelper(pivot, start, end) {
    // move pivot away to the end
    swap(pivot, end);
    let swapIdx = start;

    for (let i = start; i < end; i++) {
      if (map.get(keys[i]) < map.get(keys[end])) {
        swap(swapIdx, i);
        swapIdx++;
      }
    }
    swap(swapIdx, end);
    return swapIdx;
  }

  function swap(i, j) {
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }
};

//heap method
class MinHeap {
  constructor(size) {
    this.size = size || null;
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);

    let currentIndex = this.heap.length - 1;

    this.bubbleUp(currentIndex);

    if (this.size && this.heap.length > this.size) {
      this.removeMin();
    }
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  bubbleUp(index) {
    while (
      this.heap[this.parent(index)] &&
      this.heap[this.parent(index)][1] > this.heap[index][1]
    ) {
      this.swap(this.parent(index), index);
      index = this.parent(index);
    }
  }

  heapify(index) {
    while (true) {
      let left = this.left(index),
        right = this.right(index);

      if (
        this.heap[left] &&
        this.heap[right] &&
        this.heap[left][1] < this.heap[right][1] &&
        this.heap[index][1] > this.heap[left][1]
      ) {
        this.swap(left, index);
        index = left;
      } else if (
        this.heap[left] &&
        this.heap[right] &&
        this.heap[right][1] < this.heap[left][1] &&
        this.heap[index][1] > this.heap[right][1]
      ) {
        this.swap(right, index);
        index = right;
      } else if (this.heap[left] && this.heap[index][1] > this.heap[left][1]) {
        this.swap(left, index);
        index = left;
      } else if (
        this.heap[right] &&
        this.heap[index][1] > this.heap[right][1]
      ) {
        this.swap(right, index);
        index = right;
      } else {
        break;
      }
    }
  }

  removeMin() {
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapify(0);
  }

  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  left(index) {
    return 2 * index + 1;
  }

  right(index) {
    return 2 * index + 2;
  }
}

var topKFrequent = function (nums, k) {
  let heap = new MinHeap(k),
    hash = {},
    output = [];

  // Get frequency
  nums.forEach((num) => {
    if (!(num in hash)) hash[num] = 0;
    hash[num]++;
  });

  let keys = Object.keys(hash);

  for (var i = 0; i <= keys.length - 1; i++) {
    let key = keys[i];

    output.push([key, hash[key]]); // key, frequency
  }

  output.forEach((value) => {
    heap.insert(value);
  });

  return heap.heap.map((val) => Number(val[0]));
};
