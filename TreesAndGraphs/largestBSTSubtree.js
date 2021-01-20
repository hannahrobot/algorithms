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
var largestBSTSubtree = function (root, res = 0) {
  if (isBST(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)) {
    return size(root);
  }
  return Math.max(largestBSTSubtree(root.left), largestBSTSubtree(root.right));
};

var size = function (root) {
  if (root === null) {
    return 0;
  }
  return 1 + size(root.left) + size(root.right);
};

var isBST = function (root, min, max) {
  if (root === null) {
    return true;
  }
  if (root.val < min || root.val > max) {
    return false;
  } else {
    return (
      isBST(root.left, min, root.val - 1) &&
      isBST(root.right, root.val - 1, max)
    );
  }
};

//helper function:
//DFS
//returns increments count
//hits base case = node is null, returns count
//compare counts
