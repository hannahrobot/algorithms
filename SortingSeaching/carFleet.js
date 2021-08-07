/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */

var carFleet = function (target, position, speed) {
  const time = new Array(position.length);
  const sorted = new Array(target + 1).fill(null);
  let fleets = 0;

  for (let i = 0; i < time.length; i++) {
    time[i] = (target - position[i]) / speed[i];
    sorted[position[i]] = i;
  }

  let curr = 0;

  //iterate through moves, if next is more moves, fleets --
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i] !== null) {
      if (time[sorted[i]] > curr) {
        fleets++;
        curr = time[sorted[i]];
      }
    }
  }

  return fleets;
};

/*

time: 0(target)
space: 0(target)


feets = position.length

make an array of how many moves it will take to get to target (by i)
sort array by position
  iterate through moves
      if the next car has more moves than max, fleets ++

return fleets



*/
