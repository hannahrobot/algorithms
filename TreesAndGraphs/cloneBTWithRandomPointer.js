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

//iterative

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
  if (!root) {
    return null;
  }

  const map = new Map();
  const stack = [root];

  //make copies
  while (stack.length) {
    const node = stack.pop();
    const copyNode = new NodeCopy(node.val);

    map.set(node, copyNode);

    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }

  stack.push(root);

  //make next and random pointer connections
  while (stack.length) {
    const node = stack.pop();
    const copyNode = map.get(node);

    if (node.left) {
      copyNode.left = map.get(node.left);
      stack.push(node.left);
    }
    if (node.right) {
      copyNode.right = map.get(node.right);
      stack.push(node.right);
    }

    copyNode.random = map.get(node.random);
  }

  return map.get(root);
};

/*NOTES

input: root of a bt
output: root of a deep clone of bt
edge: root is null

ex:


approach: recursive DFS

  iterate through original tree (dfs)
      at each iteration:
      1. create a node copy of the current node
      2. store key: origNode, with value of copy node
      3. copy.next = recursive call: left and right calls
      4. return copy node

  iterate through original tree again (dfs or bfs)
      at each iteration
      1. get the nodecopy from our map(by using the original node as key)
      2. get the original nodes random pointed node from the map
      3. get the randomcopy node associated with the original from the map
      4. set current copy node.random to the random copy
      5. recursive call to go left and right on the original tree

  return map:orig head: value (which is the copy head)

approach: stack DFS



time: 0(n) we iterate through each node
space: 0(n) worst case our entire tree is one sided(stack) && we create a new list the size of orig
*/
