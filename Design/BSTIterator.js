//optimized
//time: 0(0logn) in the begining we traverse the depth of the tree in worst case
//space: 0(logn) ^ same: our stack at worst case is the depth of the tree
//

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
 */
var BSTIterator = function (root) {
  this.stack = [];
  this.inorder_left(root);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  const curr = this.stack.pop();

  if (curr.right !== null) {
    this.inorder_left(curr.right);
  }
  return curr.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.stack.length > 0;
};

BSTIterator.prototype.inorder_left = function (root) {
  while (root !== null) {
    this.stack.push(root);
    root = root.left;
  }
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

//-------------------------------------------

//brute:
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
 */
var BSTIterator = function (root) {
  this.inorder = [];
  this.build(root);
  this.pointer = -1;
};
/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  this.pointer++;
  return this.inorder[this.pointer];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.pointer < this.inorder.length - 1;
};

BSTIterator.prototype.build = function (node) {
  if (node === null) {
    return;
  }
  this.build(node.left);
  this.inorder.push(node.val);
  this.build(node.right);
};
/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

//input: root,
//output: next: moves pointer to right(inorder) and returns number, hasnext returns true or false whether there is a number to the right with the in order traversal

//inorder = left, root, right
