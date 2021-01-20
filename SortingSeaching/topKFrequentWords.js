var topKFrequent = function (words, k) {
  //hashmap
  const hashmap = {};
  //iterate over words
  for (let i = 0; i < words.length; i++) {
    if (hashmap.hasOwnProperty(words[i])) {
      hashmap[words[i]]++;
    } else {
      hashmap[words[i]] = 1;
    }
  }
  const res = Object.keys(hashmap).sort((a, b) => {
    if (hashmap[a] > hashmap[b]) {
      return -1;
    } else if (hashmap[a] < hashmap[b]) {
      return 1;
    } else if (hashmap[a] === hashmap[b]) {
      if (a < b) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  return res.splice(0, k);
};
