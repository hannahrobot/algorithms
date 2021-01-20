/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function (board, wor) {
  const DFS = function (column, row, w) {
    if (w === wor.length - 1) {
      return true;
    }

    if (
      column >= 0 &&
      row >= 0 &&
      column < board[0].length &&
      row < board.length &&
      board[row][column] === w[0]
    ) {
      const temp = board[row][column];
      board[row][column] = -1;
      DFS(column + 1, row, w.slice(1));
      DFS(column - 1, row, w.slice(1));
      DFS(column, row - 1, w.slice(1));
      DFS(column, row + 1, w.slice(1));
      board[row][column] = temp;
    }

    return false;
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === wor[0]) {
        if (DFS(j, i, wor)) {
          return true;
        }
      }
    }
  }
  return false;
};

//traverse the board, if first letter matches word, call BFS, mark letter as visited

//DFS
//backtracking
//mark visited
//shift letters off of word as you go

//can the same letter cell not be used more than once within one word or within multiple words?
