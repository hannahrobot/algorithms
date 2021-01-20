//optimized iterative
//we only go as far as we need

var closestValue = function (root, target) {
  if (!root) return -1;
  let queue = [root];
  let minDiff = Infinity,
    closest = null;
  while (queue.length > 0) {
    let node = queue.shift();
    let diff = Math.abs(node.val - target);
    if (minDiff > diff) {
      minDiff = diff;
      closest = node.val;
    }
    if (target < node.val) {
      if (node.left) queue.push(node.left);
    } else {
      if (node.right) queue.push(node.right);
    }
  }
  return closest;
  // Time Complexity: O(H)
  // Space Complexity: O(1)
};

//iterative in order

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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  let minDiff = Infinity,
    closest = null;

  while (root !== null) {
    let diff = Math.abs(root.val - target);
    if (minDiff > diff) {
      minDiff = diff;
      closest = root.val;
    }
    if (root.val > target) {
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return closest;
};

//traverse the tree, depth first search - can see whether to go left or right based on num size
//update closest variable

//time complexity: 0(n)
//space complexity: 0(n)

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
 * @param {number} target
 * @return {number}
 */
var closestValue = function (root, target) {
  let closest = root.val;

  const DFS = function (node) {
    if (node.left !== null) {
      DFS(node.left);
    }
    closest =
      Math.abs(node.val - target) < Math.abs(closest - target)
        ? node.val
        : closest;

    if (node.right !== null) {
      DFS(node.right);
    }
  };

  DFS(root);

  return closest;
};

//traverse the tree, depth first search - can see whether to go left or right based on num size
//update closest variable
