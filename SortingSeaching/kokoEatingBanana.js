/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, H) {
  function canEatAll(speed) {
    let time = 0;
    for (let p of piles) {
      time += Math.ceil(p / speed);
    }
    return time <= H;
  }

  let l = 0;
  let r = Math.max(...piles); // when the max speed = biggest pile, it only needs 1h to eat each pile
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (!canEatAll(m)) l = m + 1;
    else r = m;
  }
  return l;
}
