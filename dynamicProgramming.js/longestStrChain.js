/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
  let longestChain = 0;
  const memo = {};

  words.sort((a, b) => a.length - b.length);

  const DFS = function (index) {
    //basecase
    if (index === words.length - 1) {
      return 1;
    }

    //we've already visited this recursion branch
    if (memo[words[index]]) {
      return memo[words[index]];
    }

    memo[words[index]] = 0;

    //recursivecase
    for (let i = index + 1; i < words.length; i++) {
      const curr = words[i];
      for (let j = 0; j < curr.length; j++) {
        const sliced = curr.slice(0, j) + curr.slice(j + 1);
        if (sliced === words[index]) {
          memo[words[index]] = Math.max(DFS(i), memo[words[index]]);
        }
      }
    }

    return memo[words[index]] + 1;
  };

  words.forEach((word, i) => {
    longestChain = Math.max(DFS(i), longestChain);
  });

  return longestChain;
};

//------------- no sort
/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
  let longestChain = 0;
  const memo = {};

  const DFS = function (word) {
    //we've already visited this recursion branch
    if (memo[word]) {
      return memo[word];
    }

    memo[word] = 1;

    //recursivecase
    for (let i = 0; i < words.length; i++) {
      const curr = words[i];
      if (curr !== word) {
        for (let j = 0; j < curr.length; j++) {
          const sliced = curr.slice(0, j) + curr.slice(j + 1);
          if (sliced === word) {
            memo[word] = Math.max(1 + DFS(curr), memo[word]);
          }
        }
      }
    }

    return memo[word];
  };

  words.forEach((word, i) => {
    longestChain = Math.max(DFS(word), longestChain);
  });

  return longestChain;
};

/*
vars:
longestChain
const memo = {}

iterate through words
  longestChain = Math.max(1 + DFS(index), longestChain)

return longestChain

DFS(index){
  baseCase:
      if index === words.length
          return 0

  if(memo[words[index]]) {
      return memo[words[index]]
  }

  memo[words[index]] = 0

  recursiveCase:
      iterate through words starting from index
          iterate through chars in words[index]
              if currword.slice(0,j) + currword.slice(j) === words[index]
                  memo[words[index]] = Math.max(DFS(i+1), memo[words[index]])

  return memo[words[index]] + 1


}

time: 0(length^2)
space: 0(longestchain) <== recursion stack height

*/

/*

word chain doesnt have to be contiguous

need to find it a single letter was inserted between prev and next word

are words ordered by length? so it could only be part of one of the words in the increasing path? / following

dynamic programming problem:


top down / backtracking solution

vars:
longestChain

iterate through words
  DFS(index, 1)


DFS(index, chain){
  baseCase:
      if index === words.length
          longestChain = Math.max(chain, longestChain)

  recursiveCase:
      iterate through words starting from index
          iterate through chars in words[index]
              if currword.slice(0,j) + currword.slice(j) === words[index]
                  DFS(i+1, chain + 1)


optimized top down / memoization (pruning the backtracking recursion tree)


vars:
longestChain
const memo = {}

iterate through words
  longestChain = Math.max(1 + DFS(index, 1), longestChain)

return longestChain

DFS(index){
  baseCase:
      if index === words.length
          return 0

  if(memo[words[index]]) {
      return memo[words[index]]
  }

  memo[words[index]] = 0

  recursiveCase:
      iterate through words starting from index
          iterate through chars in words[index]
              if currword.slice(0,j) + currword.slice(j) === words[index]
                  memo[words[index]] = Math.max(DFS(i+1), memo[words[index]])

  return memo[words[index]] + 1


}


*/

//BOTTOM UP DP

/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
  const dp = {};
  words.sort((a, b) => a.length - b.length);
  let longestChain = 1;

  words.forEach((word, i) => {
    let presentLength = 1;
    for (let i = 0; i < word.length; i++) {
      const temp = word.slice(0, i) + word.slice(i + 1);
      const prevLength = dp[temp] ? dp[temp] : 0;
      presentLength = Math.max(presentLength, prevLength + 1);
    }
    dp[word] = presentLength;
    longestChain = Math.max(longestChain, presentLength);
  });

  return longestChain;
};
