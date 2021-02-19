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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) {
    return [];
  }

  const resArr = [];

  function DFS(row, node) {
    if (node === null) {
      return;
    }

    if (resArr[row]) {
      resArr[row].push(node.val);
    } else {
      resArr[row] = [node.val];
    }

    DFS(row + 1, node.left);
    DFS(row + 1, node.right);
  }

  DFS(0, root);

  return resArr;
};

//recursive
//DFS
//resultarr index is aligned with level number
//return result

//time: 0(n) we iterate through each node once
//space: 0(n) we create a resarray and recurse

//------------------------------
//DFS recursive
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) {
    return [];
  }

  const hash = {};
  const resArr = [];
  let min = 0;
  let max = 0;

  function DFS(row, column, node) {
    if (node === null) {
      return;
    }
    if (row < min) {
      min = row;
    }
    if (row > max) {
      max = row;
    }

    if (hash.hasOwnProperty(row)) {
      hash[row].push(node.val);
    } else {
      hash[row] = [node.val];
    }

    DFS(row + 1, column - 1, node.left);
    DFS(row + 1, column + 1, node.right);
  }

  DFS(0, 0, root);

  for (let i = min; i <= max; i++) {
    resArr.push(hash[i]);
  }

  return resArr;
};

//recursive
//DFS
//track level (row,) and horizontal left right (column)
//keep levels in a hash, track min level and max level
//iterate through hash from min to max to push levels onto result
//return result

//time: 0(n) we iterate through each node once
//space: 0(n) we create a hash and res arr
//----------------------------------
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) {
    return [];
  }

  const resArr = [];
  const q = [root];

  while (q.length) {
    const size = q.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const curr = q.shift();
      if (curr.left !== null) {
        q.push(curr.left);
      }
      if (curr.right !== null) {
        q.push(curr.right);
      }
      level.push(curr.val);
    }
    resArr.push(level);
  }
  return resArr;
};

//input: root
//output: array with levels nested as individual arrays
//edge cases: root is null: return [[null]]?
//clarifications: dont include nulls in the output

//ex

//         4
//       2  .6
//      1 2 5 7
//
//[[4], [2, 6], [1,2,5,7]]
//
//

//resarr [[4], [2, 6], [1, 2, 5, 7]]

//q []

//size = 4

//level [1, 2, 5, 7]

//curr: 7

//approach:

//outer func variables:
//result array

//BFS helper function
//on each iteration:
//track the size --
//use a for loop - termination condition would be that i reaches size -- everything that happens inside this for loop is a level
//while in the for loop - shift off of quueue
//add left and right children to an array
//after for loop, push child array into result array --- these are all the level nodes
//termination condition: queue is empty

//time: 0(n) we iterate through each node once
//space: 0(n) we create a queue the size of the nodes
