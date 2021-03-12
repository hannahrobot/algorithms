//two stacks

class FreqStack {
  constructor() {
    this.fmap = new Map();
    this.stack = [];
  }

  push(x) {
    let freq = (this.fmap.get(x) || 0) + 1;
    this.fmap.set(x, freq);
    if (!this.stack[freq]) this.stack[freq] = [x];
    else this.stack[freq].push(x);
  }

  pop() {
    let top = this.stack[this.stack.length - 1],
      x = top.pop();
    if (!top.length) this.stack.pop();
    this.fmap.set(x, this.fmap.get(x) - 1);
    return x;
  }
}

//hashed DLL class
//node class
//MaxHeap class

const Node = function (val, next, prev) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
  this.prev = prev === undefined ? null : prev;
};

const DLL = function () {
  this.pseudoHead = new Node();
  this.pseudoTail = new Node();
  this.hash = new Map();

  //methods:
  //head: returns pseudohead.next
  //tail: returns pseudotail.prev
  //add (adds to beginning of the DLL and adds to hash)
  //remove (removes from DLL and removes from hash by val)
  //get (grabs node from hash by val key)
};

DLL.prototype.head = function () {
  return this.pseudoHead.next;
};

DLL.prototype.tail = function () {
  return this.pseudoTail.prev;
};

DLL.prototype.add = function (val) {
  this.hash.set(val, new Node(val));
  const next = this.pseudoHead.next;
  this.pseudoHead.next = this.hash.get(val);
  this.hash.get(val).prev = this.pseudoHead;
  this.hash.get(val).next = next;
  next.prev = this.hash.get(val);
};

DLL.prototype.remove = function (val) {
  //remove from list
  let node = this.hash.get(val).prev;
  node.next = node.next.next;
  node.next.prev = node;

  //remove from hash
  this.hash.delete(val);
};

DLL.prototype.get = function (val) {
  return this.hash.get(val);
};

const MaxHeapCustom = function () {
  this.heap = [];
};

MaxHeapCustom.prototype.swap = function (indexOne, indexTwo) {
  [this.heap[indexOne], this.heap[indexTwo]] = [
    this.heap[indexTwo],
    this.heap[indexOne],
  ];
};

MaxHeapCustom.prototype.peak = function () {
  return this.heap.length ? this.heap[0] : -1;
};

MaxHeapCustom.prototype.parent = function (index) {
  return Math.floor((index - 1) / 2);
};

MaxHeapCustom.prototype.leftChild = function (index) {
  return index * 2 + 1;
};

MaxHeapCustom.prototype.rightChild = function (index) {
  return index * 2 + 2;
};

MaxHeapCustom.prototype.insert = function (obj) {
  this.heap.push(obj);
  let index = this.heap.length - 1;

  while (index !== 0 && this.heap[index] > this.heap[this.parent(index)]) {
    this.swap(index, this.parent(index));
    index = this.parent(index);
  }
};

MaxHeapCustom.prototype.update = function (val) {
  //find val
  //update freq ++
  //bubble up
};

MaxHeapCustom.prototype.duplicateFrequencies = function (val) {
  if (
    this.heap[0].freq === this.heap[1].freq ||
    this.heap[0].freq === this.heap[2].freq
  ) {
    return true;
  } else {
    return false;
  }
};

MaxHeapCustom.prototype.extractMax = function () {
  const max = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heapify(0);
  return max;
};

MaxHeapCustom.prototype.heapify = function (index) {
  let left = this.leftChild(index);
  let right = this.rightChild(index);
  let biggest = index;

  if (left < this.heap.length && this.heap[left] > this.heap[biggest]) {
    biggest = left;
  }
  if (right < this.heap.length && this.heap[right] > this.heap[biggest]) {
    biggest = right;
  }
  if (index !== biggest) {
    this.swap(index, biggest);
    this.heapify(biggest);
  }
};

var FreqStack = function () {
  this.heap = new MaxHeapCustom();
  this.valHash = new Map();
  this.freqHash = new Map();
};

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
  if (this.valHash.has(val)) {
    //increase the freq in heap
    this.heap.update(val);
    //take out of MRU in old freq
    const DLLHash = this.freqHash.get(this.valHash.get(val));
    DLLHash.remove(val);
    //update freq in valHash
    this.valHash(val).set(val, this.valHash.get(val) + 1);
    //add to new freq
    const newDLLHash = this.freqHash.get(this.valHash.get(val));
    newDLLHash.add(val);
  } else {
    //add to heap
    this.heap.insert(val);
    //add to freq hash 1
    if (this.freqHash.has(1)) {
      const DLLHash = this.freqHash.get(1);
      DLLHash.add(val);
    } else {
      this.freqHash.set(1, new DLL());
      const DLLHash = this.freqHash.get(1);
      DLLHash.add(val);
    }
    //add to val hash
    this.valHash.set(val, 1);
  }
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  if (this.heap.duplicateFrequencies()) {
    const max = this.heap.peak();
    const maxLeft = this.heap.peakLeft();
    const maxRight = this.heap.peakRight();

    //find which comes first in MRU, swap and return
    let DLL = this.freqHash.get(maxLeft.freq);
    let curr = DLL.head();
    while (
      curr.val !== maxLeft.val ||
      curr.val !== maxRight.val ||
      curr.val !== max
    ) {
      curr = curr.next;
    }
    if (curr.val === max.val) {
      return this.heap.extractMax();
    } else if (curr.val === maxLeft.val) {
      this.heap.swap(0, 1);
      return this.heap.extractMax();
    } else if (curr.val === maxRight.val) {
      this.heap.swap(0, 2);
      return this.heap.extractMax();
    }
  }

  const max = this.heap.extractMax();
  const freq = this.valHash.get(max.val);
  if (freq === 1) {
    //delete from valhash, freqhash's dll
    this.valHash.delete(max.val);
    const DLL = this.freqHash.get(1);
    DLL.remove(max.val);
    return max.val;
  } else {
    //change freq in valhash, switch placement in freqhash, insert with new freq back into heap
    this.valHash.set(max.val, this.valHash.get(max.val) - 1);
    const DLL = this.freqHash.get(max.freq);
    DLL.remove(max.val);
    const newDLL = this.freqHash.get(this.valHash.get(max.val));
    newDLL.add(max.val);
    this.heap.insert({ freq: this.valHash.get(max.val), val: max.val });
    return max.val;
  }
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

/*

input:
output:
edge:

ex:


approach:

maxheap
  push: find out if value exists, if it does: we find it - increment it
  if it doesnt exist, we add it, heapify

  pop: extract max

  *have to also implement a lru map hash so we know which came most recently incase theres a tie

-------------

freq hash: MRU DLL: (ordered by most recently used) (if it was LRU we could do ordered dict)

-----

val maxheap: ordered by freq

val hashmap: tracks which vals exist in heap

freq hash: (MRU dll of vals with this freq)

push: if val exists in valhashmap: find val in max heap and increment freq: delete it from old freq lru in hash and add it to new freq lru in hash
if it doesnt exist in valhashmap: push to maxheap and add it to hashmap freq 1 MRU

pop: check if the peak is MRU in freqhash, if not, swap with child that is and take that child off

-----
theres a way to do this with 3 hashmaps



-----
quick select with a pivot

*/
