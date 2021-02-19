/**
 * // Definition for a Node.
 * function Node(val, left, right, random) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.random = random === undefined ? null : random;
 * };
 */

/**
 * @param {Node} root
 * @return {NodeCopy}
 */
var copyRandomBinaryTree = function (root) {
  if (root === null) {
    return null;
  }

  const copyHead = new NodeCopy(root.val, null, null, null);

  const map = new Map();

  map.set(root, copyHead);

  const createCopy = function (node, nodeCopy) {
    map.set(node, nodeCopy);

    if (node.left !== null) {
      const nextNode = new NodeCopy(node.left.val, null, null, null);
      nodeCopy.left = nextNode;
      createCopy(node.left, nodeCopy.left);
    }
    if (node.right !== null) {
      const nextNode = new NodeCopy(node.right.val, null, null, null);
      nodeCopy.right = nextNode;
      createCopy(node.right, nodeCopy.right);
    }
  };

  const copyRandomPointers = function (node, nodeCopy) {
    if (node === null) {
      return;
    }

    if (node.random !== null) {
      nodeCopy.random = map.get(node.random);
    }

    copyRandomPointers(node.left, nodeCopy.left);
    copyRandomPointers(node.right, nodeCopy.right);
  };

  createCopy(root, copyHead);

  copyRandomPointers(root, copyHead);

  return copyHead;
};

//input: binary tree root
//output: deep copy of binary tree
//edge cases: cycling from random pointers, root is null,

//             8
//            / \
//           7   10
//          / \  / \
//         4  8 6  11
//
//
//
//

//approach

//save object in hash, val is duplicate
//when you create random pointer, you make it the [random object] - value - which is the deep copy

//DFS
//if node is null - return

//node,
//left,
//right

//traverse the tree and create (node.left?) create node.left and then enter it with the primary tree

//DFS(node, copyNode)
//add hash[node] = nodecopy to our hash: the key is the original node object
//if node.left, create new copyNode, oldcopynode.left = newcopy node
//DFS(node.left, copyNode.left)

//traverse again and make random connections

//time: 0(n)
//space: 0(n)
