var findDuplicateSubtrees = function (root) {
  const map = new Map();
  const output = [];

  function serialize(node) {
    if (!node) return "x";
    const id =
      node.val + "," + serialize(node.left) + "," + serialize(node.right);
    map.set(id, (map.get(id) || 0) + 1);
    if (map.get(id) === 2) output.push(node);
    return id;
  }

  serialize(root);
  return output;
};

//time: 0(n) we recurse each node
//space: 0(n) worst case depth of tree is one sided
