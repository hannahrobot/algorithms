//do this with an aux so theres no change of drawing the same card twice
//removing from aux is 0(1)
//time: 0(n)
//space: 0(n)

var Solution = function (nums) {
  this.original = nums.slice();
  this.array = nums.slice();
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  this.array = this.original.slice();
  return this.array;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  const aux = this.array.slice();

  for (let i = 0; i < this.array.length; i++) {
    const randomIdx = Math.floor(Math.random() * aux.length);
    const temp = aux[randomIdx];
    aux[randomIdx] = aux[aux.length - 1];
    aux[aux.length - 1] = temp;
    const removed = aux.pop();
    this.array[i] = removed;
  }
  delete aux;
  return this.array;
};

//---------------------------
//time: 0(n)
//space: 0(n)

/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.original = nums.slice();
  this.array = nums.slice();
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  this.array = this.original.slice();
  return this.array;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  for (let i = 0; i < this.array.length; i++) {
    const randomIdx = Math.floor(Math.random() * this.array.length);
    const temp = this.array[i];
    this.array[i] = this.array[randomIdx];
    this.array[randomIdx] = temp;
  }
  return this.array;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
