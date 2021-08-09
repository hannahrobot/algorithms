/**
 * @param {number[]} encoding
 */
var RLEIterator = function (encoding) {
  this.index = 0;
  this.encoding = encoding;
};

RLEIterator.prototype.next = function (n) {
  while (n > 0 && this.index < this.encoding.length) {
    const count = this.encoding[this.index];
    const num = this.encoding[this.index + 1];

    if (count < n) {
      n -= count;
      this.index += 2;
    } else {
      this.encoding[this.index] = count - n;
      return num;
    }
  }

  return -1;
};
