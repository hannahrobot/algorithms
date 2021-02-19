//simplified
//time: 0(n) we traverse every node
//space: 0(n) because of our hash which is 0(n), our recursion takes up 0(logn) space in the call stack (levels of the tree)
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  const hash = {};
  for (let i = 0; i < inorder.length; i++) {
    hash[inorder[i]] = i;
  }

  const recurse = function (start, end) {
    if (start > end) {
      return null;
    }

    const val = postorder.pop();
    const node = new TreeNode(val);

    node.right = recurse(hash[val] + 1, end);
    node.left = recurse(start, hash[val] - 1);
    return node;
  };

  return recurse(0, inorder.length - 1);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
const buildTree = function (inorder, postorder) {
  const rootVal = postorder[postorder.length - 1];
  const indexOfRootInorder = inorder.indexOf(rootVal);
  const indexOfRightPostorder = postorder.indexOf(
    inorder[indexOfRootInorder + 1]
  );
  const indexOfLeftPostorder = postorder.indexOf(
    inorder[indexOfRootInorder - 1]
  );
  const root = new TreeNode(rootVal);

  const recurse = function (ino, posto) {
    if (ino[0] === ino[1]) {
      return;
    }

    const rootVal = postorder[posto[1]];
    const idxOfRootInorder = inorder.indexOf(rootVal);
    const idxOfRightPostorder = postorder.indexOf(
      inorder[idxOfRootInorder + 1]
    );
    const idxOfLeftPostorder = postorder.indexOf(inorder[idxOfRootInorder - 1]);

    node = new TreeNode(root.val);

    node.left = recurse(
      [ino[0], idxOfRootInorder - 1],
      [posto[0], idxOfLeftPostorder]
    );
    node.right = recurse([idxOfRootInorder + 1], ino[1], [
      idxOfRightPostorder,
      posto[1] - 1,
    ]);

    return node;
  };

  //get left side of tree
  root.left = recurse([0, indexOfRootInorder - 1], [0, indexOfLeftPostorder]);

  //get right side of tree
  root.right = recurse(
    [indexOfRootInorder + 1, inorder.length - 1],
    [indexOfRightPostorder, postorder.length - 2]
  );

  return root;
};

//outerfunc
//create root
//get left side and call recurse
//get right side and recurse
//return root

//recursive func
//use indexes
//find root from the end of post
//split in order from root+1(right) and root-1(left)
//split post right by finding the index of first el in split inorder -end
//split post left by 0- finding the index of last el of left inorder

//input: 2 arrays of tree values, inorder, postorder
//output: tree that these two could make
//edge cases: in order is empty, post order is empty, they are both empty
////no duplicates

//ex:

//in order: left, root, right
//post order: left, right, root

//          5
//        /  .\
//      4.      6
//     / \     / \
//    3   6   3.  7
//
//inorder: 3, 4, 6, 5, 3, 6, 7
//postorder: 3, 6, 4, 3, 7, 6, 5
//
//
//

//    3
//   / \
//  9  20
//    /  \
//   15   7

//inorder: 9, 3, 15, 20, 7
//postorder: 9, 15, 7, 20, 3

//this is like the pre order post order one but backwards/

//we know our last inorder node is our last node on the right
//we know everything after the index of our last node(7) is our right most nodes, and the last node of post order is our root

//we know everything after the index of our root on in order is the right side of our tree

//get last node of post order
//find the index of that node in our inorder
//thats our root,

//recursively split the tree (root.left(everything to the left of that node in in order) root.right(everything to the right of that node in inorder))

//termination condition: node is null
