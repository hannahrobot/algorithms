/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var leadsToDestination = function (n, edges, source, destination) {
  const graph = {};

  //build directed graph
  for (let i = 0; i < edges.length; i++) {
    if (edges[i][0] === destination) {
      return false;
    }
    if (graph.hasOwnProperty(edges[i][0])) {
      graph[edges[i][0]].push(edges[i][1]);
    } else {
      graph[edges[i][0]] = [edges[i][1]];
    }
  }

  const visiting = new Set();
  const visited = new Set();

  //DFS all paths
  const DFS = function (node) {
    //basecase: we've processed this node and it has already returned true
    if (visited.has(node)) {
      return true;
    }
    //basecase: we are currently processing this node and found a cycle
    if (visiting.has(node)) {
      return false;
    }
    if (!graph.hasOwnProperty(node)) {
      return node === destination;
    }

    visiting.add(node);

    //recursive case
    for (let child of graph[node]) {
      if (!DFS(child)) {
        return false;
      }
    }

    visiting.delete(node);
    visited.add(node);
    return true;
  };

  return DFS(source);
};

/*NOTES

input: n (number of nodes), edges: node paths arr: edges between two nodes, source: node val, destination node val
output: true or false (do all paths from source lead to destination)


* has to have at least one path from source to destination
* the destination is the only node that cant have outgoing edges
* it cant cycle


approach:
  iterate through edges
      build a directed graph
          node: children

          ifterate through directed graph
          for(key in directed graph)

              visited set

              * if it cycles false(visited already)

              * if node doesnt have children and its not val of destination: false

          if we make it through the entire graph without returning false
          return true



*/
