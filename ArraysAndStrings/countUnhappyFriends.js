/**
 * @param {number} n
 * @param {number[][]} preferences
 * @param {number[][]} pairs
 * @return {number}
 */
var unhappyFriends = function (n, preferences, pairs) {
  const happyMap = new Array(n);
  let unhappy = 0;

  for (let [i, j] of pairs) {
    happyMap[i] = preferences[i].indexOf(j);
    happyMap[j] = preferences[j].indexOf(i);
  }

  for (let i = 0; i < happyMap.length; i++) {
    for (let j = 0; j < happyMap[i]; j++) {
      let partner = preferences[i][j];
      if (preferences[partner].indexOf(i) < happyMap[partner]) {
        unhappy++;
        break;
      }
    }
  }

  return unhappy;
};
