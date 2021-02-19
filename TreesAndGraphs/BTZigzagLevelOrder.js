//DFS recursive
//time: 0(n) we traverse every node
//space: 0(L) ignorning the res array, our recursive call stack gets as big as out tree levels

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

const zigzagLevelOrder = function (root) {
  if (root === null) {
    return [];
  }

  const res = [];

  const DFS = function (node, row) {
    if (node === null) {
      return;
    }
    //push it based on column
    if (res[row]) {
      row % 2 === 0 ? res[row].push(node.val) : res[row].unshift(node.val);
    } else {
      res[row] = [node.val];
    }

    if (node.left !== null) DFS(node.left, row + 1);
    if (node.right !== null) DFS(node.right, row + 1);
  };

  DFS(root, 0);

  return res;
};

//------------------------------

//BFS without reverse array
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
 * @return {number[][]}
 */

const zigzagLevelOrder = function (root) {
  if (root === null) {
    return [];
  }

  const res = [];

  const BFS = function (node) {
    const q = [node];
    let switchh = false;
    //create a while loop to iterate until length ends
    while (q.length) {
      //get the size
      const size = q.length;
      //create a level array
      const level = [];
      //loop over size

      for (let i = 0; i < size; i++) {
        const curr = q.shift();
        switchh ? level.unshift(curr.val) : level.push(curr.val);
        if (curr.left !== null) {
          q.push(curr.left);
        }
        if (curr.right !== null) {
          q.push(curr.right);
        }
      }

      //push level
      res.push(level);
      //toggle switch
      switchh = !switchh;
    }
  };

  BFS(root);

  return res;
};

//----------------------------

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

//         5
//       3   7
//      2 4 6 8
//     1   6   9
//
//
//
//output:[[5], [7, 3], [2, 4, 6, 8], [9, 6, 1]]
//left to right, right to left, left to right

//res = [[5],[7, 3], [2, 4, 6, 8], [9, 6, 1]]
//q = []
//switch = true
//size = 3
//level = [1, 6, 9]
//curr = []

const zigzagLevelOrder = function (root) {
  if (root === null) {
    return [];
  }

  const res = [];

  const BFS = function (node) {
    const q = [node];
    let switchh = false;
    //create a while loop to iterate until length ends
    while (q.length) {
      //get the size
      const size = q.length;
      //create a level array
      const level = [];
      //loop over size
      for (let i = 0; i < size; i++) {
        const curr = q.shift();
        level.push(curr.val);
        if (curr.left !== null) {
          q.push(curr.left);
        }
        if (curr.right !== null) {
          q.push(curr.right);
        }
      }

      //push level to result
      if (switchh) {
        res.push(level.reverse());
      } else {
        res.push(level);
      }

      //toggle switch
      switchh = !switchh;
    }
  };

  BFS(root);

  return res;
};

//input: root of BT
//output: zig zag level order traversal: in nested array form per level
//edge cases: input root is null: return empty array,

//ex:

//         5
//       3   7
//      2 4 6 8
//     1   6   9
//
//
//
//output:[[5], [7, 3], [2, 4, 6, 8], [9, 6, 1]]
//left to right, right to left, left to right

//approach
//variable:

//result array

//BFS helper function

//variables:
//q = array
//switch boolean: reverse the level or not: false
//

//iteratively
//while: q isnt empty
//record the size of my q: tells me how big my level is
// variable:
//level
//for loop: iterates the length of size
//shift the current node off the q
//add the value of current node to level
//with current node i push its children onto the q:
//termination condition: i reaches size

//check my switch boolean: if false, if true: reverse the level array before pushing
//push level to result array
//toggle my switch: true / false

//return result array

//time: 0(n)
//space: 0(n)

//-----------
//approach
//variable:

//result array

//BFS helper function

//variables:
//q = array
//switch boolean: reverse the level or not: false
//

//iteratively
//while: q isnt empty
//record the size of my q: tells me how big my level is
// variable:
//level
//check switch var: if its true: iterate right to left, if its false, left to right
//left to right
//for loop: iterates the length of size
//shift the current node off the q
//add the value of current node to level
//with current node i push its children onto the q: left child to right child
//termination condition: i reaches size

//right to left
//for loop: iterates backwards from length of size in the q
//splice the length off the queue, so i can iterate backwards over it
//add the value of current node to level
//with current node i push its children onto the q: right child to left child
//termination condition: i reaches less than 0

//push level to result array
//toggle my switch: true / false

//return result array
