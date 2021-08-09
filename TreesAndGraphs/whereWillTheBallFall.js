/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findBall = function (grid) {
  const answer = new Array(grid[0].length);

  const DFS = function (row, col) {
    //basecase: *valid
    if (row === grid.length && col >= 0 && col < grid[0].length) {
      return col;
    }

    //basecase: *invalid
    if (
      col < 0 ||
      col >= grid[0].length ||
      grid[row][col + grid[row][col]] !== grid[row][col]
    ) {
      return -1;
    }

    //recursiveCase:
    return DFS(row + 1, col + grid[row][col]);
  };

  grid[0].forEach((ball, col) => {
    answer[col] = DFS(0, col);
  });

  return answer;
};

/*
input: grid
output: answer [](grid[0].length) each el represents the column that that ball landed on or -1 if it hits a v


edge cases:
  -ball hits a v

DFS: row, col

  basecase:
      outofBounds || grid[row][col+grid[row][col]] !== grid[row][col]
          return -1

 recursiveCase:
      return DFS(row +1, col+grid[row][col])


const answer = new Array(grid[0].length)

iterate through grid[0]{
  answer[i]=DFS(0, i)
}

return answer

*/
