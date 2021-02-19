/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  const parentMap = new Map();

  const buildParentMap = function (node, parent) {
    if (node === null) {
      return null;
    }

    parentMap.set(node, parent);
    parentMap.set(buildParentMap(node.left), node);
    parentMap.set(buildParentMap(node.right), node);

    return node;
  };

  buildParentMap(root, null);
  const ancestors = new Set();

  while (p !== null) {
    ancestors.add(p);
    p = parentMap.get(p);
  }

  while (!ancestors.has(q)) {
    q = parentMap.get(q);
  }
  return q;
};

//time: 0(n) we traverse each node
//space: 0(log n) from set and hash

//-----------------------------------------------------

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  let commonAncestor = null;

  function recurseTree(node) {
    if (node === null) {
      return false;
    }
    const left = recurseTree(node.left) ? 1 : 0;
    const right = recurseTree(node.right) ? 1 : 0;
    const mid = node === p || node === q ? 1 : 0;

    if (left + right + mid >= 2) {
      commonAncestor = node;
    }

    return mid + left + right > 0;
  }

  recurseTree(root);
  return commonAncestor;
};

//time: 0(n) we traverse each node
//space: 0(n) This is because the maximum amount of space utilized by the recursion stack would be NN since the height of a skewed binary tree could be NN.
