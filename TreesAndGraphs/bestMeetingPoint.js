//collecting in sorted order and finding median
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minTotalDistance = function (grid) {
  const rows = [];
  const cols = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        rows.push(i);
      }
    }
  }

  for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] === 1) {
        cols.push(i);
      }
    }
  }

  const row = Math.floor(rows.length / 2);
  const col = Math.floor(cols.length / 2);

  return distance(rows, row) + distance(cols, col);
};

function distance(points, origin) {
  let d = 0;
  points.forEach((point) => {
    d += Math.abs(point - points[origin]);
  });

  return d;
}

//sorting & find median

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minTotalDistance = function (grid) {
  const rows = [];
  const cols = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        rows.push(i);
        cols.push(j);
      }
    }
  }

  const row = Math.floor(rows.length / 2);
  cols.sort((a, b) => a - b);
  const col = Math.floor(cols.length / 2);

  return distance(rows, row) + distance(cols, col);
};

function distance(points, origin) {
  let d = 0;
  points.forEach((point) => {
    d += Math.abs(point - points[origin]);
  });

  return d;
}
