/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
const cloneGraph = function (node) {
  if (node === null) {
    return node;
  }

  const map = new Map();

  const makeCopy = function (origNode) {
    if (!map.has(origNode)) {
      const copyNode = new Node(origNode.val);
      map.set(origNode, copyNode);
    } else {
      return map.get(origNode);
    }

    map.get(origNode).neighbors = origNode.neighbors.map((nNode) =>
      makeCopy(nNode)
    );
    return map.get(origNode);
  };

  return makeCopy(node);
};

//time: 0(n + m) number of nodes plus edges
//space: 0(n) because of the hash

//create a map for original nodes and cloned nodes
//check if the current node is in the hash table
//if not - clone the current node
//put them in the hash[node]= cloned node
//iterate through neighbors array and call the copyclone function on each node
//push the cloned node returned into the currentcloned node's neighborsarray
//return the cloned node
