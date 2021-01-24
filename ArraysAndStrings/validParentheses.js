//recursive stack
//time complexity: 0(n)
//space complexity: 0(k(num of recursive calls))

var isValid = function (s) {
  if (!s.length) {
    return true;
  }

  for (let i = 0; i < s.length; i++) {
    if (
      (s[i] === "[" && s[i + 1] === "]") ||
      (s[i] === "(" && s[i + 1] === ")") ||
      (s[i] === "{" && s[i + 1] === "}")
    ) {
      s = s.slice(0, i) + s.slice(i + 2);
      return isValid(s);
    }
  }
  return false;
};

//iterative stack
//time complexity: 0(n)
//space complexity: 0(n)
var isValid = function (s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "[" || s[i] === "(" || s[i] === "{") {
      stack.push(s[i]);
    } else {
      const top = stack[stack.length - 1];
      if (top === "[" && s[i] === "]") {
        stack.pop();
      } else if (top === "(" && s[i] === ")") {
        stack.pop();
      } else if (top === "{" && s[i] === "}") {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length ? false : true;
};

//optimized iterative stack using a hashmap
//time complexity: 0(n)
//space complexity: 0(n)

var isValid = function (s) {
  const stack = [];
  const hashMap = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  const keys = Object.keys(hashMap);

  for (let i = 0; i < s.length; i++) {
    if (keys.includes(s[i])) {
      if (stack[stack.length - 1] === hashMap[s[i]]) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      stack.push(s[i]);
    }
  }

  return stack.length ? false : true;
};
