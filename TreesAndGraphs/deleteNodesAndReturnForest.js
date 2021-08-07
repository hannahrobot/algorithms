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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  const output = [];
  const toDelete = new Set(to_delete);

  const recurse = function (node) {
    if (node == null) {
      return node;
    }

    node.left = recurse(node.left);
    node.right = recurse(node.right);

    if (toDelete.has(node.val)) {
      if (node.left) {
        output.push(node.left);
      }
      if (node.right) {
        output.push(node.right);
      }
      return null;
    }
    return node;
  };

  if (!toDelete.has(root.val)) {
    output.push(root);
  }

  recurse(root);

  return output;
};

/*

input: root, vals to delete
*all nodes have unique vals
output: array of roots in the remaining forest
questions:

approach:

vars:
outputArr: [root]
toDelete: new Set(to_delete)

iterate through the tree (inorder, preorder, or postorder - doesnt matter)

function: recurse

  if(!node){
      return;
  }

  left = node.left
  right = node.right

  if you reach a node that is in toDelete set:
  if(toDelete.has(node.val)){
      node = null
      if(left) {
          output.push(...delNodes(left, to_delete))
      }
      if(right) {
          output.push(...delNodes(right, to_delete))
      }
  } else {
      recurse(node.left)
      recurse(node.right)
  }

recurse(root)

return outPutArr


*/
