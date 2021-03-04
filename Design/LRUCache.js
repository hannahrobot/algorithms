/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.maxCapacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    const value = this.cache.get(key);
    this.put(key, value);
    return value;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key);
  }

  this.cache.set(key, value);

  if (this.cache.size > this.maxCapacity) {
    for (let [key, value] of this.cache) {
      this.cache.delete(key);
      break;
    }
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

//do this with just map

//----------------
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this._capacity = capacity;
  this._count = 0;
  this._head = null;
  this._tail = null;
  this._hashTable = {};
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this._hashTable[key]) {
    const { value } = this._hashTable[key];
    const { prev, next } = this._hashTable[key];
    if (prev) {
      prev.next = next;
    }
    if (next) {
      next.prev = prev || next.prev;
    }

    if (this._tail === this._hashTable[key]) {
      this._tail = prev || this._hashTable[key];
    }

    this._hashTable[key].prev = null;
    if (this._head !== this._hashTable[key]) {
      this._hashTable[key].next = this._head;
      this._head.prev = this._hashTable[key];
    }

    this._head = this._hashTable[key];

    return value;
  }

  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this._hashTable[key]) {
    this._hashTable[key].value = value;
    this.get(key);
  } else {
    this._hashTable[key] = { key, value, prev: null, next: null };
    if (this._head) {
      this._head.prev = this._hashTable[key];
      this._hashTable[key].next = this._head;
    }

    this._head = this._hashTable[key];

    if (!this._tail) {
      this._tail = this._hashTable[key];
    }

    this._count += 1;
  }

  if (this._count > this._capacity) {
    let removedKey = this._tail.key;

    if (this._tail.prev) {
      this._tail.prev.next = null;
      this._tail = this._tail.prev;
      this._hashTable[removedKey].prev = null;
    }

    delete this._hashTable[removedKey];

    this._count -= 1;
  }
};

//---------missing: you can dot off the the node to get the key, also: you didnt update value of key with put: it could be a new value
/**
 * @param {number} capacity
 */

const ListNode = function (value, next, prev) {
  this.val = value === undefined ? 0 : value;
  this.next = next === undefined ? null : next;
  this.prev = prev === undefined ? null : prev;
};

const LRUCache = function (capacity) {
  //create linked list of nulls the size of capacity, val 0, next 0
  //keep a hash of the linked list nodes: key value pairs
  //linked list is filled with value as the value ^
  this.maxCapacity = capacity;
  this.capacity = capacity;
  this.hash = new Map();
  this.hashValue = new Map();
  this.pseudoHead = new ListNode();
  this.tail = this.pseudoHead;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.hash.has(key)) {
    return this.hash.get(key).val;
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  //check if the key exists:
  if (this.hash.get(key)) {
    //if it exists:
    let node = this.hash.get(key);
    //remove it from list
    node = node.prev;
    node.next = node.next.next;
    const mruNode = this.hash.get(key);
    //check if removed node is tail
    if (this.tail === mruNode) {
      //if yes, change tail to the node that was prev to it before deleting
      this.tail = node;
    }
    //add removed node to the front of the list
    const next = this.pseudoHead.next;
    this.pseudoHead.next = mruNode;
    mruNode.prev = this.pseudoHead;
    //check if next is null before setting prev
    if (next) {
      mruNode.next = next;
      next.prev = mruNode;
    }

    //if it doesnt exist in the list, we add a new node
  } else {
    //create it
    const newNode = new ListNode(value);
    //hash it both ways
    this.hash.put(key, newNode);
    this.hashValue.put(newNode, key);
    //put it at the front of the list
    const next = this.pseudoHead.next;
    this.pseudoHead.next = newNode;
    newNode.prev = this.pseudoHead;
    //check for if next is null, if it is we dont have to set prev
    if (next) {
      newNode.next = next;
      next.prev = newNode;
    }
    if (this.capacity === 0) {
      //remove tail from hash tables
      const evict = this.tail;
      const key = this.hashValue.get(evict);
      this.hashValue.delete(evict);
      this.hash.delete(key);
      //set tail to its previous value
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      //if this is the first node, its the tail
      if (this.capacity === this.maxCapacity) {
        this.tail = newNode;
      }
      this.capacity--;
    }
  }

  //*******shift the tail somewhere
  //if the put exists, if its the tail, we need to make the tail = tail.prev and delete it
  //if put doesnt exist and capacity === maxcapacity, tail reference becomes new val
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

/*NOTES

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.

int get(int key) Return the value of the key if the key exists, otherwise return -1.

void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.


approach:
  queue
  hash

  hashed DLL

  most recently used is in front, least recently used is at end


  //edge case: if maxcapacity === 0


      //else if it doesnt exist:
      //create a new list node
      //put it at the front of the linked list, it becomes the head, the head prev becomes it
      //add it to the set
      //check capacity, if its 0 take of the end of the list, if not, decrement capacity

*/
