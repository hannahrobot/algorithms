//hashmap and queue

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.leastUsedQueue = [];
  this.currentlyUsedTimes = new Array(3000).fill(0);
  this.capacity = capacity;
  this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let result = -1;
  let value = this.map.get(key);
  if (value !== undefined) {
    this.currentlyUsedTimes[key]++;
    this.leastUsedQueue.push(key);
    result = value;
  }
  return result;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (!this.map.has(key)) {
    if (this.map.size >= this.capacity) {
      this.removeLRU();
    }
  }
  this.currentlyUsedTimes[key]++;
  this.leastUsedQueue.push(key);
  this.map.set(key, value);
};

LRUCache.prototype.removeLRU = function () {
  let LRU = this.leastUsedQueue[0];

  while (this.currentlyUsedTimes[LRU] > 1) {
    this.currentlyUsedTimes[LRU]--;
    this.leastUsedQueue.shift();
    LRU = this.leastUsedQueue[0];
  }
  this.currentlyUsedTimes[LRU] = 0;
  this.leastUsedQueue.shift();
  this.map.delete(LRU);
};

//hashmap and doubly linked list

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cacheMap = {};
  this.cacheRequestList = new DoubleLinkedListForLRU(capacity);
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.cacheMap.hasOwnProperty(key)) {
    let node = this.cacheMap[key];
    node.moveMeToFirst(this.cacheRequestList.head);
    return node.val;
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
  if (!this.cacheMap.hasOwnProperty(key)) {
    let node = new DoubleLinkedNodeForLRU(null, key, value, null);
    this.cacheMap[key] = node;
    let removedKey = this.cacheRequestList.newItemAdd(node);

    if (removedKey) {
      delete this.cacheMap[removedKey];
    }
  } else {
    // replace the value
    let node = this.cacheMap[key];
    node.val = value;
    node.moveMeToFirst(this.cacheRequestList.head);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

class DoubleLinkedNodeForLRU {
  prev = null;
  key = null;
  val = null;
  next = null;

  constructor(prev = null, key = null, val = null, next = null) {
    this.prev = prev;
    this.key = key;
    this.val = val;
    this.next = next;
  }

  moveMeToFirst(head) {
    // remove from current position
    this.prev.next = this.next;
    this.next.prev = this.prev;

    // intermediate state
    this.prev = head;
    this.next = head.next;

    // insert
    head.next.prev = this;
    head.next = this;
  }
}

class DoubleLinkedListForLRU {
  head = new DoubleLinkedNodeForLRU();
  tail = new DoubleLinkedNodeForLRU();
  count = 0;
  capacity = 1;

  constructor(capacity = 1) {
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  newItemAdd(node) {
    node.prev = this.head;
    node.next = this.head.next;

    // insert
    this.head.next.prev = node;
    this.head.next = node;
    this.count++;

    if (this.count > this.capacity) {
      // remove one from the tail
      let removeNode = this.tail.prev;
      removeNode.prev.next = this.tail;
      this.tail.prev = removeNode.prev;
      removeNode.prev = null;
      removeNode.next = null;
      this.count--;

      return removeNode.key;
    }

    return null;
  }
}
