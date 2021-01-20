//initial solution
//time complexity: 0(1)
//space complexity: 0(n)

/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
  this.forwardArr = [];
  this.url = homepage;
  this.backwardArr = [];
};

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function (url) {
  this.backwardArr.push(this.url);
  this.forwardArr = [];
  this.url = url;
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function (steps) {
  while (steps > 0 && this.backwardArr.length > 0) {
    const back = this.backwardArr.pop();
    this.forwardArr.unshift(this.url);
    this.url = back;
    steps--;
  }
  return this.url;
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function (steps) {
  while (steps > 0 && this.forwardArr.length > 0) {
    const forw = this.forwardArr.shift();
    this.backwardArr.push(this.url);
    this.url = forw;
    steps--;
  }
  return this.url;
};

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */

//should be able to do this with one queue and it will save space complexity

//optimized solution

/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
  this.queue = [homepage];
  this.position = 0;
};

/**
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function (url) {
  this.position++;
  //use splice instead
  this.queue[this.position] = url;
  this.queue = this.queue.slice(0, this.position + 1);
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function (steps) {
  if (steps >= this.position) {
    this.position = 0;
  } else {
    this.position -= steps;
  }

  return this.queue[this.position];
};

/**
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function (steps) {
  if (this.queue.length - this.position <= steps) {
    this.position = this.queue.length - 1;
  } else {
    this.position += steps;
  }
  return this.queue[this.position];
};

/**
 * Your BrowserHistory object will be instantiated and called as such:
 * var obj = new BrowserHistory(homepage)
 * obj.visit(url)
 * var param_2 = obj.back(steps)
 * var param_3 = obj.forward(steps)
 */

//examples

var obj = new BrowserHistory("leetcode");
console.log(obj);
obj.visit("google");
console.log(obj);
obj.visit("facebook");
console.log(obj);
obj.visit("youtube");
console.log(obj);
obj.back(1);
console.log(obj);
obj.back(1);
console.log(obj);
obj.forward(1);
console.log(obj);
obj.visit("linkedin");
console.log(obj);
