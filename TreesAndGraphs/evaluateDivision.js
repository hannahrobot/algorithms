/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const graph = {};

  //build adjacency list
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const val = values[i];

    if (graph[a]) {
      graph[a][b] = val;
    } else {
      graph[a] = { [b]: val };
    }
    if (graph[b]) {
      graph[b][a] = 1 / val;
    } else {
      graph[b] = { [a]: 1 / val };
    }
  }

  //iterate through queries
  //  start with queries[0]
  //  DFS: curr letter, curr sum, goal letter
  //  invalid basecase is we dont find the letter(it doesnt exist in our graph): return
  //  valid basecase is we find the querie[1] letter
  //  recursive case: iterate through children of current letter and multiply
  //return dfs

  const DFS = function (curr, product, end, seen) {
    //invalid basecase
    if (!graph.hasOwnProperty(curr) || seen.has(curr)) {
      return -1;
    }

    //valid basecase
    if (curr === end) {
      return product;
    }

    seen.add(curr);

    let result = -1;

    //iterate through child paths

    for (let letter in graph[curr]) {
      const val = graph[curr][letter];
      const r = DFS(letter, product * val, end, seen);
      if (r !== -1) {
        result = r;
      }
    }

    seen.delete(curr);

    return result;
  };

  const res = new Array(queries.length);

  for (let i = 0; i < queries.length; i++) {
    res[i] = DFS(queries[i][0], 1, queries[i][1], new Set());
  }

  return res;
};

/*

input:
output:
edge: are there multiple valid answers? is there cycling?
questions:

a/b = 2.0 b/a = 1/2
b/c = 3.0 c/b = 1/3

examples:
Input:
equations = [["a","b"],["b","c"]],
values = [2.0,3.0],
queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]


approach:
-build adjacenty graph: division one way, multiplication the other way
  iterate through equations
      a: {b: 2.0}
      b: {c: 3.0}

-use dfs with backtracking to check if its been visited

time: 0(e+v) * queries
space: 0(e+v)

*/
