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
 * @return {boolean}
 */
 var isSymmetric = function(root) {

  return isMirror(root, root)


};

const isMirror = function(node1, node2) {
  if(node1 === null && node2 === null) {
      return true
  }
  if(node1 === null && node2 !== null || node2 === null && node1 !== null) {
      return false
  }

  return node1.val === node2.val && isMirror(node1.left, node2.right) && isMirror(node1.right, node2.left)
}

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
 * @return {boolean}
 */
 var isSymmetric = function(root) {

  const q = [root, root]

  while(q.length) {

          const currL = q.shift()
          const currR = q.shift()


          if(!currL && !currR) {
              continue;
          }
          if(!currL && currR || currL && !currR) return false
          if(currL.val !== currR.val) {
              return false
          }

              q.push(currL.left)

              q.push(currR.right)

              q.push(currL.right)

              q.push(currR.left)

  }

  return true;

};

/*
iterative: bfs with queue
compare level by level forwards with backwards

*/
