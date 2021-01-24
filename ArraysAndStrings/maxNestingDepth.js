//optimized
//we dont neet a stack we just need a count ++ or --, save space
/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  let max = 0;
  let currDepth = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      currDepth++;
      max = Math.max(max, currDepth);
    }
    if (s[i] === ")") {
      currDepth--;
    }
  }

  return max;
};

//time complexity: 0(n)
//space complexity: 0(1)

//----------------------------------------------

/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  let max = 0;
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(s[i]);
      max = Math.max(max, stack.length);
    }
    if (s[i] === ")") {
      stack.pop();
    }
  }

  return max;
};

//time complexity: 0(n)
//space complexity: 0(n)

//input: string
//output: integer, depth levels parenthesis

//valid if:
//it is empty str, depth 0
//(0) = 0 depth
//((0)) = 1 depth

//clarification
//it will always be valid
//characters: 0-9, +, -, *, /, (, )
//^ mathematical operators and parenthesis

//edge cases:
//

//approach:
//use a stack
//call math max length on the stack at each addition
//if we hit a closing bracket we pop off the stack
//return the max

//variables:
//maxDepth:

//structures:
//stack

//iteration:
//is it a opening backet? push to stack
//mathMax length of stack
//is it a closing bracket? pop stack
//stop when we reach end of string
//return the max

//EG:
//stack:
//(

//string:
//"(1+(2*3)+((8)/4))+1"
