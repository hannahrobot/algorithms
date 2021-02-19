/**
 * Initialize your data structure here.
 */
var HitCounter = function () {
  this.arr = [];
  this.count = 0;
};

/**
* Record a hit.
      @param timestamp - The current timestamp (in seconds granularity).
* @param {number} timestamp
* @return {void}
*/
HitCounter.prototype.hit = function (timestamp) {
  if (this.arr.length && this.arr[this.arr.length - 1][0] === timestamp) {
    this.arr[this.arr.length - 1][1]++;
  } else {
    this.arr.push([timestamp, 1]);
  }
  this.count++;
};

/**
* Return the number of hits in the past 5 minutes.
      @param timestamp - The current timestamp (in seconds granularity).
* @param {number} timestamp
* @return {number}
*/
HitCounter.prototype.getHits = function (timestamp) {
  while (this.arr.length && this.arr[0][0] <= timestamp - 300) {
    this.count -= this.arr[0][1];
    this.arr.shift();
  }

  return this.count;
};

/**
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */

//---------------------------

/**
 * Initialize your data structure here.
 */
var HitCounter = function () {
  this.arr = [];
};

/**
* Record a hit.
      @param timestamp - The current timestamp (in seconds granularity).
* @param {number} timestamp
* @return {void}
*/
HitCounter.prototype.hit = function (timestamp) {
  this.arr.push(timestamp);
  while (this.arr[0] <= timestamp - 300) {
    this.arr.shift();
  }
};

/**
* Return the number of hits in the past 5 minutes.
      @param timestamp - The current timestamp (in seconds granularity).
* @param {number} timestamp
* @return {number}
*/
HitCounter.prototype.getHits = function (timestamp) {
  while (this.arr[0] <= timestamp - 300) {
    this.arr.shift();
  }

  return this.arr.length;
};

//0(n)
//0(n)

/**
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */

//---------------------------

//brute force

/**
 * Initialize your data structure here.
 */
var HitCounter = function () {
  this.arr = [];
};

/**
* Record a hit.
      @param timestamp - The current timestamp (in seconds granularity).
* @param {number} timestamp
* @return {void}
*/
HitCounter.prototype.hit = function (timestamp) {
  this.arr.push(timestamp);
};

/**
* Return the number of hits in the past 5 minutes.
      @param timestamp - The current timestamp (in seconds granularity).
* @param {number} timestamp
* @return {number}
*/
HitCounter.prototype.getHits = function (timestamp) {
  let i = this.arr.length - 1;

  while (this.arr[i] > timestamp - 300) {
    i--;
  }
  return this.arr.length - i - 1;
};

/**
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */

//time: 0(n)
//space: 0(n)
