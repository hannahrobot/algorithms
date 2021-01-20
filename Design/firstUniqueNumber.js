//linked hashset allows for removals from the middle of the queue in o(1)
//most optimized
//cant do linked hashset with js ? there were no solutions for it

//time complexity: 0(k) (k being the initial array length passed to the constructor)
//space complexity: 0(n)

//no point in adding nums that we already know are duplicates, we add nums to the q that arent duplicates
//we find the first element that has a count of 1 in the hash table

/**
 * @param {number[]} nums
 */
var FirstUnique = function (nums) {
  this.hash = {};
  this.queue = nums.filter((value, i) => {
    if (this.hash.hasOwnProperty(value)) {
      this.hash[value]++;
    } else {
      this.hash[value] = 1;
      return value;
    }
  });
};

/**
 * @return {number}
 */
FirstUnique.prototype.showFirstUnique = function () {
  const val = this.queue.find((el) => this.hash[el] === 1);
  return val ? val : -1;
};

/**
 * @param {number} value
 * @return {void}
 */
FirstUnique.prototype.add = function (value) {
  if (this.hash.hasOwnProperty(value)) {
    this.hash[value]++;
  } else {
    this.queue.push(value);
    this.hash[value] = 1;
  }
};
