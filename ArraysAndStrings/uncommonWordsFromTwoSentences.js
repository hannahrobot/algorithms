/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  const s1Hash = {};
  const s2Hash = {};
  const output = [];

  s1.split(" ").forEach((word) => {
    if (!s1Hash[word]) {
      s1Hash[word] = 1;
    } else {
      s1Hash[word]++;
    }
  });

  s2.split(" ").forEach((word) => {
    if (!s2Hash[word]) {
      s2Hash[word] = 1;
    } else {
      s2Hash[word]++;
    }
  });

  for (let key in s1Hash) {
    if (s1Hash[key] === 1) {
      if (!s2Hash[key]) {
        output.push(key);
      }
    }
  }

  for (let key in s2Hash) {
    if (s2Hash[key] === 1) {
      if (!s1Hash[key]) {
        output.push(key);
      }
    }
  }

  return output;
};

/*

a word is uncommon if it appears once in one sentence and doesnt appear in the other


hash word counts of s1
hash word counts of s2

iterate through words that appear once in s1
  if word doesnt appear in s2 hash, add it to output

iterate through words that appear once in s2
  if word doesnt appear in s1 hash, add it to output

return output

*/
