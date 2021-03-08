/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */
var hasPath = function (maze, start, destination) {
  const visited = new Set();

  const rollBall = function (row, col, dir) {
    if (dir === "left") {
      while (col + 1 < maze[0].length && maze[row][col + 1] === 0) {
        col++;
      }
    } else if (dir === "right") {
      while (col - 1 >= 0 && maze[row][col - 1] === 0) {
        col--;
      }
    } else if (dir === "up") {
      while (row - 1 >= 0 && maze[row - 1][col] === 0) {
        row--;
      }
    } else if (dir === "down") {
      while (row + 1 < maze.length && maze[row + 1][col] === 0) {
        row++;
      }
    }

    return [row, col];
  };

  const DFS = function (row, col, prev) {
    if (row === destination[0] && col === destination[1]) {
      return true;
    }

    if (
      visited.has(`${row}#${col}`) ||
      (prev && row === prev[0] && col === prev[1])
    ) {
      return false;
    }

    visited.add(`${row}#${col}`);

    const left = DFS(row, rollBall(row, col, "left")[1], [row, col]);
    const right = DFS(row, rollBall(row, col, "right")[1], [row, col]);
    const up = DFS(rollBall(row, col, "up")[0], col, [row, col]);
    const down = DFS(rollBall(row, col, "down")[0], col, [row, col]);

    return left || right || down || up;
  };

  return DFS(start[0], start[1], null);
};

/*NOTES
input: maze, start coordinate, destination coordinate
output: boolean : can ball reach destination
edge:

*empty space: 0
*wall: 1
*destination: coordinate

ex:

Input: maze =
[
[0,0,1,0,0],
[0,0,0,0,0],
[0,0,0,1,0],
[1,1,0,1,1],
[0,0,0,0,0]
],
start = [0,4],
destination = [4,4]
Output: true


approach:
  variabes:
      memo

      dfs: coorinate,
          basecase: if memo: return memo
          basecase:   if coordinate is destination: return true or set a found variable to true

          add coordinate to memo

          recursive case:
              leftcoordinate: helper func(ball rolls left)
              rightcoordinate: helper func
              downcoordinate: helperfunc
              upcoordinate: helperfunc

              call dfs on each of these coordinates

          memo = left || right || down || up

          return memo

*/
