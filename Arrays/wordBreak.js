//optimized, top down w/ pruning (store already visited trees in a cache(memoization), store their outcomes)

function wordBreak(s, wordDict) {
  let memo = {};
  function helper(s, wordDict) {
    // base case
    if (wordDict.includes(s)) return true;
    for (let i = 0; i < s.length; i++) {
      if (wordDict.includes(s.substring(0, i))) {
        let word = s.slice(i);
        // Have we seen this word before?
        if (!memo.hasOwnProperty(word)) {
          // Lets store the result of this word for future look up
          memo[word] = helper(s.slice(i), wordDict);
        }
        // keep trying until some combination is valid
        if (memo[word]) return true;
      }
    }
    return false;
  }
  return helper(s, wordDict);
}

///
var wordBreak = function (s, wordDict) {
  const memo = {};
  let start = 0;
  return recursive(start, s, wordDict, memo);
};

var recursive = function (start, s, wordDict, memo) {
  if (start === s.length) {
    return true;
  }
  if (memo[start] !== null) {
    return memo[start];
  }
  for (let end = start + 1; end <= s.length; end++) {
    if (
      wordDict.includes(s.substring(start, end)) &&
      recursive(end, s, wordDict, memo)
    ) {
      return (memo[start] = true);
    }
  }
  return (memo[start] = false);
};

//time complexity: 0(2^n)
//space complexity: 0(n)

//top down (completed to empty)

var wordBreak = function (s, wordDict) {
  if (!s.length) {
    return true;
  }
  wordDict.forEach((word, i) => {
    if (s.startsWith(word) && wordBreak(s.slice(word.length), wordDict)) {
      return true;
    }
  });
  return false;
};

//approach

//recursive helper function
//checks to see if the word starts with any word in the dictionary
//--if so, slice the postfix and call recursively
//--if the word is empty, return true (BASE CASE)
//if the word is not empty, and it doesnt start with any of the words, return false

//questions
//does it have to match all the words in the word dict? no

//bottom up (empty to completed)
