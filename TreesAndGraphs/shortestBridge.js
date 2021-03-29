/**
 * @param {number[][]} A
 * @return {number}
 */
var shortestBridge = function (A) {
  const queue = [];
  let minDistance = Infinity;

  const addFirstSteps = function (row, col, steps) {
    //right
    if (col + 1 < A[0].length && A[row][col + 1] === 0) {
      queue.push([[row, col + 1], 1 + steps]);
    }
    //left
    if (col - 1 >= 0 && A[row][col - 1] === 0) {
      queue.push([[row, col - 1], 1 + steps]);
    }
    //up
    if (row - 1 >= 0 && A[row - 1][col] === 0) {
      queue.push([[row - 1, col], 1 + steps]);
    }
    //down
    if (row + 1 < A.length && A[row + 1][col] === 0) {
      queue.push([[row + 1, col], 1 + steps]);
    }
  };

  const nextToOne = function (row, col) {
    let ans = false;

    //right
    if (col + 1 < A[0].length && A[row][col + 1] === 1) {
      ans = true;
    }
    //left
    if (col - 1 >= 0 && A[row][col - 1] === 1) {
      ans = true;
    }
    //up
    if (row - 1 >= 0 && A[row - 1][col] === 1) {
      ans = true;
    }
    //down
    if (row + 1 < A.length && A[row + 1][col] === 1) {
      ans = true;
    }
    return ans;
  };

  const DFS = function (row, col) {
    //basecase: out of bounds or its 0
    if (
      row < 0 ||
      col < 0 ||
      row >= A.length ||
      col >= A[0].length ||
      A[row][col] !== 1
    ) {
      return;
    }

    //mark -1
    A[row][col] = -1;

    //add 0 neighbors to queue with steps at 1
    addFirstSteps(row, col, 0);

    //recursive case: DFS in 4 directions
    DFS(row + 1, col);
    DFS(row - 1, col);
    DFS(row, col + 1);
    DFS(row, col - 1);
  };

  for (let i = 0; i < A.length; i++) {
    let endIteration = false;
    for (let j = 0; j < A[0].length; j++) {
      if (A[i][j] === 1) {
        DFS(i, j);
        endIteration = true;
      }
      if (endIteration) {
        break;
      }
    }
    if (endIteration) {
      break;
    }
  }

  //BFS
  while (queue.length) {
    //unshift off queue
    const [[row, col], steps] = queue.shift();
    //check if current cell is 0: if yes continue
    if (nextToOne(row, col)) {
      minDistance = Math.min(minDistance, steps);
    } else if (A[row][col] !== -1) {
      //add 4 directions to queue with steps
      addFirstSteps(row, col, steps);
    }
    A[row][col] = -1;
  }

  return minDistance;
};

/*
time: 0(m*n)
space: 0(m*n)


input: grid
output: shortest distance for islands to connect 4 directionally
edge:

ex


approach:

variables:
queue - arr
minDistance - int

nested forloop to traverse array, when you hit a 1, do a dfs
while you DFS, add island cells to a queue [cell coord, steps]
mark cells as -1 in grid
*we only add the first island to the queue

BFS
while queue has length
curr cell: unshift cell off
if cell is touching an opposite island (1) 4 directionally, update min distance with steps
if cell isnt touching an opposite island 4 directionally, add 4 directions to queue with steps incremented


/-----

optimized: find min distance cell between two islands

island1 arr
island2 arr

iterate through grid
  DFS on island: add cells to an array && mark 0 on grid

iterate through cells and find min distance cells between the two

get manhattan distance

return manhattan distance


*/

// [
//     [0,1,0],
//     [0,0,0],
//     [0,0,1]]

// [
//     [1,1,1,1,1],
//     [1,0,0,0,1],
//     [1,0,1,0,1],
//     [1,0,0,0,1],
//     [1,1,1,1,1]
// ]
