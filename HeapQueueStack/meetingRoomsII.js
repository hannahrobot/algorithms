//Priority queues / heap
//Time Complexity: O(Nlog N) we sort our initial intervals
//Space Complexity: O(N) heap could get as big as end times

/**
 * @param {number[][]} intervals
 * @return {number}
 */

//heap methods
//swap
//parent
//leftChild
//rightChild
//insert
//size
//extractMin
//peak
//heapify

const MinHeapCustom = function () {
  this.heap = [];
};

MinHeapCustom.prototype.swap = function (index1, index2) {
  [this.heap[index1], this.heap[index2]] = [
    this.heap[index2],
    this.heap[index1],
  ];
};

MinHeapCustom.prototype.parent = function (index) {
  return Math.floor((index - 1) / 2);
};

MinHeapCustom.prototype.leftChild = function (index) {
  return index * 2 + 1;
};

MinHeapCustom.prototype.rightChild = function (index) {
  return index * 2 + 2;
};

MinHeapCustom.prototype.insert = function (val) {
  this.heap.push(val);
  let index = this.heap.length - 1;

  while (index !== 0 && this.heap[index] < this.heap[this.parent(index)]) {
    this.swap(index, this.parent(index));
    index = this.parent(index);
  }
};

MinHeapCustom.prototype.size = function () {
  return this.heap.length;
};

MinHeapCustom.prototype.peak = function () {
  return this.heap[0];
};

MinHeapCustom.prototype.extractMin = function () {
  const min = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heapify(0);

  return min;
};

MinHeapCustom.prototype.heapify = function (index) {
  let left = this.leftChild(index);
  let right = this.rightChild(index);
  let smallest = index;

  if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
    smallest = left;
  }
  if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
    smallest = right;
  }
  if (index !== smallest) {
    this.swap(index, smallest);
    this.heapify(smallest);
  }
};

var minMeetingRooms = function (intervals) {
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  const endTimes = new MinHeapCustom();

  endTimes.insert(intervals[0][1]);

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const earliestAvailableTime = endTimes.peak();
    if (start >= earliestAvailableTime) {
      endTimes.extractMin();
    }
    endTimes.insert(end);
  }

  return endTimes.size();
};

//chronological ordering
function minMeetingRooms(intervals) {
  if (intervals.length === 0) {
    return 0;
  }

  const startTimes = [];
  const endTimes = [];

  for (let i = 0; i < intervals.length; i++) {
    startTimes.push(intervals[i][0]);
    endTimes.push(intervals[i][1]);
  }

  if (startTimes.length > 1) {
    startTimes.sort((a, b) => a - b);
    endTimes.sort((a, b) => a - b);
  }

  let s = 0;
  let e = 0;
  let rooms = 0;

  while (s < startTimes.length) {
    if (startTimes[s] < endTimes[e]) {
      rooms++;
    } else {
      e++;
    }
    s++;
  }
  return rooms;
}

//alt priority queue heap

/**
 * @param {number[][]} intervals
 * @return {number}
 */

//heap methods
//swap
//parent
//leftChild
//rightChild
//insert
//size
//extractMin
//peak
//heapify

const MinHeapCustom = function () {
  this.heap = [];
};

MinHeapCustom.prototype.swap = function (index1, index2) {
  [this.heap[index1], this.heap[index2]] = [
    this.heap[index2],
    this.heap[index1],
  ];
};

MinHeapCustom.prototype.parent = function (index) {
  return Math.floor((index - 1) / 2);
};

MinHeapCustom.prototype.leftChild = function (index) {
  return index * 2 + 1;
};

MinHeapCustom.prototype.rightChild = function (index) {
  return index * 2 + 2;
};

MinHeapCustom.prototype.insert = function (val) {
  this.heap.push(val);
  let index = this.heap.length - 1;

  while (index !== 0 && this.heap[index] < this.heap[this.parent(index)]) {
    this.swap(index, this.parent(index));
    index = this.parent(index);
  }
};

MinHeapCustom.prototype.size = function () {
  return this.heap.length;
};

MinHeapCustom.prototype.peak = function () {
  return this.heap[0];
};

MinHeapCustom.prototype.extractMin = function () {
  const min = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heapify(0);

  return min;
};

MinHeapCustom.prototype.heapify = function (index) {
  let left = this.leftChild(index);
  let right = this.rightChild(index);
  let smallest = index;

  if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
    smallest = left;
  }
  if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
    smallest = right;
  }
  if (index !== smallest) {
    this.swap(index, smallest);
    this.heapify(smallest);
  }
};

var minMeetingRooms = function (intervals) {
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  const endTimes = new MinHeapCustom();

  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (!endTimes.size()) {
      endTimes.insert(end);
    } else {
      const earliestAvailableTime = endTimes.peak();
      if (start >= earliestAvailableTime) {
        endTimes.extractMin();
      }
      endTimes.insert(end);
    }
  }

  return endTimes.size();
};
