/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
const updateBoard = function (board, click) {
  const explosion = function (i, j) {
    const regex = /[1-7]/;

    if (i < 0 || j < 0 || i >= board.length || j >= board[i].length) {
      return;
    }
    if (board[i][j] === "B" || board[i][j] === "E") {
      board[i][j] = "1";
    } else if (regex.test(board[i][j])) {
      board[i][j] = (parseInt(board[i][j]) + 1).toString();
    }
  };

  const DFS = function (i, j) {
    if (i < 0 || j < 0 || i >= board.length || j >= board[i].length) {
      return;
    }

    const adj = nextToMine(i, j, board);

    if (board[i][j] === "E" && !adj) {
      board[i][j] = "B";
      DFS(i + 1, j);
      DFS(i - 1, j);
      DFS(i, j + 1);
      DFS(i, j - 1);
      DFS(i + 1, j + 1);
      DFS(i - 1, j - 1);
      DFS(i + 1, j - 1);
      DFS(i - 1, j + 1);
    } else if (board[i][j] === "E" && adj) {
      board[i][j] = "1";

      // } else if (/[1-7]/.test(board[i][j]) && adj) {
      //   board[i][j] = (parseInt(board[i][j]) + 1).toString();
    } else if (board[i][j] === "M") {
      explosion(i + 1, j);
      explosion(i - 1, j);
      explosion(i, j + 1);
      explosion(i, j - 1);
      explosion(i + 1, j + 1);
      explosion(i - 1, j - 1);
      explosion(i + 1, j - 1);
      explosion(i - 1, j + 1);
    }
  };
  if (board[click[0]][click[1]] === "M") {
    board[click[0]][click[1]] === "X";
  }

  DFS(click[0], click[1]);

  return board;
};

function nextToMine(i, j, board) {
  if (i + 1 < board.length && board[i + 1][j] === "M") return true;
  if (i - 1 >= 0 && board[i - 1][j] === "M") return true;
  if (j + 1 < board[0].length && board[i][j + 1] === "M") return true;
  if (j - 1 >= 0 && board[i][j - 1] === "M") return true;
  if (
    i + 1 < board.length &&
    j + 1 < board[0].length &&
    board[i + 1][j + 1] === "M"
  )
    return true;
  if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1] === "M") return true;
  if (i + 1 < board.length && j - 1 >= 0 && board[i + 1][j - 1] === "M")
    return true;
  if (i - 1 >= 0 && j + 1 < board[0].length && board[i - 1][j + 1] === "M")
    return true;

  return false;
}

//8 directions

//call dfs on click
//if its e, change to b, change its adjacent e's to be b

//if its a mine, call mins dfs
//change adjacent E to 1, if its already 1 increment it
//

//return the grid

/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
const updateBoard = function (board, click) {
  const explosion = function (i, j) {
    const regex = /[1-7]/;

    if (i < 0 || j < 0 || i >= board.length || j >= board[i].length) {
      return;
    }
    if (board[i][j] === "B" || board[i][j] === "E") {
      board[i][j] = "1";
    } else if (regex.test(board[i][j])) {
      board[i][j] = (parseInt(board[i][j]) + 1).toString();
    }
  };

  const DFS = function (i, j) {
    if (i < 0 || j < 0 || i >= board.length || j >= board[i].length) {
      return;
    }

    if (board[i][j] === "E" && !nextToMine(i, j, board)) {
      board[i][j] = "B";
      DFS(i + 1, j);
      DFS(i - 1, j);
      DFS(i, j + 1);
      DFS(i, j - 1);
      DFS(i + 1, j + 1);
      DFS(i - 1, j - 1);
      DFS(i + 1, j - 1);
      DFS(i - 1, j + 1);
    } else if (board[i][j] === "M") {
      explosion(i + 1, j);
      explosion(i - 1, j);
      explosion(i, j + 1);
      explosion(i, j - 1);
      explosion(i + 1, j + 1);
      explosion(i - 1, j - 1);
      explosion(i + 1, j - 1);
      explosion(i - 1, j + 1);
    }
  };

  if (board[click[0]][click[1]] === "M") {
    board[click[0]][click[1]] === "X";
  }

  DFS(click[0], click[1]);

  return board;
};

function nextToMine(i, j, board) {
  if (i + 1 < board.length && board[i + 1][j] === "M") return true;
  if (i - 1 >= 0 && board[i - 1][j] === "M") return true;
  if (j + 1 < board[0].length && board[i][j + 1] === "M") return true;
  if (j - 1 >= 0 && board[i][j - 1] === "M") return true;
  if (
    i + 1 < board.length &&
    j + 1 < board[0].length &&
    board[i + 1][j + 1] === "M"
  )
    return true;
  if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1] === "M") return true;
  if (i + 1 < board.length && j - 1 >= 0 && board[i + 1][j - 1] === "M")
    return true;
  if (i - 1 >= 0 && j + 1 < board[0].length && board[i - 1][j + 1] === "M")
    return true;

  return false;
}

//8 directions

//call dfs on click
//if its e, change to b, change its adjacent e's to be b

//if its a mine, call mins dfs
//change adjacent E to 1, if its already 1 increment it
//

//return the grid
