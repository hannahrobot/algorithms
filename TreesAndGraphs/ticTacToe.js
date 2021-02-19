//time: 0(1)
//space: 0(1)

/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function (board) {
  let xCount = 0;
  let oCount = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === "X") {
        xCount++;
      } else if (board[i][j] === "O") {
        oCount++;
      }
    }
  }

  if (oCount !== xCount && oCount !== xCount - 1) {
    return false;
  }
  if (win(board, "X") && oCount !== xCount - 1) {
    return false;
  }
  if (win(board, "O") && oCount !== xCount) {
    return false;
  }

  return true;
};

function win(board, player) {
  //horizontal && vertical
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === player &&
      board[1][[i]] === player &&
      board[2][i] === player
    ) {
      return true;
    }
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }

  //diagonal
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }

  return false;
}

//iterate and count

//helper: win - checks if a player has won in any of the 8 directions

//time and space is 0(1) because the board is always the same length
