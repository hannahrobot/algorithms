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

//recursive
var decodeString = function (s) {
  let res = "";
  let k = 1,
    i = 0;
  while (i < s.length) {
    if (Number.isInteger(+s[i])) {
      let len = 1;
      while (Number.isInteger(+s[i + len])) len++;
      k = parseInt(s.substr(i, len));
      i += len;
    } else if (s[i] === "[") {
      let paren = 1;
      let j = i + 1;
      while (paren) {
        paren += (s[j] === "[") - (s[j] === "]");
        j++;
      }
      res += decodeString(s.substring(i + 1, j - 1)).repeat(k);
      k = 1;
      i = j;
    } else {
      res += s[i].repeat(k);
      k = 1;
      i++;
    }
  }
  return res;
};
