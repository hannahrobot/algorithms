/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  const res = [];

  const DFS = function (nums, index, path, res) {
    res.push([...path]);
    for (let i = index; i < nums.length; i++) {
      path.push(nums[i]);
      DFS(nums, i + 1, path, res);
      path.pop();
    }
  };
  DFS(nums, 0, [], res);
  return res;
};

//backtracking

//time: 0(n x 2^n)
//space: 0(n x 2^n)

//---------
//cascading
var subsets = function (nums) {
  let output = [[]];

  for (e of nums) {
    output.map((el, i) => {
      el = [...el, e];
      output.push(el);
    });
  }
  return output;
};

//time: 0(n x 2^n)
//space: 0(n x 2^n)
