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
 * @return {TreeNode}
 */
var bstToGst = function (root) {
  let sum = 0;

  const DFS = function (node) {
    if (node === null) {
      return;
    }
    DFS(node.right);

    sum += node.val;
    node.val = sum;

    DFS(node.left);
  };

  DFS(root);

  return root;
};

//input: root
//output: greater tree

//sum itself with node values that are greater than self

//approach:
//right, node, left

//base case - node === null;

//node.val += carry

//node.val += DFS(node.right, 0)

//DFS(node.left, node.val)

//return the root
