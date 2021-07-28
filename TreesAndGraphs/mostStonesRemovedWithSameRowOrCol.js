//----------------row col graphs (my solution, code errors)

/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  if (!stones.length || stones.length === 1) {
    return 0;
  }

  const colMap = new Map();
  const rowMap = new Map();
  let maxRocks = 0;

  //build graphs
  stones.forEach((stone) => {
    const [row, col] = stone;
    if (!rowMap.has(row)) {
      rowMap.set(row, new Set());
    }
    if (!colMap.has(col)) {
      colMap.set(col, new Set());
    }
    rowMap.set(row, rowMap.get(row).add(stone));
    colMap.set(col, colMap.get(col).add(stone));
  });

  const DFS = function (curr) {
    const [row, col] = curr;

    //basecase
    if (rowMap.get(row).size <= 1 && colMap.get(col).size <= 1) {
      return 0;
    }

    if (rowMap.has(row) && rowMap.get(row).has(curr)) {
      rowMap.get(row).delete(curr);
    }
    if (colMap.has(col) && colMap.get(col).has(curr)) {
      colMap.get(col).delete(curr);
    }

    let rocks = 0;

    //recursivecase
    if (rowMap.has(row) && rowMap.get(row).size) {
      rowMap.get(row).forEach((coord) => {
        rocks = Math.max(DFS(coord), rocks);
      });
    }
    if (colMap.has(col) && colMap.get(col).size) {
      colMap.get(col).forEach((coord) => {
        rocks = Math.max(DFS(coord), rocks);
      });
    }

    rowMap.get(row).add(curr);
    colMap.get(col).add(curr);

    return rocks + 1;
  };

  stones.forEach((stone) => {
    maxRocks = Math.max(maxRocks, DFS(stone));
  });

  return maxRocks;
};

//--------------- variation (code runs)

/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  const rowsMap = new Map(),
    colsMap = new Map();

  for (const stone of stones) {
    const row = rowsMap.get(stone[0]) || [];
    row.push(stone);
    rowsMap.set(stone[0], row);

    const col = colsMap.get(stone[1]) || [];
    col.push(stone);
    colsMap.set(stone[1], col);
  }

  const removeConnectedComponent = (stone) => {
    const row = rowsMap.get(stone[0]);
    if (row) {
      rowsMap.delete(stone[0]);
      for (const _stone of row) {
        removeConnectedComponent(_stone);
      }
    }

    const col = colsMap.get(stone[1]);
    if (col) {
      colsMap.delete(stone[1]);
      for (const _stone of col) {
        removeConnectedComponent(_stone);
      }
    }
  };

  let connectedComponents = 0;
  for (const stone of stones) {
    if (rowsMap.has(stone[0])) {
      removeConnectedComponent(stone);
      connectedComponents++;
    }
  }

  return stones.length - connectedComponents;
};

//--------------------- union find

var removeStones = function (stones) {
  class UnionFind {
    constructor(grid) {
      this.idMap = new Map();
      this.graph = [];
      this.cols = [];
      this.rows = [];
      this.edges = 0;
      this.mapGrid(grid);
    }

    mapGrid(grid) {
      for (let id = 0; id < grid.length; id++) {
        const [r, c] = grid[id];

        if (!this.rows[r]) this.rows[r] = [grid[id]];
        else this.rows[r].push(grid[id]);

        if (!this.cols[c]) this.cols[c] = [grid[id]];
        else this.cols[c].push(grid[id]);

        this.graph.push(id);
        this.idMap.set(`${r}-${c}`, id);
      }
    }

    getId(r, c) {
      return this.idMap.get(`${r}-${c}`);
    }

    find(x) {
      if (this.graph[x] === x) return x;
      this.graph[x] = this.find(this.graph[x]);
      return this.graph[x];
    }

    union(x, y) {
      const rootX = this.find(x);
      const rootY = this.find(y);
      if (rootX !== rootY) {
        this.graph[rootY] = rootX;
        this.edges++;
      }
    }
  }

  const unionfind = new UnionFind(stones);

  for (let i = 0; i < stones.length; i++) {
    const [r, c] = stones[i];

    // union with same row
    for (let [x, y] of unionfind.rows[r]) {
      if (y === c) continue; // skip self
      const id = unionfind.getId(x, y);
      unionfind.union(i, id);
    }

    // union with same col
    for (let [x, y] of unionfind.cols[c]) {
      if (x === r) continue; // skip self
      const id = unionfind.getId(x, y);
      unionfind.union(i, id);
    }
  }
  return unionfind.edges;
};
