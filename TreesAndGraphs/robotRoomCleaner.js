/**
 * // This is the robot's control interface.
 * // You should not implement it, or speculate about its implementation
 * function Robot() {
 *     // Returns true if the cell in front is open and robot moves into the cell.
 *     // Returns false if the cell in front is blocked and robot stays in the current cell.
 *     @return {boolean}
 *     this.move = function() {
 *         ...
 *     };
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void}
 *     this.turnLeft = function() {
 *         ...
 *     };
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void}
 *     this.turnRight = function() {
 *         ...
 *     };
 *
 *     // Clean the current cell.
 *     @return {void}
 *     this.clean = function() {
 *         ...
 *     };
 * };
 */
/**
 * @param {Robot} robot
 * @return {void}
 */
var cleanRoom = function (robot) {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const visited = new Set();
  /**
   * @return {void}
   */
  function goBack() {
    robot.turnRight();
    robot.turnRight();
    robot.move();
    robot.turnRight();
    robot.turnRight();
  }
  /**
   * @param {number[]} cell
   * @param {numver} prev
   * @return {void}
   */
  function backtrack(cell, prev) {
    visited.add(cell.join("|"));
    robot.clean();
    for (let d = 0; d < 4; d++) {
      const next = (prev + d) % 4;
      const nextCell = [
        cell[0] + directions[next][0],
        cell[1] + directions[next][1],
      ];
      if (!visited.has(nextCell.join("|")) && robot.move()) {
        backtrack(nextCell, next);
        goBack();
      }
      robot.turnRight();
    }
  }

  backtrack([0, 0], 0);
};
