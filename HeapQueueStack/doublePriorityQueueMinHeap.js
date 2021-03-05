/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index - 1) / 2);

//constructor takes an object with properties that hold custom functions. the priority property takes in an element in object form, and returns the property on the element that it wants to prioritize

function PriorityQueue(callbackObject) {
  //const queue = new MinMaxPriorityQueue({ priority: x => x.val })
  this.custom = callbackObject;
  this.heap = [];
}

PriorityQueue.prototype.swap = function (indexOne, indexTwo) {
  const tmp = this.heap[indexOne];
  this.heap[indexOne] = this.heap[indexTwo];
  this.heap[indexTwo] = tmp;
};

PriorityQueue.prototype.peek = function () {
  // the root is always the highest priority item
  return this.heap[0];
};

PriorityQueue.prototype.insert = function (element) {
  // push element to the end of the heap
  this.heap.push(element);

  // the index of the element we have just pushed
  let index = this.heap.length - 1;

  // if the element is greater than its parent:
  // swap element with its parent
  while (
    (index !== 0 &&
      this.custom.priority(this.heap[index]) <
        this.custom.priority(this.heap[parent(index)])) ||
    (index !== 0 &&
      this.custom.priority(this.heap[index]) ===
        this.custom.priority(this.heap[parent(index)]) &&
      this.custom.priority2(this.heap[index]) <
        this.custom.priority2(this.heap[parent(index)]))
  ) {
    this.swap(index, parent(index));
    index = parent(index);
  }
};

PriorityQueue.prototype.extractMin = function () {
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

PriorityQueue.prototype.heapify = function (index) {
  let left = leftChild(index);
  let right = rightChild(index);
  let smallest = index;

  // if the left child is bigger than the node we are looking at
  if (
    left < this.heap.length &&
    this.custom.priority(this.heap[smallest]) >
      this.custom.priority(this.heap[left])
  ) {
    smallest = left;
  } else if (
    left < this.heap.length &&
    this.custom.priority(this.heap[smallest]) ===
      this.custom.priority(this.heap[left])
  ) {
    if (
      this.custom.priority2(this.heap[smallest]) >
      this.custom.priority2(this.heap[left])
    ) {
      smallest = left;
    }
  }

  // if the right child is bigger than the node we are looking at
  if (
    right < this.heap.length &&
    this.custom.priority(this.heap[smallest]) >
      this.custom.priority(this.heap[right])
  ) {
    smallest = right;
  } else if (
    right < this.heap.length &&
    this.custom.priority(this.heap[smallest]) ===
      this.custom.priority(this.heap[right])
  ) {
    if (
      this.custom.priority2(this.heap[smallest]) >
      this.custom.priority2(this.heap[right])
    ) {
      smallest = right;
    }
  }

  // if the value of smallest has changed, then some swapping needs to be done
  // and this method needs to be called again with the swapped element
  if (smallest != index) {
    this.swap(smallest, index);
    this.heapify(smallest);
  }
};

var topKFrequent = function (words, k) {
  const hash = {};

  for (let i = 0; i < words.length; i++) {
    if (hash[words[i]]) {
      hash[words[i]]++;
    } else {
      hash[words[i]] = 1;
    }
  }

  const q = new PriorityQueue({
    priority: (x) => x.freq,
    priority2: (x) => x.word,
  });

  for (let key in hash) {
    q.insert({ word: key, freq: hash[key] });
    if (q.heap.length > k) {
      q.extractMin();
    }
  }

  return q.heap.map((node) => node.word);
};

/*NOTES

  input: words: arr of strings, k int
  output: top k freq words(singly listed in an array)
  edge: words length is less than k, sort by freq and return all words

  *sort freq highest to lowest
  *if same freq, sort from lower - higher alph order

  ex:

  Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
  Output: ["i", "love"]
  Explanation: "i" and "love" are the two most frequent words.
      Note that "i" comes before "love" due to a lower alphabetical order.

  approach:
      brute force:
          hash words with count as val
          sort by count and alph
          return top k from sorted list

      medium optimized:
          hash words with count as val
          create a maxHeap with k capacity ordered by frequency then alph
          return maxheap

      most optimized:
          quick select
          its like quicksort but for frequency
          we return when our pivot reaches k

  */
