//Use one hashmap nodeHash to store information between key:node
//Use another hashmap freqHash to store information between freq: the val is a dll (doublylinkedlist) representing LRU
//Use Doublylinkedlist to store a LRU for a given freq
//I use dummy head&tail for easier implementation

class Node {
  constructor(key, value) {
    this.key = key;
    this.val = value;
    this.next = this.prev = null;
    this.freq = 1;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  insertHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    let prev = node.prev;
    let next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  removeTail() {
    let node = this.tail.prev;
    this.removeNode(node);
    return node.key;
  }

  isEmpty() {
    return this.head.next.val == null;
  }
}

/**
 * @param {number} capacity
 */
var LFUCache = function (capacity) {
  this.capacity = capacity;
  this.currentSize = 0;
  this.leastFreq = 0;
  this.nodeHash = new Map();
  this.freqHash = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  let node = this.nodeHash.get(key);
  if (!node) return -1;
  this.freqHash.get(node.freq).removeNode(node);
  if (node.freq == this.leastFreq && this.freqHash.get(node.freq).isEmpty())
    this.leastFreq++;
  node.freq++;
  // freqHash housekeeping
  if (this.freqHash.get(node.freq) == null)
    this.freqHash.set(node.freq, new DoublyLinkedList());
  this.freqHash.get(node.freq).insertHead(node);
  return node.val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  if (this.capacity == 0) return;
  let node = this.nodeHash.get(key);
  if (!node) {
    // new node
    this.currentSize++;
    if (this.currentSize > this.capacity) {
      let tailKey = this.freqHash.get(this.leastFreq).removeTail();
      this.nodeHash.delete(tailKey);
      this.currentSize--;
    }
    let newNode = new Node(key, value);
    // freqHash housekeeping
    if (this.freqHash.get(1) == null)
      this.freqHash.set(1, new DoublyLinkedList());
    this.freqHash.get(1).insertHead(newNode);

    this.nodeHash.set(key, newNode);
    this.leastFreq = 1;
  } else {
    // existed node
    node.val = value;
    this.freqHash.get(node.freq).removeNode(node);
    if (node.freq == this.leastFreq && this.freqHash.get(node.freq).isEmpty())
      this.leastFreq++;
    node.freq++;
    // freqHash housekeeping
    if (this.freqHash.get(node.freq) == null)
      this.freqHash.set(node.freq, new DoublyLinkedList());
    this.freqHash.get(node.freq).insertHead(node);
  }
};

//ordered Dict map & priorityQueue

/**
 * @param {number} capacity
 */

const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index - 1) / 2);

//constructor takes an object with properties that hold custom functions. the priority property takes in an element in object form, and returns the property on the element that it wants to prioritize

function MinPriorityQueue1(callbackObject) {
  //const queue = new MinMinPriorityQueue({ priority: x => x.val })
  this.custom = callbackObject;
  this.heap = [];
}

MinPriorityQueue1.prototype.swap = function (indexOne, indexTwo) {
  const tmp = this.heap[indexOne];
  this.heap[indexOne] = this.heap[indexTwo];
  this.heap[indexTwo] = tmp;
};

MinPriorityQueue1.prototype.peek = function () {
  // the root is always the highest priority item
  return this.heap[0];
};

MinPriorityQueue1.prototype.insert = function (element) {
  // push element to the end of the heap
  this.heap.push(element);

  // the index of the element we have just pushed
  let index = this.heap.length - 1;

  // if the element is greater than its parent:
  // swap element with its parent
  while (
    index !== 0 &&
    this.custom.priority(this.heap[index]) <
      this.custom.priority(this.heap[parent(index)])
  ) {
    this.swap(index, parent(index));
    index = parent(index);
  }
};

MinPriorityQueue1.prototype.extractMin = function () {
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

MinPriorityQueue1.prototype.update = function (key, freq) {
  let index = this.heap.length - 1;
  //find key

  while (this.heap[index].freq > freq) {
    index = parent(index);
  }
  while (this.heap[index].key !== key) {
    index++;
  }

  //increment freq
  this.heap[index].freq++;

  //heapify
  this.heapify(index);
};

MinPriorityQueue1.prototype.heapify = function (index) {
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
  }

  // if the right child is bigger than the node we are looking at
  if (
    right < this.heap.length &&
    this.custom.priority(this.heap[smallest]) >
      this.custom.priority(this.heap[right])
  ) {
    smallest = right;
  }

  // if the value of smallest has changed, then some swapping needs to be done
  // and this method needs to be called again with the swapped element
  if (smallest != index) {
    this.swap(smallest, index);
    this.heapify(smallest);
  }
};

var LFUCache = function (capacity) {
  this.capacity = capacity;
  this.LFUHeap = new MinPriorityQueue1({ priority: (x) => x.freq });
  this.LRUDict = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
  if (this.LRUDict.has(key)) {
    const { val, freq } = this.LRUDict.get(key);
    this.LRUDict.delete(key);

    //update LFU freq: find it, increase freq, heapify
    this.LFUHeap.update(key, freq);

    //update LRU
    this.LRUDict.put(key, { val: val, freq: freq + 1 });

    return this.LRUDict.get(key).val;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
  //{val, freq}
  //if it exists in our LRU cache, utilize get to increase freq if it exists,
  //then add the new val
  if (this.LRUDict.has(key)) {
    const { val, freq } = this.LRUDict.get(key);
    this.get(key);
    this.LRUDict.set(key, { val: value, freq: freq + 1 });
  } else {
    if (this.capacity === this.LFUHeap.heap.length) {
      //we need to check if any of the children of the 0th index come before it in LRU
      //if they have same freq
      if (
        this.LFUHeap.heap[0].freq === this.LFUHeap.heap[1].freq ||
        this.LFUHeap.heap[0].freq === this.LFUHeap.heap[2].freq
      ) {
        let found = null;
        for (let [key, value] of this.LRUDict) {
          if (key === this.LFUHeap.heap[0].key) {
            found = 0;
            break;
          } else if (
            key === this.LFUHeap.heap[1].key &&
            this.LFUHeap.heap[1].freq === this.LFUHeap.heap[0].freq
          ) {
            found = 1;
            break;
          } else if (
            key === this.LFUHeap.heap[2].key &&
            this.LFUHeap.heap[2].freq === this.LFUHeap.heap[0].freq
          ) {
            found = 2;
            break;
          }
        }
        if (found !== 0) {
          this.LFUHeap.swap(found, 0);
        }
      }
      const { key, freq } = this.LFUHeap.extractMin();
      this.LRUDict.delete(key);
    }

    this.LFUHeap.insert({ key: key, freq: 1 });
    this.LRUDict.set(key, { freq: 1, val: value });
  }

  //otherwise add a new one to LFU and LRU
  //LFU insert
  //LRU insert
  //check if we are bigger than max capacity
  //check top of heap, and 2nd to top are the same: iterate through LRU
  //**do i iterate LRU backwards or forwards
  //if second comes first, swap with top
  //delete from LRU and extract min LFU
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

/*NOTES



 LRU cache: map / ordered dict
 LFU cache:

     we put into minheap - take min freq off if it goes over capacity, if min matches min's left child, remove the least recently used(iterate through LRU map and remove the first one that comes)

     we get : gets the val of key, updates its LRU cache and updates freq in minheap





 */
