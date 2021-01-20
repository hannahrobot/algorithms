/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands = function (grid) {
  const distinctIslands = {};
  let path = {};
  let count = 0;

  const DFS = function (i, j, leftCorner) {
    //base case
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid[0].length ||
      grid[i][j] === 0
    ) {
      return;
    }

    //mark visited
    grid[i][j] = 0;

    //calculate path distance from islands left corner
    const pathNode = [i - leftCorner[0], j - leftCorner[1]];

    if (!path[`${pathNode[0]}${pathNode[1]}`]) {
      path[`${pathNode[0]}${pathNode[1]}`] = true;
    }

    //recursively search each direction
    DFS(i + 1, j, leftCorner);
    DFS(i - 1, j, leftCorner);
    DFS(i, j + 1, leftCorner);
    DFS(i, j - 1, leftCorner);
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        //found the island, marked it visited
        DFS(i, j, [i, j]);
        //path has my island coordinates from left corner, sort them
        const island = Object.keys(path)
          .sort((a, b) => a - b)
          .join("");
        //check if this island exists
        if (island.length && !distinctIslands[island]) {
          //if it doesnt exist add it and count it
          distinctIslands[island] = true;
          count++;
        }
        //wipe path
        path = {};
      }
    }
  }
  return count;
};
