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
 * @return {number}
 */
var sumNumbers = function (root) {
  if (root === null) {
    return 0;
  }

  let rootToLeafs = 0;

  const getPaths = function (node, sum) {
    if (node.left === null && node.right === null) {
      rootToLeafs += sum;
      return;
    }

    if (node.left !== null) {
      getPaths(node.left, sum * 10 + node.left.val);
    }

    if (node.right !== null) {
      getPaths(node.right, sum * 10 + node.right.val);
    }
  };

  getPaths(root, root.val);

  return rootToLeafs;
};

//time: 0(n) we traverse each node, we reduce a smaller array than n
//space: 0(n): we recurse the tree, worst case scenario is out tree is one side n length
