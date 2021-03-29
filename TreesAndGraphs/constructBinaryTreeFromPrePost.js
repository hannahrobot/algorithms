/**
 * Definition for a binary tree node.
 function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */
var constructFromPrePost = function (pre, post) {
  if (!pre.length) {
    return null;
  }

  const root = new TreeNode(pre[0]);
  if (pre.length === 1) {
    return root;
  }

  const indexOfLeftNode = post.indexOf(pre[1]);

  root.left = constructFromPrePost(
    pre.slice(1, indexOfLeftNode + 2),
    post.slice(0, indexOfLeftNode + 1)
  );
  root.right = constructFromPrePost(
    pre.slice(indexOfLeftNode + 2),
    post.slice(indexOfLeftNode + 1)
  );

  return root;
};

//input: arrays: pre and post order
//output: TreeNode head
//edge cases: pre is empty, post is empty: return null, pre is length 1

// Preorder (Root, Left, Right) : 1 + 2 4 5 +  3 6 7
// Postorder (Left, Right, Root) : 4 5 2 +  6 7 3  + 1

//
//hash post instead of searching for index each time
var constructFromPrePost = function (pre, post) {
  const map = {};
  let i = 0;

  for (let i = 0; i < post.length; i++) {
    map[post[i]] = i;
  }

  function callDFS(start, end) {
    if (start > end || i >= pre.length) return null;
    const node = pre[i++],
      idx = map[pre[i]];
    const tree = new TreeNode(node);
    if (idx < start || idx > end) return tree;
    tree.left = callDFS(start, idx);
    tree.right = callDFS(idx + 1, map[node] - 1);
    return tree;
  }
  return callDFS(0, post.length - 1);
};
