/**
 * @param {string[]} words
 * @return {string[][]}
 */
var wordSquares = function (words) {
  const res = [];

  const getPrefix = function (arr) {
    let prefix = "";
    let j = arr.length;
    for (let i = 0; i < arr.length; i++) {
      prefix += arr[i][j];
    }
    return prefix;
  };

  const DFS = function (arr, prefix) {
    //basecase
    if (arr.length === arr[0].length) {
      res.push([...arr]);
      return;
    }

    //recursive case
    words.forEach((word) => {
      if (word.startsWith(prefix)) {
        arr.push(word);
        DFS(arr, arr.length < 4 ? getPrefix(arr) : "");
        arr.pop(word);
      }
    });
  };

  words.forEach((word) => {
    DFS([word], word[1]);
  });

  return res;
};

//optimized with hash
/**
 * @param {string[]} words
 * @return {string[][]}
 */
var wordSquares = function (words) {
  const res = [];
  const hash = {};

  //hash every prefix
  words.forEach((word) => {
    for (let i = 1; i < word.length; i++) {
      const prefix = word.slice(0, i);
      if (hash[prefix]) {
        hash[prefix].add(word);
      } else {
        hash[prefix] = new Set();
        hash[prefix].add(word);
      }
    }
  });

  const getPrefix = function (arr) {
    let prefix = "";
    let j = arr.length;
    for (let i = 0; i < arr.length; i++) {
      prefix += arr[i][j];
    }
    return prefix;
  };

  const DFS = function (arr, prefix) {
    //basecase
    if (arr.length === words[0].length) {
      res.push([...arr]);
      return;
    }

    if (!hash[prefix]) {
      return;
    }

    //recursive case
    hash[prefix].forEach((word) => {
      arr.push(word);
      DFS(arr, arr.length < word.length ? getPrefix(arr) : "");
      arr.pop();
    });
  };

  words.forEach((word) => {
    DFS([word], word[1]);
  });

  return res;
};
//-------------backtracking with trie
