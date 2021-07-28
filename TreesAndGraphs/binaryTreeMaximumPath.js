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
 var maxPathSum = function(root) {

  if(!root) {
      return 0;
  }

  let maxSum = -Infinity

  const traverseTree = function(curr) {
      if(!curr){
          return 0;
      }

      const left = Math.max(traverseTree(curr.left), 0)
      const right = Math.max(traverseTree(curr.right), 0)

      const sum = left > right ? left + curr.val : right + curr.val

      maxSum = Math.max(maxSum, left + right + curr.val)

      return sum
  }

  traverseTree(root)

  return maxSum

};

/*
input: root of a bt
output: sum of max path
edge cases: root is null,

ex:

      -10
      /. \
     9    20
          / \
         15  7

brute force:


variables:
max sum

pre order traversal (root, left, right)
recursive:

  basecase:
      if root is null, return 0
  each root can either:
      1. take left sum, add to root and pass up (return it)
      ||
      2. take right sum, add to root and pass up (return it)
      &&
      3. take both and update max

return max

time: 0(n)
space: 0(n) recursion stack worst case scenario its a completely 1 sided tree 0(n)

*/
