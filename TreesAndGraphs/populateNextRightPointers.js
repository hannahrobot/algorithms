/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  BFS(root);
  return root;
};

var BFS = function (root) {
  const queue = [root];

  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      const curr = queue.shift();

      curr.next = queue[0];

      if (curr.left !== null) {
        queue.push(curr.left);
      }
      if (curr.right !== null) {
        queue.push(curr.right);
      }
    }
  }
};

//BFS
//if once i pop it off, theres nothing left, i point to null

//optimized space complexity - use existing pointers
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (root === null) {
    return root;
  }

  let leftmost = root;

  while (leftmost.left !== null) {
    head = leftmost;

    while (head !== null) {
      head.left.next = head.right;
      if (head.next !== null) {
        head.right.next = head.next.left;
      }
      head = head.next;
    }

    leftmost = leftmost.left;
  }
  return root;
};
