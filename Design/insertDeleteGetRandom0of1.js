/**
 * Initialize your data structure here.
 */
var RandomizedSet = function () {
  this.array = [];
  this.hash = {};
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.hash[val]) {
    return false;
  } else {
    this.array.push(val);
    this.hash[val] = this.array.length - 1;
    return true;
  }
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (this.hash[val]) {
    //get index of value to delete
    const index = this.hash[val];
    //delete value from hash table
    delete this.hash[val];
    //replace value in array with last item in array
    this.array[index] = this.array[this.array.length - 1];
    //delete last item in array
    this.array.pop();
    //update index for value that replaced deleted value in hash
    this.hash[this.array[index]] = index;
    return true;
  } else {
    return false;
  }
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  return this.array[Math.floor(Math.random() * this.array.length)];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
