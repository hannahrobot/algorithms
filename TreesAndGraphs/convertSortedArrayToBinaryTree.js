//preorder construction, always choosing left half if even split

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  function helper(left, right) {
    if (left > right) {
      return null;
    }

    const pivot = Math.floor((left + right) / 2);

    const root = new TreeNode(nums[pivot]);
    root.left = helper(left, pivot - 1);
    root.right = helper(pivot + 1, right);
    return root;
  }

  return helper(0, nums.length - 1);
};

//time complexity: 0(n)
//space complexity: 0(n)
