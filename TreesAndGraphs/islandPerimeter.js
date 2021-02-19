//optimized
//DFS
//mark visited with 2
//if you hit water or visited - end DFS search / base case
//time complexity: 0(n^2) <-- worst case if there is no land and we iterate through the entire grid, best case is much better then we only search the land
//space complexity: 0(land) recursion could add to this but by marking visited we cut it down

/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  let perimeter = 0;

  const DFS = function (i, j) {
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid[0].length ||
      grid[i][j] !== 1
    ) {
      return;
    }

    if ((i + 1 < grid.length && !grid[i + 1][j]) || i + 1 >= grid.length) {
      perimeter++;
    }
    if ((i - 1 >= 0 && !grid[i - 1][j]) || i - 1 < 0) {
      perimeter++;
    }
    if (
      (j + 1 < grid[0].length && !grid[i][j + 1]) ||
      j + 1 >= grid[0].length
    ) {
      perimeter++;
    }
    if ((j - 1 >= 0 && !grid[i][j - 1]) || j - 1 < 0) {
      perimeter++;
    }
    grid[i][j] = 2;

    DFS(i + 1, j);
    DFS(i - 1, j);
    DFS(i, j + 1);
    DFS(i, j - 1);
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        DFS(i, j);
        return perimeter;
      }
    }
  }
};

//---------------
//time complexity: 0(m*n)
//space complexity: 0(1)

/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  let perimeter = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        //i can do this because if its 0 its false
        //but will i and j error out if they are invalid
        if ((i + 1 < grid.length && !grid[i + 1][j]) || i + 1 >= grid.length) {
          perimeter++;
        }
        if ((i - 1 >= 0 && !grid[i - 1][j]) || i - 1 < 0) {
          perimeter++;
        }
        if (
          (j + 1 < grid[0].length && !grid[i][j + 1]) ||
          j + 1 >= grid[0].length
        ) {
          perimeter++;
        }
        if ((j - 1 >= 0 && !grid[i][j - 1]) || j - 1 < 0) {
          perimeter++;
        }
      }
    }
  }
  return perimeter;
};

//input: grid: land 1: water 0
//output: perimeter: integer

//approach
//variables:
//i == rows
//j == columns

//nested loop iterates over matrix
//for each iteration:
//perimeter ++ for every edge that touches water

//return perimeter
