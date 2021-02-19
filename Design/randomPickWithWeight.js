//binary search with prefix sums
/**
 * @param {number[]} w
 */
var Solution = function (w) {
  this.prefixSums = new Array(w.length);
  let prefixSum = 0;
  for (let i = 0; i < w.length; i++) {
    prefixSum += w[i];
    this.prefixSums[i] = prefixSum;
  }
  this.totalSum = prefixSum;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  if (this.prefixSums.length === 1) {
    return 0;
  }

  const rdm = Math.floor(Math.random() * this.totalSum + 1);

  return this.binarySearch(rdm, 0, this.prefixSums.length);
};

Solution.prototype.binarySearch = function (rdm, left, right) {
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (rdm > this.prefixSums[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */

//-------------------------------------
//linear search with prefix sums
//time: 0(n)
//space: 0(n)

/**
 * @param {number[]} w
 */
var Solution = function (w) {
  this.prefixSums = new Array(w.length);
  let prefixSum = 0;
  for (let i = 0; i < w.length; i++) {
    prefixSum += w[i];
    this.prefixSums[i] = prefixSum;
  }
  this.totalSum = prefixSum;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  const rdm = Math.floor(Math.random() * this.totalSum + 1);
  for (let i = 0; i < this.prefixSums.length; i++) {
    if (this.prefixSums[i] >= rdm) {
      return i;
    }
  }
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
