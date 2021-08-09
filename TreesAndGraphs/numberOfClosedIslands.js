/**
 * @param {number[][]} grid
 * @return {number}
 */
const outOfBounds = (r, c, m, n) => r < 0 || c < 0 || r >= m || c >= n;

var closedIsland = function (G) {
  let m = G.length,
    n = G[0].length;

  let goodLand;
  const dfs = (i, j) => {
    if (outOfBounds(i, j, m, n)) {
      goodLand = false;
      return;
    }
    if (G[i][j] === -1) return;
    if (G[i][j] === 1) return;

    G[i][j] = -1;

    dfs(i - 1, j) || dfs(i + 1, j) || dfs(i, j - 1) || dfs(i, j + 1);
  };

  let count = 0;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (G[i][j] === 0) {
        goodLand = true;
        dfs(i, j);
        if (goodLand) count++;
      }
  return count;
};

//time: 0(n+m)
//space: 0(n+m) recursion stack could get to a straight line
