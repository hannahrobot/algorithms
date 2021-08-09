/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) {
    return true;
  }

  if (!p || !q) {
    return false;
  }

  if (p.val !== q.val) {
    return false;
  }

  const left = isSameTree(p.left, q.left);
  const right = isSameTree(p.right, q.right);

  return left === true && right === true;
};

/*

recursively

if(p.val !== q.val) {
  return false
}

const left = isSameTree(p.left, q.left)
const right = isSameTree(p.left, q.left)

return left === true && right === true

*/

//iterative
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const stack = [[p, q]];

  while (stack.length) {
    const [currp, currq] = stack.pop();

    if (!currp && !currq) {
      continue;
    }

    if (!currp || !currq) {
      return false;
    }
    if (currp.val !== currq.val) {
      return false;
    }

    stack.push([currp.left, currq.left]);
    stack.push([currp.right, currq.right]);
  }

  return true;
};
