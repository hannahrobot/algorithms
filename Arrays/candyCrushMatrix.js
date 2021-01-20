//time complexity: 0(R*C^2)
//space complexity: 0(1)

function candyCrush(board) {
  let R = board.length;
  let C = board[0].length;
  let todo = false;

  //find aligned candy
  for (let r = 0; r < R; ++r) {
    for (let c = 0; c + 2 < C; ++c) {
      let v = Math.abs(board[r][c]);
      if (
        v != 0 &&
        v == Math.abs(board[r][c + 1]) &&
        v == Math.abs(board[r][c + 2])
      ) {
        board[r][c] = board[r][c + 1] = board[r][c + 2] = -v;
        todo = true;
      }
    }
  }
  //find aligned candy
  for (let r = 0; r + 2 < R; ++r) {
    for (let c = 0; c < C; ++c) {
      let v = Math.abs(board[r][c]);
      if (
        v != 0 &&
        v == Math.abs(board[r + 1][c]) &&
        v == Math.abs(board[r + 2][c])
      ) {
        board[r][c] = board[r + 1][c] = board[r + 2][c] = -v;
        todo = true;
      }
    }
  }

  //crush
  for (let c = 0; c < C; ++c) {
    let wr = R - 1;
    for (let r = R - 1; r >= 0; --r)
      if (board[r][c] > 0) board[wr--][c] = board[r][c];
    while (wr >= 0) board[wr--][c] = 0;
  }

  //after candy crushes, it could be aligned in a new way now, so we have to recursively call until all alignments are gone.
  return todo ? candyCrush(board) : board;
}

///////////////////////not optomized but a bit cleaner code, not recursive but maybe dynamic coding

function candyCrush(board) {
  while (crush(board)) {
    collapse(board);
  }
  return board;
}

/**
 * Returns a boolean indicating whether or not any candies were marked to be crushed,
 * and it marks the specific indices to be crushed in-place as the same value negated.
 */
function crush(board) {
  let crushed = false;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] == 0) continue;
      let a = Math.abs(board[row][col]);
      // look right
      if (col + 2 < board[0].length) {
        let b = Math.abs(board[row][col + 1]);
        let c = Math.abs(board[row][col + 2]);
        if (a == b && a == c) {
          crushed = true;
          board[row][col] = -Math.abs(a);
          board[row][col + 1] = -Math.abs(board[row][col + 1]);
          board[row][col + 2] = -Math.abs(board[row][col + 2]);
        }
      }
      // look down
      if (row + 2 < board.length) {
        let b = Math.abs(board[row + 1][col]);
        let c = Math.abs(board[row + 2][col]);
        if (a == b && a == c) {
          crushed = true;
          board[row][col] = -Math.abs(a);
          board[row + 1][col] = -Math.abs(board[row + 1][col]);
          board[row + 2][col] = -Math.abs(board[row + 2][col]);
        }
      }
    }
  }
  return crushed;
}

/**
 *  Collapses candies that have been marked to be crushed, causing candies
 *  above to fall down, and fills remaining above indices with 0.
 */
function collapse(board) {
  for (let col = 0; col < board[0].length; col++) {
    let bottom = board.length - 1;
    for (let top = board.length - 1; top >= 0; top--) {
      if (board[top][col] > 0) {
        board[bottom--][col] = board[top][col];
      }
    }
    while (bottom >= 0) board[bottom--][col] = 0;
  }
}
