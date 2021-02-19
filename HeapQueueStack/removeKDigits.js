/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
  if (num.length === k) {
    return "0";
  }

  let stack = [num[0]];

  let i = 1;

  while (i < num.length && k > 0) {
    while (num[i] < stack[stack.length - 1] && stack.length && k > 0) {
      stack.pop();
      k--;
    }
    stack.push(num[i]);
    i++;
  }
  while (i < num.length) {
    stack.push(num[i]);
    i++;
  }
  while (k > 0) {
    stack.pop();
    k--;
  }

  while (stack[0] === "0") {
    stack.shift();
  }

  if (!stack.length) {
    return "0";
  }

  return stack.join("");
};

//input: num as a string, k: int
//output: new number: string
//edge case: if num is the length of k return '0'

//time: 0(n) we will never traverse each node more than twice
//space: 0(n) we build the stack

/*
approaches:

Input: num = "1432219", k = 3
Output: "1219"

greedy with stack

*/
