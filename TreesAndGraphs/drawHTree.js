console.log("Practice makes Perfect!");

//input: x, y coordinates, starting length: num, depth:num
//output: 4 coordinates
//recurse over those coordinates for as many as the depth

//find two x edges:
//dividing the length it two, taking negative and positive side
//add the halved length to the y, and subtract that length from the y

/*
entry: 0, 1, 3
1st: 0 + 1, 0 - 1, 1 - 1, 1 + 1, 3 -2

*/

function h(x, y, length, depth) {
  if (depth === 0) {
    return;
  }

  const halfLength = length / 2;

  const newPositiveX = [x + halfLength, y];
  const newNegativeX = [x - halfLength, y];

  drawLine([newPositiveX, y], [newNegativeX, y]);
  drawLine([newPositiveX, y + halfLength], [newPositiveX, y - halfLength]);
  drawLine([newNegativeX, y + halfLength], [newNegativeX, y - halfLength]);

  h([newPositiveX, y + halfLength, halfLength, depth--]);
  h([newNegativeX, y + halfLength, halfLength, depth--]);
  h([newPositiveX, y - halfLength, halfLength, depth--]);
  h([newNegativeX, y - halfLength, halfLength, depth--]);
}

//draw my line

//recursive calls to each of the 4 edges
