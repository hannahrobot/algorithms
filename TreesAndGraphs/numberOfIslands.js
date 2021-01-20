//time complexity: 0(m*n)
//space complexity: 0(m*n)

var numIslands = function (grid) {
  let islands = 0;

  function DFS(column, row) {
    if (
      column >= grid[0].length ||
      row >= grid.length ||
      column < 0 ||
      row < 0 ||
      grid[row][column] === "0"
    ) {
      return;
    }

    grid[row][column] = "0";

    DFS(column + 1, row);
    DFS(column - 1, row);
    DFS(column, row - 1);
    DFS(column, row + 1);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        DFS(j, i);
        islands++;
      }
    }
  }

  return islands;
};
