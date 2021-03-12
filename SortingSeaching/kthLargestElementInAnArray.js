//quickselect
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

//with heap

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

const left = (index) => index * 2;
const right = (index) => index * 2 + 1;
const parent = (index) => Math.floor(index / 2);

const MinHeap1 = function () {
  this.heap = [];
};

MinHeap1.prototype.swap = function (index, parent) {
  [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
};

MinHeap1.prototype.peak = function () {
  return this.heap[0];
};

MinHeap1.prototype.add = function (val) {
  this.heap.push(val);
  let index = this.heap.length - 1;

  while (index !== 0 && this.heap[index] < this.heap[parent(index)]) {
    const parentIdx = parent(index);
    this.swap(index, parentIdx);
    index = parentIdx;
  }
};

MinHeap1.prototype.extractMin = function () {
  const max = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heapify(0);
  return max;
};

MinHeap1.prototype.heapify = function (index) {
  let leftIdx = left(index);
  let rightIdx = right(index);
  let biggest = index;

  if (leftIdx < this.heap.length && this.heap[leftIdx] < this.heap[biggest]) {
    biggest = leftIdx;
  }

  if (rightIdx < this.heap.length && this.heap[rightIdx] < this.heap[biggest]) {
    biggest = rightIdx;
  }

  if (index !== biggest) {
    this.swap(biggest, index);
    this.heapify(biggest);
  }
};

var findKthLargest = function (nums, k) {
  const heap = new MinHeap1();

  nums.forEach((el) => {
    heap.add(el);
    if (heap.heap.length > k) {
      heap.extractMin();
    }
  });

  return heap.peak();
};

//brute
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a);

  return nums[k - 1];
};

/*NOTES

 input: nums array
 output: kth largest element int
 edge: k is longer than nums.length
 *skip duplicates

 ex:
 Input: nums = [3,2,1,5,6,4], k = 2
 Output: 5

 Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 Output: 4

 approach:

 brute force:
     sort array
     return kth el

     time: 0(nlogn) because of sort
     space: 0(logn) recursion stack from sort

 optimized: heap
     time: overall worst case: 0(nlogk), 0(logn) to add to heap and pop off we do it n times
     space: 0(k) for seen hash and heap size

  most optimized: quick select
    time: 0(n)
    space: 0(logn)
 */
