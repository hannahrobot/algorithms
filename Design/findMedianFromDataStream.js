// Smallest number at top, largest numbers at bottom
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);

    let currentIndex = this.heap.length - 1;

    this.bubbleUp(currentIndex);
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  bubbleUp(index) {
    while (
      this.heap[this.parent(index)] &&
      this.heap[this.parent(index)] > this.heap[index]
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
        this.heap[left] < this.heap[right] &&
        this.heap[index] > this.heap[left]
      ) {
        this.swap(left, index);
        index = left;
      } else if (
        this.heap[left] &&
        this.heap[right] &&
        this.heap[right] < this.heap[left] &&
        this.heap[index] > this.heap[right]
      ) {
        this.swap(right, index);
        index = right;
      } else if (this.heap[left] && this.heap[index] > this.heap[left]) {
        this.swap(left, index);
        index = left;
      } else if (this.heap[right] && this.heap[index] > this.heap[right]) {
        this.swap(right, index);
        index = right;
      } else {
        break;
      }
    }
  }

  getMin() {
    return this.heap[0];
  }

  removeMin() {
    if (this.getSize() > 1) {
      this.swap(0, this.heap.length - 1);
    }

    let removedMin = this.heap.pop();

    this.heapify(0);

    return removedMin;
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

  getSize() {
    return this.heap.length;
  }
}

// Largest number at top, smallest numbers at bottom
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);

    let currentIndex = this.heap.length - 1;

    this.bubbleUp(currentIndex);
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  bubbleUp(index) {
    while (
      this.heap[this.parent(index)] !== undefined &&
      this.heap[this.parent(index)] <= this.heap[index]
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
        this.heap[left] >= this.heap[right] &&
        this.heap[index] <= this.heap[left]
      ) {
        this.swap(left, index);
        index = left;
      } else if (
        this.heap[left] &&
        this.heap[right] &&
        this.heap[right] >= this.heap[left] &&
        this.heap[index] <= this.heap[right]
      ) {
        this.swap(right, index);
        index = right;
      } else if (this.heap[left] && this.heap[left] >= this.heap[index]) {
        this.swap(left, index);
        index = left;
      } else if (this.heap[right] && this.heap[right] >= this.heap[index]) {
        this.swap(right, index);
        index = right;
      } else {
        break;
      }
    }
  }

  getMax() {
    return this.heap[0];
  }

  removeMax() {
    if (this.getSize() > 1) {
      this.swap(0, this.heap.length - 1);
    }

    let removedMax = this.heap.pop();

    this.heapify(0);

    return removedMax;
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

  getSize() {
    return this.heap.length;
  }
}

class MedianFinder {
  constructor() {
    this.low = new MaxHeap(); // max of low numbers (smallest on bottom)
    this.high = new MinHeap(); // min of high numbers (largest on bottom)
  }

  addNum(num) {
    if (this.high.getSize() === 0) this.high.insert(num);
    else if (this.high.getSize() > this.low.getSize()) {
      if (num > this.high.getMin()) {
        let min = this.high.getMin();
        this.high.removeMin();
        this.low.insert(min);
        this.high.insert(num);
      } else {
        this.low.insert(num);
      }
    } else {
      if (num < this.low.getMax()) {
        let max = this.low.getMax();
        this.low.removeMax();
        this.high.insert(max);
        this.low.insert(num);
      } else {
        this.high.insert(num);
      }
    }
  }

  findMedian() {
    if (this.high.getSize() > this.low.getSize()) {
      return this.high.getMin();
    } else {
      return (this.high.getMin() + this.low.getMax()) / 2;
    }
  }
}
