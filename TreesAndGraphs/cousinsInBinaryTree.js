//BFS - improved usage but same big 0, it can stop at an earlier level when we know they wont be cousins
//time: 0(n)
//space: 0(n)

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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

var isCousins = function (root, x, y) {
  const q = [root];

  while (q.length) {
    let siblings = false;
    let cousins = false;

    const size = q.length;

    for (let i = 0; i < size; i++) {
      const node = q.shift();

      if (node === null) {
        siblings = false;
      } else {
        if (node.val === x || node.val === y) {
          if (!cousins) {
            siblings = true;
            cousins = true;
          } else {
            return !siblings;
          }
        }

        if (node.left !== null) {
          q.push(node.left);
        }
        if (node.right !== null) {
          q.push(node.right);
        }

        q.push(null);
      }
    }
    if (cousins) {
      return false;
    }
  }
  return false;
};

//DFS with recursive pruning
//time: 0(n)
//space: 0(n)

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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */

var isCousins = function (root, x, y) {
  let recordDepth = -1;
  let isCousin = false;

  function DFS(node, depth) {
    if (node === null) {
      return false;
    }
    if (recordDepth !== -1 && depth > recordDepth) {
      return false;
    }

    if (node.val === x || node.val === y) {
      if (recordDepth === -1) {
        recordDepth = depth;
      }
      return recordDepth === depth;
    }

    let left = DFS(node.left, depth + 1);
    let right = DFS(node.right, depth + 1);

    if (left && right && recordDepth !== depth + 1) {
      isCousin = true;
    }
    return left || right;
  }

  DFS(root, 0);
  return isCousin;
};
