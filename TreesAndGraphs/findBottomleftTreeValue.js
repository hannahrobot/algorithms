//BFS
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

var findBottomLeftValue = function (root) {
  if (root === null) {
    return null;
  }

  let leftMost = null;
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const curr = queue.shift();
      if (i === 0) {
        leftMost = curr.val;
      }
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
  }

  return leftMost;
};

//time: 0(n)

//DFS

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
var findBottomLeftValue = function (root) {
  if (root === null) {
    return null;
  }

  let leftMost = root.val;
  let maxDepth = 0;

  const DFS = function (node, depth) {
    //basecase
    if (node === null) {
      return;
    }

    if (depth > maxDepth) {
      maxDepth = depth;
      leftMost = node.val;
    }

    //recursive case
    DFS(node.left, depth + 1);
    DFS(node.right, depth + 1);
  };

  DFS(root, 0);
  return leftMost;
};

/*
approach: BFS

do a level by level bfs
save the first node of each level

when our bfs is finished, our left node with point to the last


approach: DFS

variables:
  leftmost
  maxDepth

root left, right, (preorder)

track depth of each node
  if node is greater than previous max depth, update max depth and leftmost
  *this means it will update before hitting the next one, so if they are same level, only the leftmost on that level will be tracked



*/
