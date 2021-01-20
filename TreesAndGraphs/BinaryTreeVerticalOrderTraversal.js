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
var verticalOrder = function (root) {
  const hash = {};
  let min = 0;
  let max = 0;

  function BFS(columnn, root) {
    const queue = [[columnn, root]];

    while (queue.length) {
      const item = queue.shift();
      if (item.length) {
        const column = item[0];
        const node = item[1];

        if (node) {
          min = Math.min(column, min);
          max = Math.max(column, max);

          if (hash[column]) {
            hash[column].push(node.val);
          } else {
            hash[column] = [node.val];
          }

          if (node.left !== null) {
            queue.push([column - 1, node.left]);
          }
          if (node.right !== null) {
            queue.push([column + 1, node.right]);
          }
        }
      }
    }
  }

  BFS(0, root);

  const res = [];

  for (let i = min; i <= max; i++) {
    const arr = [];
    if (hash[i]) {
      hash[i].forEach((el) => arr.push(el));
      res.push(arr);
    }
  }

  return res;
};

// -2: [2, 4]
// -1: [1, 9]
// 0: [0, 3] [2, 0], [2, 1]
// 1: [1, 8]
// 2: [2, 7]

//DFS
//base case: node === null;
//add to hash by column: hash[column].push([[row, node]])
//min = Math.min (column, min)
//max = Math.max (column, max)
//recursive case: DFS: column -1, row +1, node.left
//DFS: column +1, row +1, node.right

//res
//for (let i = min; i <= max; i ++){
// hash[i].forEach(el => el[1])
//}

//return res.

//hash key is columns
//hash values are row, val
//it will be in order inside the hash because it should be read root left right, so the left will be added first

//i used BFS on the other one with a queue, but i think i did that because id have to order by values after, and the order left to right didnt matter

//

//priority:
//column
//row
//left to right

//start from root
//column = 0
//row = 0

//BFS with queue
//tracks row as it goes down
//tracks column left to right

//put in a hash based on column with a value of its row

//how will i track left to right
