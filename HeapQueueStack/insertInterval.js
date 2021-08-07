/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

var insert = function (intervals, newInterval) {
  if (
    !intervals.length ||
    (intervals.length && newInterval[0] > intervals[intervals.length - 1][1])
  ) {
    intervals.push(newInterval);
    return intervals;
  }

  if (newInterval[1] < intervals[0][0]) {
    intervals.unshift(newInterval);
    return intervals;
  }

  const stack = [];

  intervals.forEach((interval, i) => {
    //while interval can be merged with top, pop & merge interval
    if (
      stack.length &&
      interval[0] <= stack[stack.length - 1][1] &&
      interval[1] >= stack[stack.length - 1][0]
    ) {
      const top = stack.pop();
      if (interval[1] < top[1]) {
        interval[1] = top[1];
      }
      if (interval[0] > top[0]) {
        interval[0] = top[0];
      }
    }
    //while newInterval can be merged with current interval, merge interval
    if (interval[0] <= newInterval[1] && interval[1] >= newInterval[0]) {
      if (interval[1] < newInterval[1]) {
        interval[1] = newInterval[1];
      }
      if (interval[0] > newInterval[0]) {
        interval[0] = newInterval[0];
      }
    }
    //push interval
    stack.push(interval);

    //if newInterval is greater than top and less than next interval, push newInterval
    if (
      newInterval[0] > stack[stack.length - 1][1] &&
      i < intervals.length - 1 &&
      newInterval[1] < intervals[i + 1][0]
    ) {
      stack.push(newInterval);
    }
  });

  return stack;
};

/*

insert new interval into array of non-overlapping intervals
assume initial sort is based on start time
questions: if it doesnt overlap with another interval, does it need to be placed in sorted order
edge cases: intervals is empty(push new interval on)

corner cases:
-new interval already exists (dont merge it)
-new interval overlaps with existing interval (merge it)
-new interval sits between two existing intervals but doesnt overlap (place it)

brute force:

stack []

if interval is bigger than last interval, push it on and return original arr

iterate through intervals and add each one to a stack
if top interval is less than new interval, and next interval[i] is greater than interval, push interval
  **if new[1] < top[0]
if top interval overlaps with current interval, pop it off, merge it, and push it back onto the stack, added is true
  **we are checking, is new[0] <= top[1] && new[1] >= top[0]

return stack

--------------
we could also do this without a stack in order to save space complexity, we would splice and add the interval in, or replace the overlapping interval with the new interval

*/
