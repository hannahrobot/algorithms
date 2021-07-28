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

var decodeString = function (s) {
  let string = "";
  const numRegex = /[0-9]/;
  const letterRegex = /[a-z]/;

  for (let i = 0; i < s.length; i++) {
    const curr = s[i];
    if (curr === "]") {
      return string;
    } else if (numRegex.test(curr)) {
      let num = curr.toString();
      while (i < s.length - 1 && numRegex.test(s[i + 1])) {
        i++;
        num += s[i].toString();
      }
      const str = decodeString(s.slice(i)).repeat(parseInt(num));
      string += str;
    } else if (letterRegex.test(curr)) {
      string += curr;
    }
  }

  return string;
};
