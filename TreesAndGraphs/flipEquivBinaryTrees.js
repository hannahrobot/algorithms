/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */

var flipEquiv = function (root1, root2) {
  //edge cases
  if (!root1 && !root2) {
    return true;
  }
  if (!root1 || !root2 || root1.val !== root2.val) {
    return false;
  }

  let left;
  let right;

  return (
    (flipEquiv(root1.left, root2.left) &&
      flipEquiv(root1.right, root2.right)) ||
    (flipEquiv(root1.left, root2.right) && flipEquiv(root2.left, root1.right))
  );
};

//time: 0(n+m) we iterate through each tree once
//space: 0(n+m) the recursion stack could be the entire tree if its lopsided
