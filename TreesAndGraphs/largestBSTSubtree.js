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
var largestBSTSubtree = function (root) {
  const MIN = Number.MIN_SAFE_INTEGER;
  const MAX = Number.MAX_SAFE_INTEGER;

  const res = findLargest(root);

  return res[1];

  function findLargest(node) {
    if (node == null) return [true, 0, MAX, MIN];

    const [isBSTLeft, sizeLeft, lowerBoundLeft, upperBoundLeft] = findLargest(
      node.left
    );
    const [
      isBSTRight,
      sizeRight,
      lowerBoundRight,
      upperBoundRight,
    ] = findLargest(node.right);

    const lowerBoundNext = Math.min(lowerBoundLeft, node.val);
    const upperBoundNext = Math.max(node.val, upperBoundRight);

    const isBSTCurr =
      isBSTLeft &&
      isBSTRight &&
      node.val > upperBoundLeft &&
      node.val < lowerBoundRight;
    const sizeCurr = isBSTCurr
      ? sizeLeft + 1 + sizeRight
      : Math.max(sizeLeft, sizeRight);

    return [isBSTCurr, sizeCurr, lowerBoundNext, upperBoundNext];
  }
};
