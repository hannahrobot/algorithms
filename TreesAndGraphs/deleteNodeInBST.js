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
 * @param {number} key
 * @return {TreeNode}
 */
const deleteNode = function (root, key) {
  if (root === null) {
    return root;
  }

  const DFS = function (node) {
    if (node === null) {
      return;
    }
    if (node.val === key) {
      swap(node);
    }
    if (key > node.val) {
      DFS(node.right);
    } else {
      DFS(node.left);
    }
  };
  DFS(root);
  return root;
};

const swap = function (node) {
  if (node.right !== null) {
    node.val = node.right.val;
    node = node.right;
    swap(node);
  } else if (node.left !== null) {
    node.val = node.left.val;
    node = node.left;
    swap(node);
  } else {
    node = null;
  }
};

//input: root of binary search tree, key to be deleted: key is an integer value
//output: root of tree not containing node
//base case: root is null, return null, key doesnt exist (return original root)

//solve in 0(log n) / height of tree time complexity

//search for the node to remove
//delete the node if it is found

//ex:

//                6
//              /   \
//             3     9
//            / \   / \
//           1   4 8   10

//key: 9
//swap 9 with 8

//check left if left is bigger than parent and smaller than right, if no, check if right is bigger than left and bigger than parent

//                6
//              /   \
//             3     8
//            / \   / \
//           1   4     10

//approach
//edge cases: if root equals null return
//dfs: find the node
//helper func: replace the node: swaps nodes down until it reaches null
//return the root
