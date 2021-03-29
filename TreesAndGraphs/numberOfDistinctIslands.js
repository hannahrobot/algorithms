/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands = function (grid) {
  const distinctIslands = new Set();

  const DFS = function (originalPoint, currPoint) {
    const [row, col] = currPoint;
    const [startRow, startCol] = originalPoint;

    //basecase
    if (
      row < 0 ||
      col < 0 ||
      row >= grid.length ||
      col >= grid[0].length ||
      grid[row][col] === 0
    ) {
      return [];
    }

    //mark visited
    grid[row][col] = 0;

    //track coordinate for top left
    const pathRow = row - startRow;
    const pathCol = col - startCol;
    const coordinate = `${pathRow}|${pathCol}`;

    const res = [coordinate];

    //recurse
    res.push(...DFS(originalPoint, [row, col + 1]));
    res.push(...DFS(originalPoint, [row, col - 1]));
    res.push(...DFS(originalPoint, [row + 1, col]));
    res.push(...DFS(originalPoint, [row - 1, col]));

    return res;
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1) {
        const path = DFS([row, col], [row, col]).join("#");
        if (!distinctIslands.hasOwnProperty(path)) {
          distinctIslands.add(path);
        }
      }
    }
  }

  return distinctIslands.size;
};

/*
variable
  memo for paths that have been traversed
  totalUniqueIslands: int

iterate through grid (nested loop with rows and columns)
  if we hit a 1, call DFS(current point, original point)
  get coordinates returned from DFS
  sort coordinates, join, and check if they are in memo
  if not, add to memo and ++ total

  DFS helper function(current point, original point)
      basecase: out of bounds or val of 0 at the curr cell
          return: ['']

      mark as visited (make it 0) * do you care if i manipylate this or do you want my to create a separate visited grid

      get the current cells coordinates if we subtract the original top left corner from it

      add current cell coordinates to path

      res = ['currentcel']

      DFS:
          res.push(...left: left coordinate, original cell, path)
          right
          up
          down

      return res

      *if the path isnt in memo, add to total islands


*/
