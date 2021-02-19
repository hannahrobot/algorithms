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
var diameterOfBinaryTree = function (root) {
  let longestPath = 0;

  const depth = (node) => {
    if (!node) {
      return 0;
    }
    let left = depth(node.left);
    let right = depth(node.right);

    longestPath = Math.max(longestPath, left + right);

    return Math.max(left, right) + 1;
  };

  depth(root);

  return longestPath;
};

//input: root
//output: integer: length of longest path between any two nodes
//edge cases: root === null,

//ex:

//    0
//.  / \
//. 1.  2
// /.\   \
//4.  5

//output: 3

//DFS
