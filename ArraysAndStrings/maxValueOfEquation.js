/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var findMaxValueOfEquation = function (points, k) {
  let max = -Infinity;

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [xi, yi] = points[i];
      const [xj, yj] = points[j];

      const abs = Math.abs(xi - xj);
      if (abs <= k) {
        max = Math.max(max, yi + yj + abs);
      }
    }
  }
  return max;
};

/*

brute force:
  nested for loop:


  time: 0(n^2)
  space: 0(1)



  yi + yj + Math.abs(xi - xj)

  where Math.abs(xi - xj) <= k

  and 1 <= i < j <= points.length.



  vars:
  max = 0

  loop: i
      loop: j
          if Math.abs(xi-xj) <= k
              max = Math.max(yi + yj + Math.abs(xi-xj), max)

  return max


*/
