/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var inorderSuccessor = function (node) {
  if (node === null) {
    return null;
  }

  const parentmost = function (curr, origVal) {
    while (curr.parent !== null && curr.val <= origVal) {
      curr = curr.parent;
    }
    return curr;
  };

  const leftmost = function (curr) {
    while (curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  };

  if (node.parent && !node.right) {
    const parent = parentmost(node, node.val);
    if (parent.val > node.val) {
      return parent;
    } else {
      return null;
    }
  }

  if (node.right) {
    if (node.right.left) {
      const left = leftmost(node.right);
      return left;
    } else {
      return node.right;
    }
  } else {
    return null;
  }
};

//clean recursion

var inorderSuccessor = function (node) {
  if (node === null) {
    return null;
  }

  const parentmost = function (curr, origVal) {
    if (curr.val > origVal || curr.parent === null) {
      return curr;
    }
    return parentmost(curr.parent, origVal);
  };

  const leftmost = function (curr) {
    if (curr.left === null) {
      return curr;
    }
    return leftmost(curr.left);
  };

  if (node.right) {
    return leftmost(node.right);
  }

  if (node.parent) {
    const parent = parentmost(node, node.val);
    return parent.val > node.val ? parent : null;
  }
};

//recursion

/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var inorderSuccessor = function (node) {
  if (node === null) {
    return null;
  }

  const parentmost = function (curr, origVal) {
    if (curr.val > origVal || curr.parent === null) {
      return curr;
    }

    return parentmost(curr.parent, origVal);
  };

  const leftmost = function (curr) {
    if (curr.left === null) {
      return curr;
    }

    return leftmost(curr.left);
  };

  if (node.parent && !node.right) {
    const parent = parentmost(node, node.val);
    if (parent.val > node.val) {
      return parent;
    } else {
      return null;
    }
  }

  if (node.right) {
    if (node.right.left) {
      const left = leftmost(node.right);
      return left;
    } else {
      return node.right;
    }
  } else {
    return null;
  }
};

/*

input: node * each node has left right parent
output: node's successor
edge: node is null, node doesnt have successor

ex:



inorder:
left root right

node:

if parent is not null && node doesnt have a right value
recursive call on parent
parent val > node val:
return parent val



if node right is not null and right node has a left value
  leftmost DFS on the node's right value, return leftmost
else:
  return node.right

else return null

iterative:
time: 0(d)
space: 0(1)

recursive
time: 0(d)
space: 0(d)

*/
