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
 * @param {number} k
 * @return {number}
 */
const kthSmallest = function (root, k) {
  let res = -1;
  let count = k;

  const DFS = function (node) {
    if (node === null) {
      return;
    }

    DFS(node.left);

    count--;
    if (count === 0) {
      res = node.val;
    }

    DFS(node.right);
  };

  DFS(root);
  return res;
};

//inorder traveral of the tree
//for each node - k--
//when k is zero return the node
