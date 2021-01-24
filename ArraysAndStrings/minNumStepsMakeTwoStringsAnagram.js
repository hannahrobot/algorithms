//time complexity: 0(n)
//space complexity: 0(n)

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var minSteps = function (s, t) {
  const hashMap = {};
  let balanced = 0;

  for (let i = 0; i < s.length; i++) {
    if (hashMap[s[i]]) {
      hashMap[s[i]]++;
    } else {
      hashMap[s[i]] = 1;
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (hashMap[t[i]] && hashMap[t[i]] > 0) {
      hashMap[t[i]]--;
      balanced++;
    }
  }

  return t.length - balanced;
};

//iterate through s - create a hashmap of s chars as keys = values are how often they appear ++

//iterate through t and subtract character if it exists, dont go past 0; if you subtract, count how many you subtract

//the length of t - subtracted val gives answer

/////

//sort and use a stack?
