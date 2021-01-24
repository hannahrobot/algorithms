/**
 * @param {string} s
 * @return {string}
 */
function decodeString(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "]") {
      let decodedString = "";
      // get the encoded string
      while (stack[stack.length - 1] !== "[") {
        decodedString += stack[stack.length - 1];
        stack.pop();
      }
      // pop [ from stack
      stack.pop();
      let base = 1;
      let k = 0;
      // get the number k
      while (stack.length && /[0-9]/.test(stack[stack.length - 1])) {
        k = k + (stack[stack.length - 1] - "0") * base;
        stack.pop();
        base *= 10;
      }
      let currentLen = decodedString.length;
      // decode k[decodedString], by pushing decodedString k times into stack
      while (k !== 0) {
        for (let j = decodedString.length - 1; j >= 0; j--) {
          stack.push(decodedString[j]);
        }
        k--;
      }
    }

    // push the current character to stack
    else {
      stack.push(s[i]);
    }
  }

  // get the result from stack
  let result = "";
  for (let i = 0; i < stack.length; i++) {
    result += stack[i];
  }
  return result;
}

////two stacks

var decodeString = function (s) {
  const strStack = [],
    numStack = [];
  let result = "";

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (/\d+/.test(c)) {
      const [num] = s.slice(i).match(/\d+/);
      i += num.length - 1;
      numStack.push(+num);
      continue;
    }
    if (c === "[") strStack.push("");
    if (/[a-z]/.test(c)) {
      if (!strStack.length) result += c;
      else {
        let str = strStack.pop();
        strStack.push(str + c);
      }
    }
    if (c === "]") {
      const str = strStack.pop();
      const num = numStack.pop();
      const newStr = str.repeat(num);
      if (!strStack.length) result += newStr;
      else {
        let prev = strStack.pop();
        strStack.push(prev + newStr);
      }
    }
  }
  return result;
};

//examples

// '3[a]2[bc]'

// '3[a2[bc[4[c]]]]'

// '3[a2[cb]]'

// "2[abc]3[cd]ef"

// "abc3[cd]xyz"

//approaches
//stack

// iterate over the sting

// if i hit a closing bracket:
//     save the index following the closing backet
//     letter on the stack pop off
//         keep going back
//         the first opening bracket after iterating backover the number
//             will signify that i can take that numner and multiply the letters by it
//             and make that my updated string
//     while(index >=0)
//     keep iterating back, appending letters to the front of my string
//     when i hit a number, multiply string by that number
//     push the string back on the stack
//     put the index back to after the closing bracket

// else:
// keep adding each item to the stack

// return string
