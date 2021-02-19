/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }

  const hash = {};

  for (let i = 0; i < inorder.length; i++) {
    hash[inorder[i]] = i;
  }

  function construct(left, right) {
    if (left > right) {
      return null;
    }

    const val = preorder.shift();
    const index = hash[val];

    const root = new TreeNode(val);

    root.left = construct(left, index - 1);
    root.right = construct(index + 1, right);

    return root;
  }

  const val = preorder.shift();
  const index = hash[val];
  const left = construct(0, index - 1);
  const right = construct(index + 1, inorder.length - 1);
  const root = new TreeNode(val, left, right);

  return root;
};
//optimized: we store inorder values in a hash so we dont have to repeat indexOf in linear time, and we can look up vals in 0(1), we also save space by passing indexes instead of making slice copies

//time: 0(n) we traverse each of the nodes in our initial hash and as we build the tree
//space: 0(logn) because of recursion

//--------------------------------------
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }

  function construct(inord) {
    if (!inord.length) {
      return null;
    }

    const val = preorder.shift();
    const index = inord.indexOf(val);

    const root = new TreeNode(val);

    root.left = construct(inord.slice(0, index));
    root.right = construct(inord.slice(index + 1));

    return root;
  }

  const val = preorder.shift();
  const index = inorder.indexOf(val);
  const left = construct(inorder.slice(0, index));
  const right = construct(inorder.slice(index + 1));
  const root = new TreeNode(val, left, right);

  return root;
};

//time: 0(n)
//space: 0(logn)

// preorder = [9,20,15,7]
// inorder = [9,3,15,20,7]

//input: two arrays, preorder, inorder
//output: head of the tree
//edge cases: either list is empty: return null; if they are different lengths; return null;

/*
example:

preorder: root, left, right
inorder: left, root, right

preorder: root
inorder: the index of the root splits the tree in half

pre 3, 2, 1, 4, 5
in. 1, 2, 3, 4, 5

       3
      2 4
     1   5



preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]

  3
 / \
9  20
  /  \
 15   7

get our root from the first index of preorder

helper: build bst
our left is indexof(root)-1
our right is indexof(root) + 1

return root


*/
