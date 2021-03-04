const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index - 1) / 2);

function MaxHeap() {
  this.heap = [];
}

MaxHeap.prototype.swap = function (indexOne, indexTwo) {
  const tmp = this.heap[indexOne];
  this.heap[indexOne] = this.heap[indexTwo];
  this.heap[indexTwo] = tmp;
};

MaxHeap.prototype.peek = function () {
  // the root is always the highest priority item
  return this.heap[0];
};

MzxHeap.prototype.insert = function (element) {
  // push element to the end of the heap
  this.heap.push(element);

  // the index of the element we have just pushed
  let index = this.heap.length - 1;

  // if the element is greater than its parent:
  // swap element with its parent
  while (index !== 0 && this.heap[index] > this.heap[parent(index)]) {
    this.swap(index, parent(index));
    index = parent(index);
  }
};

MaxHeap.prototype.extractMax = function () {
  // remove the first element from the heap
  const root = this.heap.shift();

  // put the last element to the front of the heap
  // and remove the last element from the heap as it now
  // sits at the front of the heap
  this.heap.unshift(this.heap[this.heap.length - 1]);
  this.heap.pop();

  // correctly re-position heap
  this.heapify(0);

  return root;
};

MaxHeap.prototype.heapify = function (index) {
  let left = leftChild(index);
  let right = rightChild(index);
  let biggest = index;

  // if the left child is bigger than the node we are looking at
  if (left < this.heap.length && this.heap[biggest] < this.heap[left]) {
    biggest = left;
  }

  // if the right child is bigger than the node we are looking at
  if (right < this.heap.length && this.heap[biggest] < this.heap[right]) {
    biggest = right;
  }

  // if the value of biggest has changed, then some swapping needs to be done
  // and this method needs to be called again with the swapped element
  if (biggest != index) {
    this.swap(biggest, index);
    this.heapify(biggest);
  }
};
