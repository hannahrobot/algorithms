/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
  let steps = 0;

  if (!points.length || points.length === 1) {
    return steps;
  }

  for (let i = 0; i < points.length - 1; i++) {
    const X = Math.abs(points[i][0] - points[i + 1][0]);
    const Y = Math.abs(points[i][1] - points[i + 1][1]);
    steps += Math.min(X, Y) + Math.abs(X - Y);
  }

  return steps;
};

//input: 2D array with indiced x, y
//output: minimum time in seconds
//edge cases: empty array, 1 nested,

//ex:
//[[1, 2], [2, 3], [3, 4]]
//output 2 seconds

//[[3, 4], [1, 1], [1, 1]]
//5

//approach

//variables: steps

//iteration:
//1. absolute val between x1, x2
//2. absolute val between y1, y2
//3. absolute val between X and Y
//4. update steps variable with step 3 absolute val
//termination condition: end of points array

//return steps

//time complexity: 0(n)
//space complexity: 0(1)
