/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const res = new Set();
  const visited = new Set();
  const wordHash = {};

  words.forEach((word) => {
    if (wordHash[word[0]]) {
      wordHash[word[0]].push(word);
    } else {
      wordHash[word[0]] = [word];
    }
  });

  const DFS = function (i, j, word, k) {
    //valid basecase
    if (k === word.length) {
      res.add(word);
    }

    //invalid basecase
    if (
      visited.has(`${i}|${j}`) ||
      i < 0 ||
      i >= board.length ||
      j < 0 ||
      j >= board[0].length ||
      board[i][j] !== word[k]
    ) {
      return;
    }

    visited.add(`${i}|${j}`);

    //recursive case
    DFS(i + 1, j, word, k + 1);
    DFS(i - 1, j, word, k + 1);
    DFS(i, j + 1, word, k + 1);
    DFS(i, j - 1, word, k + 1);

    visited.delete(`${i}|${j}`);
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (wordHash[board[i][j]]) {
        wordHash[board[i][j]].forEach((word) => DFS(i, j, word, 0));
      }
    }
  }

  return Array.from(res);
};

/*
given arr of strings, return arr of strings that exist on the board, if none return []

q's: could the board have the same word multiple times?


iterate over the board with a nested for loop
at each iteration, call dfs

DFS: i, j, word, k



//basecase

*valid
if k is === word.length
  add word to res set

*invalid
if i or j are out of bounds, or if board[i][j] doesnt equal word[k]
  stop recursing



//recursive case
  go left, right, down, up

  dfs: i + 1, j, word, k + 1
  ...
  ...
  ...


return arrayfrom(res)

*/

//----- optimized with trie

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const Trie = function () {
  this.root = new Map();
};

Trie.prototype.insert = function (word) {
  let curr = this.root;

  //iterate through word
  //for each letter, check if curr node has a child for that letter, if so, update current to that letter, if not, create a new branch for that letter
  for (let i = 0; i < word.length; i++) {
    if (!curr.has(word[i])) {
      curr.set(word[i], new Map());
    }
    curr = curr.get(word[i]);
  }

  //add a null child to curr to signify that we have ended a word
  curr.set("#", null);
};

var findWords = function (board, words) {
  const trie = new Trie();
  const res = new Set();
  const visited = new Set();

  //add words to trie
  words.forEach((word) => trie.insert(word));

  const DFS = function (i, j, curr, path) {
    //basecase: invalid
    //if its out of bounds or curr doesnt have, return
    if (
      i < 0 ||
      i >= board.length ||
      j < 0 ||
      j >= board[0].length ||
      !curr.has(board[i][j]) ||
      visited.has(`${i}|${j}`)
    ) {
      return;
    }

    visited.add(`${i}|${j}`);
    path += board[i][j];
    curr = curr.get(board[i][j]);

    //basecase: valid
    if (curr.has("#")) {
      res.add(path);
    }

    //recursive case
    DFS(i + 1, j, curr, path);
    DFS(i - 1, j, curr, path);
    DFS(i, j + 1, curr, path);
    DFS(i, j - 1, curr, path);

    visited.delete(`${i}|${j}`);
  };

  //iterate through board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      DFS(i, j, trie.root, "");
    }
  }

  return Array.from(res);
};

/*
Trie solution:

const res = []

create a trie class
  insert
  hasPrefix?
  hasWord?

  trie:
      trie: map
              {a: next letters in a map (each of the next letters are init with map)}


build out trie with words
  iterate through words
      for each word, insert into trie


iterate through board
  if Trie.hasPrefix(board[i][j])
  call DFS(i, j, trieRoot)


DFS: i, j, trieNode, wordPath

///basecases
  if trieNode !not have i, j on its children OR we are out of bounds on the board
      return;

  if(trieNode has i j and its the end of a word){
      res.push word path
      return;
  }

  trieNodeChild = trieNode.get(board[i][j])

//recursive case
  left: DFS(i, j-1, trieNodeChild, wordPath + board[i][j])
  right: ...
  up: ...
  down: ...


*/

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const Trie = function () {
  this.root = new Map();
};

Trie.prototype.insert = function (word) {
  let curr = this.root;

  //iterate through word
  //for each letter, check if curr node has a child for that letter, if so, update current to that letter, if not, create a new branch for that letter
  for (let i = 0; i < word.length; i++) {
    if (!curr.has(word[i])) {
      curr.set(word[i], new Map());
    }
    curr = curr.get(word[i]);
  }

  //add a null child to curr to signify that we have ended a word
  curr.set("#", null);
};

var findWords = function (board, words) {
  const trie = new Trie();
  const res = [];
  const visited = new Set();

  //add words to trie
  words.forEach((word) => trie.insert(word));

  const DFS = function (i, j, curr, path) {
    //basecase: invalid
    //if its out of bounds or curr doesnt have, return
    if (
      i < 0 ||
      i >= board.length ||
      j < 0 ||
      j >= board[0].length ||
      !curr.has(board[i][j]) ||
      visited.has(`${i}|${j}`)
    ) {
      return;
    }

    visited.add(`${i}|${j}`);
    path += board[i][j];
    curr = curr.get(board[i][j]);

    //basecase: valid
    if (curr.has("#")) {
      res.push(path);
      curr.delete("#");
    }

    //recursive case
    DFS(i + 1, j, curr, path);
    DFS(i - 1, j, curr, path);
    DFS(i, j + 1, curr, path);
    DFS(i, j - 1, curr, path);

    visited.delete(`${i}|${j}`);
  };

  //iterate through board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      DFS(i, j, trie.root, "");
    }
  }

  return res;
};

/*
Trie solution:

const res = []

create a trie class
  insert
  hasPrefix?
  hasWord?

  trie:
      trie: map
              {a: next letters in a map (each of the next letters are init with map)}


build out trie with words
  iterate through words
      for each word, insert into trie


iterate through board
  if Trie.hasPrefix(board[i][j])
  call DFS(i, j, trieRoot)


DFS: i, j, trieNode, wordPath

///basecases
  if trieNode !not have i, j on its children OR we are out of bounds on the board
      return;

  if(trieNode has i j and its the end of a word){
      res.push word path
      return;
  }

  trieNodeChild = trieNode.get(board[i][j])

//recursive case
  left: DFS(i, j-1, trieNodeChild, wordPath + board[i][j])
  right: ...
  up: ...
  down: ...


*/
