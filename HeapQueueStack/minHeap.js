const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index - 1) / 2);

function MinHeap() {
  this.heap = [];
}

MinHeap.prototype.swap = function (indexOne, indexTwo) {
  const tmp = this.heap[indexOne];
  this.heap[indexOne] = this.heap[indexTwo];
  this.heap[indexTwo] = tmp;
};

MinHeap.prototype.peek = function () {
  // the root is always the highest priority item
  return this.heap[0];
};

MinHeap.prototype.insert = function (element) {
  // push element to the end of the heap
  this.heap.push(element);

  // the index of the element we have just pushed
  let index = this.heap.length - 1;

  // if the element is less than its parent:
  // swap element with its parent
  while (index !== 0 && this.heap[index] < this.heap(parent(index))) {
    this.swap(index, parent(index));
    index = parent(index);
  }
};

MinHeap.prototype.extractMin = function () {
  // remove the first element from the heap
  const root = this.heap.shift();

  // put the last element to the front of the heap
  // and remove the last element from the heap as it now
  // sits at the front of the heap
  this.heap.unshift(this.heap[this.heap.length - 1]);
  this.heap.pop();

  this.heapify(0);

  return root;
};

MinHeap.prototype.heapify = function (index) {
  let left = leftChild(index);
  let right = rightChild(index);
  let smallest = index;

  // if the left child is smaller than the node we are looking at
  if (left < this.heap.length && this.heap[smallest] > this.heap[left]) {
    smallest = left;
  }
  // if the right child is smaller than the node we are looking at
  if (right < this.heap.length && this.heap[smallest] > this.heap[right]) {
    smallest = right;
  }

  if (index !== smallest) {
    this.swap(index, smallest);
    this.heapify(smallest);
  }
};
