//time complexity = o(n)
//space complexity = o(n)

//use array
var firstUniqChar = function (s) {
  const hash = {};
  for (let i = 0; i < s.length; i++) {
    if (hash.hasOwnProperty(s[i])) {
      hash[s[i]].push(i);
    } else {
      hash[s[i]] = [i];
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (hash[s[i]].length === 1) {
      return i;
    }
  }
  return -1;
};

//use boolean
var firstUniqChar = function (s) {
  const hash = {};
  for (let i = 0; i < s.length; i++) {
    if (hash.hasOwnProperty(s[i])) {
      hash[s[i]] = false;
    } else {
      hash[s[i]] = true;
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (hash[s[i]]) {
      return i;
    }
  }
  return -1;
};

//nums
//optomized
//best option for improved 0(1) space complexity
var firstUniqChar = function (s) {
  const hash = {};
  for (let i = 0; i < s.length; i++) {
    if (hash.hasOwnProperty(s[i])) {
      hash[s[i]]++;
    } else {
      hash[s[i]] = 1;
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (hash[s[i]] === 1) {
      return i;
    }
  }
  return -1;
};
