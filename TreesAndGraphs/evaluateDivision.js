/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const graph = new Map();

  //build graph
  for (let i = 0; i < equations.length; i++) {
    const [dividend, divisor] = equations[i];
    const quotient = values[i];

    if (!graph.has(dividend)) {
      graph.set(dividend, new Map());
    }
    if (!graph.has(divisor)) {
      graph.set(divisor, new Map());
    }
    graph.get(dividend).set(divisor, quotient);
    graph.get(divisor).set(dividend, 1 / quotient);
  }

  const DFS = function (currNode, targetNode, accProduct, visited) {
    visited.add(currNode);

    let ret = -1;

    const neighbors = graph.get(currNode);
    if (neighbors.has(targetNode)) {
      ret = accProduct * neighbors.get(targetNode);
    } else {
      for (let [node, quotent] of neighbors) {
        if (!visited.has(node)) {
          ret = DFS(node, targetNode, accProduct * quotent, visited);
          if (ret !== -1) {
            break;
          }
        }
      }
    }
    visited.delete(currNode);
    return ret;
  };

  //evaluate queries with backtracking (DFS)
  // by verifying if there exists a path from dividend to divisor
  const result = [];
  for (let i = 0; i < queries.length; i++) {
    const [dividend, divisor] = queries[i];
    if (!graph.has(dividend) || !graph.has(divisor)) {
      result[i] = -1;
    } else if (dividend === divisor) {
      result[i] = 1;
    } else {
      const visited = new Set();
      result[i] = DFS(dividend, divisor, 1, visited);
    }
  }

  return result;
};

/*

build a hash graph: a: map: char: quotent


*/
