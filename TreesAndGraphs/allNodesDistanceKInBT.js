//bfs with adjacency list
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */

const buildGraph = function (root) {
  const graph = new Map();
  const queue = [root];

  const addToGraph = function (first, second) {
    if (graph.has(first)) {
      graph.get(first).push(second);
    } else {
      graph.set(first, [second]);
    }
  };

  while (queue.length) {
    const node = queue.shift();

    if (node.left) {
      queue.push(node.left);
      addToGraph(node, node.left);
      addToGraph(node.left, node);
    }
    if (node.right) {
      queue.push(node.right);
      addToGraph(node, node.right);
      addToGraph(node.right, node);
    }
  }
  return graph;
};

const distanceK = function (root, target, K) {
  const graph = buildGraph(root);
  const queue = [target];
  const result = [];
  const visited = new Set();

  let currDistance = 0;

  while (queue.length && currDistance <= K) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      if (currDistance === K) {
        result.push(node.val);
      }

      if (graph.has(node)) {
        const neighbors = graph.get(node);
        neighbors.forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
      visited.add(node);
    }
    currDistance++;
  }

  return result;
};

//from each node you return a count, if it has no count it returns -1
//when i find the target node, i decrement and return the count
//i also traverse farther with the decremented count
//when a node recieves 0, we push its value to the result array
//-------------------------------------

//dfs with parent mapping
//time: 0(n)
//space: 0(n)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */
const distanceK = function (root, target, K) {
  const hash = new Map();

  const buildMap = function (node, parent) {
    if (node === null) {
      return;
    }
    hash.set(node, parent);
    buildMap(node.left, node);
    buildMap(node.right, node);
  };

  buildMap(root, null);

  const visited = new Set();
  const res = [];

  const DFS = function (node, distance) {
    if (node === null || visited.has(node)) {
      return;
    }

    if (distance === K) {
      res.push(node.val);
      return;
    }
    visited.add(node);
    DFS(hash.get(node), distance + 1);
    DFS(node.left, distance + 1);
    DFS(node.right, distance + 1);
  };

  DFS(target, 0);

  return res;
};
