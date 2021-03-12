/**
 * // Definition for an Interval.
 * function Interval(start, end) {
 *    this.start = start;
 *    this.end = end;
 * };
 */

/**
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 */

const parent = (index) => Math.floor((index - 1) / 2);
const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;

const MinHeapCustom = function () {
  this.heap = [];
};

MinHeapCustom.prototype.swap = function (index, parent) {
  [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
};

MinHeapCustom.prototype.insert = function (val) {
  this.heap.push(val);
  let index = this.heap.length - 1;
  while (index !== 0 && this.heap[index][0] < this.heap[parent(index)][0]) {
    this.swap(index, parent(index));
    index = parent(index);
  }
};

MinHeapCustom.prototype.extractMin = function () {
  const min = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heapify(0);

  return min;
};

MinHeapCustom.prototype.heapify = function (index) {
  let left = leftChild(index);
  let right = rightChild(index);
  let smallest = index;

  if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
    smallest = left;
  }

  if (
    right < this.heap.length &&
    this.heap[right][0] < this.heap[smallest][0]
  ) {
    smallest = right;
  }

  if (smallest !== index) {
    this.swap(smallest, index);
    this.heapify(smallest);
  }
};

MinHeapCustom.prototype.peak = function () {
  if (this.heap.length) {
    return this.heap[0];
  } else {
    return -1;
  }
};

var employeeFreeTime = function (schedule) {
  const heap = new MinHeapCustom();

  //get freetime intervals
  schedule.forEach((employee) => {
    employee.forEach((interval, i) => {
      const { start, end } = interval;
      heap.insert([start, end]);
    });
  });

  const merged = [heap.extractMin()];

  //merge intervals
  while (heap.peak() !== -1) {
    const [start, end] = heap.extractMin();

    //check if they overlap
    if (start < merged[merged.length - 1][1]) {
      //take whichever end is bigger
      merged[merged.length - 1][1] =
        end > merged[merged.length - 1][1] ? end : merged[merged.length - 1][1];
    }

    //if they dont overlap
    else {
      //add our current interval
      merged.push([start, end]);
    }
  }

  const result = [];

  merged.forEach((interval, i) => {
    const [start, end] = interval;
    if (i + 1 < merged.length && end !== merged[i + 1][0]) {
      result.push({ start: end, end: merged[i + 1][0] });
    }
  });
  return result;
};
