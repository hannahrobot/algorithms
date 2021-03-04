//-----------------------
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function (board, word) {
  const memo = {};

  const DFS = function (row, column, wordIdx) {
    //basecase: out of bounds or incorrect letter
    if (
      row < 0 ||
      column < 0 ||
      row >= board.length ||
      column >= board[0].length ||
      board[row][column] !== word[wordIdx]
    ) {
      return false;
    }

    //basecase: we got the last letter
    if (wordIdx === word.length - 1 && board[row][column] === word[wordIdx]) {
      return true;
    }

    //check it we've visited the cell before
    if (memo[`${row}${column}`]) {
      return memo[`${row}${column}`];
    }

    //append # to char at cell
    board[row][column] = "#" + board[row][column];

    //recursive calls
    const down = DFS(row + 1, column, wordIdx + 1);
    const up = DFS(row - 1, column, wordIdx + 1);
    const right = DFS(row, column + 1, wordIdx + 1);
    const left = DFS(row, column - 1, wordIdx + 1);

    //take # off cell
    board[row][column] = board[row][column].charAt(1);

    //return true if any of the directions returned true
    memo[`${row}${column}`] = down || up || right || left;
    return memo[`${row}${column}`];
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === word[0] && DFS(i, j, 0)) {
        return true;
      }
    }
  }

  return false;
};
