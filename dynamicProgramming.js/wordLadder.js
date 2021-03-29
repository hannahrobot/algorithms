//BFS solution

function ladderLength(beginWord, endWord, wordList) {
  const dict = new Set(wordList);
  let step = 1;
  let q = [beginWord];

  while (q.length) {
    const next = [];
    for (let w of q) {
      if (w === endWord) return step;

      for (let i = 0; i < w.length; i++) {
        for (let j = 0; j < 26; j++) {
          const w2 =
            w.slice(0, i) + String.fromCharCode(97 + j) + w.slice(i + 1); // 97 -> 'a'

          if (dict.has(w2)) {
            next.push(w2);
            dict.delete(w2);
          }
        }
      }
    }
    q = next;
    step++;
  }

  return 0;
}

//DFS solution
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const memo = {};

  const DFS = function (currWord, wordSet) {
    //basecase:
    if (!wordSet.length && currWord !== endWord) {
      return Infinity;
    }
    if (currWord === endWord) {
      return 1;
    }

    if (memo[currWord]) {
      return memo[currWord];
    }

    memo[currWord] = Infinity;

    for (let i = 0; i < wordSet.length; i++) {
      let numDifferences = 0;
      for (let j = 0; j < wordSet[i].length; j++) {
        if (currWord[j] !== wordSet[i][j]) {
          numDifferences++;
          if (numDifferences > 1) {
            break;
          }
        }
      }
      if (numDifferences === 1) {
        memo[currWord] = Math.min(
          memo[currWord],
          1 + DFS(wordSet[i], wordSet.slice(0, i).concat(wordSet.slice(i + 1)))
        );
      }
    }

    return memo[currWord];
  };

  const res = DFS(beginWord, wordList);
  return res === Infinity ? 0 : res;
};

/*NOTES

input: beginword, endword, wordlist(doesnt include begin word but includes end word)
output: int: min num of transformations
edge:

ex:

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog" with 5 words.

Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no possible transformation.


approach: brute force: backtracking

  global /outerfunc variables:
      minChanges: int: initialize at infinity

  DFS: function: takes current word, num changes so far, words left (in our innerfunc set)
      basecase:
          if we dont have any words left
              if our current word is the endword, update minchanges with current num changes if its smaller

      recursive case:
          use regex to see if there is a key in our set that matches curr word with one different letter
          if yes:
              save a copy of new key
              delete the new key from our set
              call DFS: pass the new key in as current word, changes + 1, and set

  call DFS with 0 changes, first word, and set with words passed in
  return minChanges === inf ? 0 : minchanges


optimize: memoization / topdown dfs
  global /outerfunc variables:
      memo: obj

  DFS: function: takes current word, num changes so far, words left (in our innerfunc set)
      basecase:
          if we dont have any words left
              if our current word is the endword, return 0

      memo for this index exists?
          return memo

      otherwise create memo for this index with inital value of Infinity

      recursive case:
          use regex to see if there is a key in our set that matches curr word with one different letter
          if yes:
              save a copy of new key
              delete the new key from our set
              memo = min between: memo / 1 + call DFS: pass the new key in as current word, and set
              ^we know each time we call dfs we make a change so we just add it as 1 to our callstack

      return memo at this start index

  save call to DFS: first word, and set with words passed in

  return call to DFS = infinity? return 0 : call to dfs

optimize: bottom up

  dp array size of wordlist + 1

  dp[0] = 1

  outerloop: current word
          inner loop: wordList
              if wordlist with 1 change === current word
                  dp[wordlist index] = last word + dpwordlist index

*/
