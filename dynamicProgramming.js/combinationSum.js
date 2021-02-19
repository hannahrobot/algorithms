//backtracking
//time: 0(n*T/M +1)
//space: 0(T/M)

//n: number of candidates
//T: target total
//M; minimum option from candidates

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const res = [];

  const backtrack = function (index, amount, path) {
    if (amount === 0) {
      res.push(path);
      return;
    }
    if (amount < 0) {
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      backtrack(i, amount - candidates[i], [...path, candidates[i]]);
    }
  };

  backtrack(0, target, []);

  return res;
};

//-------------------------------------------------
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const res = [];

  const DFS = function (i, amount, path) {
    if (amount === 0) {
      res.push(path);
      return;
    }
    if (amount < 0 || i >= candidates.length) {
      return;
    }

    DFS(i, amount - candidates[i], [...path, candidates[i]]);
    DFS(i + 1, amount, path);
  };

  DFS(0, target, []);

  return res;
};

//unique combination
//
