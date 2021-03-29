//inplace bfs with timestamp

//mark places with a timestamp as you iterate
//if you hit another rotten orange later in the grid, move out from there with its timestamps as long as they are smaller than the curr timestamp.
//time: 0(n^2)
//space: 0(1)

//bfs with queue

/**
 * @param {number[][]} grid
 * @return {number}
 */
const orangesRotting = function (grid) {
  const addFreshNeighbors = function (i, j) {
    //down
    if (i + 1 < grid.length && grid[i + 1][j] === 1) {
      queue.push([i + 1, j]);
    }
    //up
    if (i - 1 >= 0 && grid[i - 1][j] === 1) {
      queue.push([i - 1, j]);
    }
    //right
    if (j + 1 < grid[0].length && grid[i][j + 1] === 1) {
      queue.push([i, j + 1]);
    }
    //left
    if (j - 1 >= 0 && grid[i][j - 1] === 1) {
      queue.push([i, j - 1]);
    }
  };

  const queue = [];
  let fresh = 0;
  let minutes = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) {
        addFreshNeighbors(i, j);
      } else if (grid[i][j] === 1) {
        fresh++;
      }
    }
  }

  while (queue.length) {
    const size = queue.length;
    let rot = 0;
    for (let i = 0; i < size; i++) {
      const [row, column] = queue.shift();
      //if its fresh, rot it
      if (grid[row][column] === 1) {
        grid[row][column] = 2;
        rot++;
        fresh--;
      }
      //add its fresh neighbors to queue
      addFreshNeighbors(row, column);
    }
    //if we rotted on this level add minutes, if everything was already rotten - we dont want to increment mins
    if (rot) {
      minutes++;
    }
  }

  //if there are fresh oranges left we return -1, else we return the mins
  return fresh ? -1 : minutes;
};
