//time complexity: o(n2)
//space complexity: o(n) - based on seen hashtable

//brute

var lengthOfLongestSubstring = function (s) {
  let max = 1;
  if (s.length === 0) {
    return 0;
  }
  for (let i = 0; i < s.length && max < s.length - i; i++) {
    const seen = {};
    seen[s[i]] = i;
    for (let j = i + 1; j < s.length; j++) {
      if (!seen.hasOwnProperty(s[j])) {
        max = Math.max(max, j + 1 - i);
        seen[s[j]] = j;
      } else {
        break;
      }
    }
  }
  return max;
};

//sliding window
var lengthOfLongestSubstring = function (s) {
  const hash = {};
  let max = 0;
  let i = 0;
  let j = 0;
  while (j < s.length && i < s.length) {
    if (!hash.hasOwnProperty(s[j])) {
      hash[s[j++]] = j;
      max = Math.max(max, j - i);
    } else {
      delete hash[s[i++]];
    }
  }
  return max;
};
