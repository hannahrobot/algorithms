//layer by layer
var spiralOrder = function (matrix) {
  const res = [];
  if (!matrix.length) {
    return res;
  }
  let r1 = 0;
  let r2 = matrix.length - 1;
  let c1 = 0;
  let c2 = matrix[0].length - 1;

  while (r1 <= r2 && c1 <= c2) {
    for (let c = c1; c <= c2; c++) res.push(matrix[r1][c]);
    for (let r = r1 + 1; r <= r2; r++) res.push(matrix[r][c2]);
    if (r1 < r2 && c1 < c2) {
      for (let c = c2 - 1; c > c1; c--) res.push(matrix[r2][c]);
      for (let r = r2; r > r1; r--) res.push(matrix[r][c1]);
    }
    r1++;
    r2--;
    c1++;
    c2--;
  }
  return res;
};

//javascript simple solution
var spiralOrder = function (matrix) {
  const res = [];
  const size = matrix[0].length * matrix.length;
  let right = 0;
  let left = matrix[0].length - 1;
  let bottom = matrix.length - 1;
  let top = 0;

  while (res.length < size) {
    for (let i = right; i <= left && res.length < size; i++) {
      res.push(matrix[top][i]);
    }
    top++;

    for (let i = top; i <= bottom && res.length < size; i++) {
      res.push(matrix[i][left]);
    }

    left--;

    for (let i = left; i >= right && res.length < size; i--) {
      res.push(matrix[bottom][i]);
    }

    bottom--;

    for (let i = bottom; i >= top && res.length < size; i--) {
      res.push(matrix[i][right]);
    }

    right++;
  }

  return res;
};

//simulation -  doesnt seem to work in javascript
var spiralOrder = function (matrix) {
  if (matrix.length === 0) {
    return res;
  }

  let R = matrix.length;
  let C = matrix[0].length;

  const seen = new Array(R).fill(new Array(C).fill(false));

  const res = [];

  // direction row
  const dr = [0, 1, 0, -1];

  //direction column
  const dc = [1, 0, -1, 0];

  let r = 0;
  let c = 0;
  let di = 0;

  for (let i = 0; i < R * C; i++) {
    res.push(matrix[r][c]);

    seen[r][c] = true;

    //As we move through the matrix, our candidate next position is (cr, cc)
    let cr = r + dr[di];
    let cc = c + dc[di];

    // If the candidate is in the bounds of the matrix and unseen, then it becomes our next position;
    if (0 <= cr && cr < R && 0 <= cc && cc < C && !seen[cr][cc]) {
      r = cr;
      c = cc;
      // otherwise, our next position is the one after performing a clockwise turn.
    } else {
      di = (di + 1) % 4;
      r += dr[di];
      c += dc[di];
    }
  }
  return res;
};
