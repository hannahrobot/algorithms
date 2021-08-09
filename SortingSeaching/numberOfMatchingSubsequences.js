/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
  let subs = 0;
  const bucket = new Array(26).fill(null);

  for (let i = 0; i < s.length; i++) {
    if (bucket[s.charCodeAt(i) - 97]) {
      bucket[s.charCodeAt(i) - 97].push(i);
    } else {
      bucket[s.charCodeAt(i) - 97] = [i];
    }
  }

  words.forEach((word) => {
    let j = 0;
    let lastIndex = -Infinity;
    let foundIndex = bucket[word.charCodeAt(j) - 97]
      ? bucket[word.charCodeAt(j) - 97].find((el) => el > lastIndex)
      : undefined;
    while (j < word.length && foundIndex !== undefined) {
      lastIndex = foundIndex;
      j++;
      foundIndex =
        j < word.length && bucket[word.charCodeAt(j) - 97]
          ? bucket[word.charCodeAt(j) - 97].find((el) => el > lastIndex)
          : undefined;
    }
    if (j === word.length) {
      subs++;
    }
  });

  return subs;
};

/*
given s and words

return the number of words that are a subsequence of s

approach

put s chars into a bucket based on their char (26 length), [i] (or push i)

*bucket arrays will always be in sorted order of index because we are pushing i chronologically

subs = 0

iterate through words
  for each word:
      j iterates through chars in word
          lastIndex(smallest index thats greater than last) = -Infinity
          while(j < word.length & bucket[word[j]] has an index greater thanLast)
              lastIndex = bucket[word[j]].find(el => el > lastIndex) //finds lowest el meeting condition
              j++

          if j === word.length
              subs ++


return subs

*/
