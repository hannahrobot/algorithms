//bottom up tabloidization
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] += Math.min(triangle[i + 1][j + 1], triangle[i + 1][j]);
    }
  }
  return triangle[0][0];
};

//top down memoization

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  const memo = {};

  function DFS(i, j) {
    if (j < 0 || j >= triangle[i].length) {
      return null;
    }

    if (i === triangle.length - 1) {
      return triangle[i][j];
    }

    if (memo.hasOwnProperty(`${i}${j}`)) {
      return memo[`${i}${j}`];
    }

    let result;
    const left = DFS(i + 1, j);
    const right = DFS(i + 1, j + 1);

    if (left === null) {
      result = right;
    } else if (right === null) {
      result = left;
    } else {
      result = Math.min(left, right) + triangle[i][j];
    }

    memo[`${i}${j}`] = result;

    return result;
  }

  return DFS(0, 0);
};

//you can only continue from j or j+1 in the next row

//input: triangle 2d array
//output: min path sum
//edge cases: if triangle is empty [] or [[]]: return 0?, if im traversing the rows and a row is less than j: discontinue path, if its a single num [[10]]: return 10, if its a single row: [[10, 3, 4]]: return the smallest int

//questions:
//are they sorted in any way: no
//

//ex:
//[[2],[3,4],[6,5,7],[4,1,8,3]]

//   2
//  3 4
// 6 5 7
//4 1 8 3

//approach:
//we need to find all paths and compare them to min
// brute:
//variables
//min sum
//nested for loop: i: row and j: column
//at each i iteration, i need to update i with the option to be j, or j+1, need to explore both possible outcomes

//return min sum
//----------------------------------------------
//variables:
//min sum
//DFS
//call dfs on root:
//dfs takes: i, j, sum=triangle[i][j]

//inside DFS:
//base case:
//if j is out of bounds: return;
//if i is out of bounds: update min sum

//add i, j to sum

//recursive case:
//recurse   i+1, j & i+1, j+1
//return min sum

//------------------------------------------- DFS memoization
//variables:
//memo{}
//DFS
//call dfs on root:
//dfs takes: i, j, sum=triangle[i][j]

//inside DFS:
//base case:
//if j is out of bounds: return -1;
//if i is out of bounds: return sum

//add i, j to sum

//recursive case:
//if memo exists
//if it doesnt return -1
//memo[i,j] = Math.min(recurseive(i+1, j; i+1, j+1; memo[i, j]))
//if memo doesnt exist;
//memo[i,j] = Math.min(recurseive(i+1, j; i+1, j+1;))

//return memo[i, j]
//return DFS(0, 0)

//------------------------------------------------backtracking

//nested for loop
//base case: if j> i.length-1: break j
//recursive case i+1, j+1; i+1, j; sum
//

//issue: it would not start from the base i everytime

//------------------------------------------------bottom up

// dp length : number of nodes
// dp els: sum
