/**
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
var validSquare = function (p1, p2, p3, p4) {
  // Distance formula: d(P, Q) = √ (x2 − x1)2 + (y2 − y1)2
  function dist(a, b) {
    return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
  }

  // Compute the 6 pt-pt distances (squared, since we don't care about actual distance value)
  const distances = [
    dist(p1, p2),
    dist(p1, p3),
    dist(p1, p4),
    dist(p2, p3),
    dist(p2, p4),
    dist(p3, p4),
  ];
  // Sort & check for non-zero (points must be distinct), check for four equal sides, check for two equal diagonals.
  distances.sort((a, b) => a - b);

  return (
    distances[0] &&
    distances[0] === distances[1] &&
    distances[0] === distances[2] &&
    distances[0] === distances[3] &&
    distances[4] === distances[5]
  );
};
