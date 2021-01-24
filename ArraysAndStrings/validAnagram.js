//time complexity: o(n)
//space complexity: o(n)

var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const S = s
    .split("")
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .toString();
  const T = t
    .split("")
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .toString();
  return S === T;
};

//time complexity: o(n)
//space complexity: o(n);

var isAnagram = function (s, t) {
  const hash = {};

  if (s.length !== t.length) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    if (hash.hasOwnProperty(s[i])) {
      hash[s[i]].push(false);
    } else {
      hash[s[i]] = [false];
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (hash.hasOwnProperty(t[i])) {
      const index = hash[t[i]].indexOf(false);
      if (index !== -1) {
        hash[t[i]][index] = true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};

//counter table

var isAnagram = function (s, t) {
  const table = new Array(26).fill(0);

  if (s.length !== t.length) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    //97 is the code for a, if we subtract 97 from a, we get index 0, and so on
    table[s.charCodeAt(i) - 97]++;
  }
  for (let i = 0; i < t.length; i++) {
    table[t.charCodeAt(i) - 97]--;
    if (table[t.charCodeAt(i) - 97] < 0) {
      return false;
    }
  }
  return true;
};
