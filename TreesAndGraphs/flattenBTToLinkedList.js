/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
const flatten = function (root) {
  const flattenTree = function (node) {
    if (node === null) {
      return null;
    }

    const leftTail = flattenTree(node.left);
    const rightTail = flattenTree(node.right);

    if (leftTail === null && rightTail === null) {
      return node;
    }

    if (leftTail !== null) {
      leftTail.right = node.right;
      node.right = node.left;
      node.left = null;
    }

    return rightTail === null ? leftTail : rightTail;
  };

  flattenTree(root);
};

/*

traverse the tree in preorder
add root as linkedlist node
  left is null
  right is right branch
left(node.left)
right(node.right)

return node

*/
