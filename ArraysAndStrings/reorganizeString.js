/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function (S) {
  const hashMap = {};
  let newString = "";

  for (let i = 0; i < S.length; i++) {
    if (hashMap.hasOwnProperty(S[i])) {
      hashMap[S[i]]++;
      if (hashMap[S[i]] > (S.length + 1) / 2) {
        return "";
      }
    } else {
      hashMap[S[i]] = 1;
    }
  }

  const sorted = S.split("").sort((a, b) => hashMap[a] - hashMap[b]);

  for (let i = 0; i < Math.floor(sorted.length / 2); i + 2) {
    for (let j = Math.floor(sorted.length / 2); i < sorted.length; j + 2) {
      [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
    }
  }

  return sorted.join("");
};
