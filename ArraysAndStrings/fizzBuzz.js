/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  let tmp = 1;
  const res = [];
  while (tmp <= n) {
    if (tmp % 3 === 0 && tmp % 5 === 0) {
      res.push("FizzBuzz");
    } else if (tmp % 3 === 0) {
      res.push("Fizz");
    } else if (tmp % 5 === 0) {
      res.push("Buzz");
    } else {
      res.push(tmp.toString());
    }
    tmp++;
  }
  return res;
};
