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
 * @return {number[]}
 */
var findMode = function (root) {
  let output = [];
  let max = 0;
  const charCounts = {};

  if (!root) {
    return [0];
  }

  const inorder = function (node) {
    if (node.left) {
      inorder(node.left);
    }

    if (!charCounts.hasOwnProperty(node.val)) {
      charCounts[node.val] = 1;
    } else {
      charCounts[node.val]++;
    }

    if (charCounts[node.val] > max) {
      max = charCounts[node.val];
      output = [node.val];
    } else if (charCounts[node.val] === max) {
      output.push(node.val);
    }

    if (node.right) {
      inorder(node.right);
    }
  };

  inorder(root);

  return output;
};
