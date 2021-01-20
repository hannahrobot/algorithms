var connect = function (root) {
  //breadth first - level by level

  if (!root) {
    return root;
  }

  const q = [root];

  while (q.length > 0) {
    const size = q.length;

    for (let i = 0; i < size; i++) {
      const node = q.shift();

      if (i < size - 1) {
        node.next = q[0];
      }
      if (node.left !== null) {
        q.push(node.left);
      }
      if (node.right !== null) {
        q.push(node.right);
      }
    }
  }
  return root;
};
