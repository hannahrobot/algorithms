/**
 * @param {number} N
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
var gridIllumination = function (N, lamps, queries) {
  const res = new Array(queries.length).fill(0);
  const grid = new Array(N).fill(new Array(N).fill(0));

  const DFS = function (r, c, num) {
    if (r < 0 || c < 0 || r >= N || c >= N) {
      return;
    }

    grid[r][c] += num;

    DFS(r + 1, c, num);
    DFS(r - 1, c, num);
    DFS(r, c + 1, num);
    DFS(r, c - 1, num);
  };

  for (let i = 0; i < lamps.length; i++) {
    const r = lamps[i][0];
    const c = lamps[i][1];
    //turn lamps on
    DFS(r, c, 1);
  }

  //iterate through queries and turn lights off
  for (let i = 0; i < queries.length; i++) {
    const r = queries[i][0];
    const c = queries[i][1];
    if (grid[r][c] > 0) {
      res[i] = 1;
    }
    DFS(r, c, -1);
  }

  return res;
};

//make grid fill with n 0's
//iterate through lamps and turn on lamps ++(just the single lamp (this is 0(n) with n being the length of lamps))
//check first query by DFS first lamp, mark res array[i], then dfs turn off lamps
//check second query by DFS from second lamp, mark res array[i], then dfs turn off lamps
