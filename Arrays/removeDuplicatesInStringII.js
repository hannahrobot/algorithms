//brute force
//time complexity: 0(n^2/k)
//space complexity: 0(1)

var removeDuplicates = function (s, k) {
  let length = s.length - 1;
  while (length !== s.length) {
    length = s.length;
    for (let i = 0; i < s.length; i++) {
      if (i === 0 || s[i] !== s[i - 1]) {
        count = 1;
      } else if (count === k) {
        s = s.slice(0, i - k + 1) + s.slice(i - k + 1 + k);
        break;
      }
      count++;
    }
  }
  return s;
};

//optimized
//time complexity: 0(n)
//space complexity: 0(n)
var removeDuplicates = function (s, k) {
  let counts = new Array(s.length).fill(0);
  for (let i = 0; i < s.length; i++) {
    if (i === 0 || s[i] !== s[i - 1]) {
      counts[i] = 1;
    } else {
      counts[i] = counts[i - 1] + 1;
      if (counts[i] === k) {
        s = s.slice(0, i - k + 1) + s.slice(i - k + 1 + k);
        i = i - k;
      }
    }
  }

  return s;
};

//stack
//time complexity: 0(n)
//space complexity: 0(n)
var removeDuplicates = function (s, k) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (i === 0 || s[i] !== s[i - 1]) {
      stack.push(1);
    } else if (++stack[stack.length - 1] === k) {
      s = s.slice(0, i - k + 1) + s.slice(i - k + 1 + k);
      i = i - k;
      stack.pop();
    }
  }
  return s;
};

//stack combined nums and letterss

removeDuplicates = (s, k) => {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    if (!stack.length) {
      stack.push([s[i], 1]);
      continue;
    }
    if (s[i] === stack[stack.length - 1][0]) {
      // console.log('i match')
      let currentCount = stack[stack.length - 1][1];
      if (currentCount < k - 1) {
        stack[stack.length - 1][1]++;
      } else if (currentCount === k - 1) {
        stack.pop();
        // console.log('pop me')
        continue;
      }
    }
    if (s[i] !== stack[stack.length - 1][0]) {
      stack.push([s[i], 1]);
    }
  }

  // helper function
  reString = (stack) => {
    let result = "";
    stack.map((el) => {
      let letterString = el[0].repeat(el[1]);
      result += letterString;
    });
    return result;
  };

  return reString(stack);
};

console.log(removeDuplicates("abcd", 2));
console.log(removeDuplicates("deeedbbcccbdaa", 3));
console.log(removeDuplicates("pbbcggttciiippooaais", 2));
