//optimized:
//hashmap categorized by 26 char count string
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const hash = {};
  while (strs.length) {
    const word = strs.shift();
    const arr = new Array(26).fill(0);
    for (let i = 0; i < word.length; i++) {
      let subtract = 97;
      arr[word.charCodeAt(i) - 97] += 1;
    }
    const str = arr.join("#");
    if (hash.hasOwnProperty(str)) {
      hash[str].push(word);
    } else {
      hash[str] = [word];
    }
  }

  return Object.keys(hash).map((key) => hash[key]);
};

//brute force

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const hash = {};
  const empty = [];

  while (strs.length) {
    const word = strs.shift();
    let charHash;
    let foundWord = false;

    if (!word.length) {
      empty.push("");
    } else {
      //check for anagrams of the word
      for (let key in hash) {
        let possible = true;
        charHash = Object.assign({}, hash[key].charHash);
        for (let i = 0; i < word.length; i++) {
          if (charHash.hasOwnProperty(word[i])) {
            charHash[word[i]]--;
          } else {
            possible = false;
            break;
          }
        }
        if (possible) {
          const charKeys = Object.keys(charHash);
          if (charKeys.every((key) => charHash[key] === 0)) {
            foundWord = true;
            hash[key].anagrams.push(word);
          }
        }
      }
      //if there are no anagrams, create a hash key for the word
      if (!foundWord) {
        let wordHash = {};
        let wordCount = 0;
        for (let i = 0; i < word.length; i++) {
          wordCount++;
          if (wordHash.hasOwnProperty(word[i])) {
            wordHash[word[i]]++;
          } else {
            wordHash[word[i]] = 1;
          }
        }
        hash[word] = { anagrams: [word], charHash: wordHash };
      }
    }
  }

  const keys = Object.keys(hash);
  const res = keys.map((key) => hash[key].anagrams);

  if (!res.length && !empty.length) {
    return [];
  } else if (!res.length && empty.length) {
    return [empty];
  } else if (res.length && !empty.length) {
    return res;
  } else if (res.length && empty.length) {
    res.push(empty);
    return res;
  }
};
