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
var sumEvenGrandparent = function (root) {
  let resSum = 0;

  const DFS = function (node, parent, grandparent) {
    if (node === null) {
      return;
    }

    if (grandparent !== null && grandparent.val % 2 === 0) {
      resSum += node.val;
    }
    DFS(node.left, node, parent);
    DFS(node.right, node, parent);
  };

  DFS(root, null, null);

  return resSum;
};

//time: 0(n): we iterate through each node
//space: 0(logn): our call stack takes 0(logn) space from recursion

//optimization
//DFS
//track parent & grandparent
//basecase: if node = null
//if nodes grandparent !== null and is even add it to the sum
//recurse left and right

//---------------------------------

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
var sumEvenGrandparent = function (root) {
  let resSum = 0;

  const BFS = function (root, p, g) {
    const q = [{ node: root, parent: p, grandparent: g }];

    while (q.length) {
      const size = q.length;

      for (let i = 0; i < size; i++) {
        const { node, parent, grandparent } = q.shift();

        if (grandparent !== null && grandparent.val % 2 === 0) {
          resSum += node.val;
        }

        if (node.left !== null) {
          q.push({ node: node.left, parent: node, grandparent: parent });
        }

        if (node.right !== null) {
          q.push({ node: node.right, parent: node, grandparent: parent });
        }
      }
    }
  };

  BFS(root, null, null);

  return resSum;
};

//input: root of Binary tree
//output: Int: sum of all nodes with even valued grandparent
//edge cases: 2 levels or less (no grandparents), root is null, there are no even grandparents: return 0

//ex:

//.       6
//       / \
//      4.  8
//     / \ / \
//    2.  45  9
//
//grandparent is 6, its even, sum up 4 grandchildren: 20

//approach:

//BFS - level by level

//use the q size and a for loop to track when we are on each level

//keep track of grandparent,
// pass down parent & grandparent: parents parent
// rotate as you pass down

//if they have a grandparent- check if its even, if yes, add current node.val to resSum
//termination condition: q.length is 0

//return resSum

//time: 0(n): we iterate through each node
//space: 0(n): we add each node to the q
