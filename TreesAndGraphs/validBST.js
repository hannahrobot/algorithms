//Recursive Traversal with Valid Range
function validate(root, low, high) {
  // Empty trees are valid BSTs.
  if (root == null) {
    return true;
  }
  // The current node's value must be between low and high.
  if ((low != null && root.val <= low) || (high != null && root.val >= high)) {
    return false;
  }
  // The left and right subtree must also be valid.
  return (
    validate(root.right, root.val, high) && validate(root.left, low, root.val)
  );
}

function isValidBST(root) {
  return validate(root, null, null);
}
