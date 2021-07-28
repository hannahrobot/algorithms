//binary search, finds depth and checks if nodes at the bottom exist from the middle out
//Time complexity : 0(d^2) = 0(log^2 n) where d is a tree depth.
//Space complexity : 0(1)

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
const countNodes = function (root) {
  //if tree is empty
  if (root === null) return 0;

  let d = computeDepth(root);
  // if the tree contains 1 node
  if (d === 1) return 1;

  // Last level nodes are enumerated from 0 to 2**d - 1 (left -> right).
  // Perform binary search to check how many nodes exist.
  let left = 1,
    right = Math.pow(2, d) - 1;
  let pivot;
  while (left <= right) {
    pivot = left + Math.floor((right - left) / 2);
    if (exists(pivot, d, root)) {
      left = pivot + 1;
    } else {
      right = pivot - 1;
    }
  }
  // The tree contains 2**d - 1 nodes on the first (d - 1) levels
  // and left nodes on the last level.
  return Math.pow(2, d) - 1 + left;
};
// Last level nodes are enumerated from 0 to 2**d - 1 (left -> right).
// Return True if last level node idx exists.
// Binary search with O(d) complexity.
const exists = function (idx, d, node) {
  let left = 0,
    right = Math.pow(2, d) - 1;
  let pivot;
  for (let i = 0; i < d; i++) {
    pivot = left + Math.floor((right - left) / 2);
    if (idx <= pivot) {
      node = node.left;
      right = pivot;
    } else {
      node = node.right;
      left = pivot + 1;
    }
  }
  return node !== null;
};

const computeDepth = function (root) {
  let depth = 0;
  while (root.left !== null) {
    root = root.left;
    depth++;
  }
  return depth;
};
//---------------------------------------

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
const countNodes = function (root) {
  return root !== null ? 1 + countNodes(root.left) + countNodes(root.right) : 0;
};
//time: 0(n)
//space: 0(logn)

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
const countNodes = function (root) {
  let count = 0;

  const DFS = function (node) {
    if (node === null) {
      return;
    }
    count++;
    DFS(node.left);
    DFS(node.right);
  };
  DFS(root);
  return count;
};

//input: root
//output: int: count of nodes

//outer func:
//count variable
//inner func
//DFS
//increments count at each node
//return count




//-----------------
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
 var countNodes = function(root) {

  if(!root){
      return 0
  }
  if(!root.left && !root.right) {
      return 1
  }

  let curr = root
  let depth = 0

  //find depth of all levels
  while(curr) {
      curr = curr.left
      depth ++
  }

  let left = 1
  let right = Math.pow(2, depth-1) -1
  let pivot;

  //binary search inside binary search
  while(left <= right) {
      pivot = left + Math.floor((right - left) / 2)
      if(exists(pivot, depth-1, root)){
          left = pivot + 1
      } else {
          right = pivot - 1
      }
  }

  //return partial sum + left
  return Math.pow(2, depth-1) - 1 + left
};

const exists = function(idx, depth, node){
  let left = 0
  let right = Math.pow(2, depth) -1
  let pivot;

  for(let i = 0; i < depth; i ++) {
       pivot = left + Math.floor((right - left) / 2)
       if(idx <= pivot) {
           node = node.left
           right = pivot
       } else {
           node = node.right
           left = pivot + 1
       }
  }
  return node !== null
}


/*BRUTE

bfs or dfs, count all nodes


OPTIMIZED

find depth (left side)
size of tree is 2 ^ depth -1

binary search to find where last node ends on last level
-start from root, go right, if it has a left go left, left left untel bottom
  -if its the length of depth: go up and go right

  num bottom nodes = last level before last level: / 2, + 1 for each traversal right
                                                        - 1 for each traversal left
  stop when its 1 less than the length of depth



*/
