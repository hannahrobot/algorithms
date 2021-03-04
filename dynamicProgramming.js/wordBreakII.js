//bottom up iterative focuses on adding prefix

//dfs with memoization focuses on adding postfix

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  const memo = {};
  const set = new Set(wordDict);

  const DFS = function (start) {
    if (start >= s.length) {
      return [[]];
    }

    if (memo[start]) {
      return memo[start];
    }

    memo[start] = [];

    let tempString = "";

    for (let i = start; i < s.length; i++) {
      tempString += s[i];
      if (set.has(tempString)) {
        const next = DFS(i + 1);
        for (let n of next) {
          memo[start].push([tempString, ...n]);
        }
      }
    }

    return memo[start];
  };

  return DFS(0).map((arr) => arr.join(" "));
};

//backtracking

const wordBreak = function (s, wordDict) {
  const hash = new Set();
  const result = [];

  for (let i = 0; i < wordDict.length; i++) {
    hash.add(wordDict[i]);
  }

  const DFS = function (i, path) {
    //base case
    if (i === s.length) {
      result.push(path);
      return;
    }

    //recursive case
    let tempString = "";
    for (let j = i; j < s.length; j++) {
      tempString += s[j];
      if (hash.has(tempString)) {
        DFS(j + 1, path.length ? path + " " + tempString : tempString);
      }
    }
  };

  DFS(0, "");

  return result;
};
/*NOTES

input: string: s; wordDict: array of words: strings
output: array of all possible complete breaks of s with word dict words: words may used multiple times: no duplicate words
edge: s is empty: return [''], word dict is empty: return string

ex:
Input:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
Output:
[
"cats and dog",
"cat sand dog"
]

Input:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
Output:
[
"pine apple pen apple",
"pineapple pen apple",
"pine applepen apple"
]
Explanation: Note that you are allowed to reuse a dictionary word.

approach: topdown! backtracking, brute force

  variables:
      hash
      result array

  iterate through s and hash
      word dictionary for easy access

  we call out helper func at (0, '')

  we have a helper function that takes i and path(string)

      basecase:
      it checks if i is === to length of s, if so, we push our path to result

      variables:
          temp string - ''
      we have a loop (j) that starts at i
          adds j to temp string
          checks if the word between i and j matches a dictionary word
              if yes: call dfs on j+1, path + word (if path is empty, no space ahead, if its occupied, space ahead)

  return result


  ^this will work but the time will be bad
  time: 0(n^2 + 2^n + w)
  space: 0(2^n*n + w)

  const wordBreak = function(s, wordDict) {

  const hash = new Set()
  const result = []

  for(let i = 0; i < wordDict.length; i ++) {
      hash.add(wordDict[i])
  }

  const DFS = function(i, path) {

      //base case
      if(i === s.length){
          result.push(path)
          return
      }

      //recursive case
      let tempString = ''
      for(let j = i; j < s.length; j ++){
          tempString += s[j]
          if(hash.has(tempString)){
              DFS(j+1, path.length ? path + ' ' + tempString : tempString)
          }
      }

  }

  DFS(0, '')

  return result

};

-----------------------------------

approach: topdown with memoization

  in this approach, we return all possibilities from a path in the recursion basecase, and we memoize additional possibilities at each call, at each recursive call, we add the possibilities


  variables:
      hash
      result array
      memo

  iterate through s and hash
      word dictionary for easy access


  we have a helper function that takes i and path(string)

      basecase:
      it checks if i is === to length of s, if so, we return our path

      check if we have memo[i]
          return memo[i]


      variables:
          memo[i] = []
          temp string - ''
      we have a loop (j) that starts at i
          adds j to temp string
          checks if the word between i and j matches a dictionary word

              if yes:
              memo[i].push(dfs on j+1, path + word (if path is empty, no space ahead, if its occupied, space ahead))


      return memo[i]


  return helper func at (0, '')


----------------------------------
approach: bottom up


*/
