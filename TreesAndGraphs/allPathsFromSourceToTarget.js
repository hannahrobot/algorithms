//DFS backtracking
//time complexity: 0(2^n * n)
//space complexity: 0(2^n * n)

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const paths = [];
  const dfs = (index, path) => {
    // only if the path a target path
    if (path[path.length - 1] == graph.length - 1) {
      paths.push(path);
      return;
    }
    for (let i = 0; i < graph[index].length; i++) {
      dfs(graph[index][i], [...path, graph[index][i]]);
    }
  };
  dfs(0, [0]);
  return paths;
};

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const target = graph.length - 1;

  const res = [];

  const DFS = (node, path) => {
    path.push(node);

    // if we've reached the target, we've found a path
    if (node === target) {
      res.push(path);
      return;
    }

    for (let edge of graph[node]) {
      DFS(edge, [...path]);
    }
  };

  DFS(0, []);

  return res;
};

//dynamic programming algorithm (less efficient but same time / space complexity)
//dynamic programming requires a cache of our visited indices, to reuse it, this is called memoization
