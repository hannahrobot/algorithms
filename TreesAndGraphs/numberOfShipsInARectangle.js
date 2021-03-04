/**
 * // This is Sea's API interface.
 * // You should not implement it, or speculate about its implementation
 * function Sea() {
 *     @param {integer[]} topRight
 *     @param {integer[]} bottomLeft
 *     @return {boolean}
 *     this.hasShips = function(topRight, bottomLeft) {
 *         ...
 *     };
 * };
 */

/**
 * @param {Sea} sea
 * @param {integer[]} topRight
 * @param {integer[]} bottomLeft
 * @return {integer}
 */
const countShips = function (sea, topRight, bottomLeft) {
  let ships = 0;

  const divideAndConquer = function (tr, bl) {
    const [right, top] = tr;
    const [left, bottom] = bl;

    const xCoord = Math.floor((right + left) / 2);
    const yCoord = Math.floor((top + bottom) / 2);

    //basecase if they are 1 apart and it contains a ship, ships ++
    if (right === left && top === bottom && sea.hasShips(tr, bl)) {
      ships++;
      return;
    }

    //top right quarter
    if (sea.hasShips(tr, [xCoord + 1, yCoord + 1])) {
      divideAndConquer(tr, [xCoord + 1, yCoord + 1]);
    }

    //top left quarter
    if (sea.hasShips([xCoord, top], [left, yCoord + 1])) {
      divideAndConquer([xCoord, top], [left, yCoord + 1]);
    }

    //bottom left quarter
    if (sea.hasShips([xCoord, yCoord], bl)) {
      divideAndConquer([xCoord, yCoord], bl);
    }

    //bottom right quarter
    if (sea.hasShips([right, yCoord], [xCoord + 1, bottom])) {
      divideAndConquer([right, yCoord], [xCoord + 1, bottom]);
    }
  };

  divideAndConquer(topRight, bottomLeft);

  return ships;
};

/*NOTES


divide and conquer

variables:
  count

helper func:
  basecase: 1x1 rectange && hasShips = true: count ++

  split given rectangle into 4 parts
  recurse over those 4 parts (if they have ships)

  continue only with rectangles that include ships
      stop when we hit 1x1 square or have no more squares to count


*/
