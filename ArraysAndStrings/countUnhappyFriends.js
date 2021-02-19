//optimized:

var unhappyFriends = function (n, preferences, pairs) {
  let happyMap = new Array(n);
  for (let [i, j] of pairs) {
    happyMap[i] = preferences[i].indexOf(j);
    happyMap[j] = preferences[j].indexOf(i);
  }

  let unhappy = 0;
  for (let i = 0; i < n; i++) {
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
//------------------------------

/**
 * @param {number} n
 * @param {number[][]} preferences
 * @param {number[][]} pairs
 * @return {number}
 */
var unhappyFriends = function (n, preferences, pairs) {
  const pairsHash = {
    //if they prefer their[0] pair dont push
    //push their preferences that come before their pair if they do
  };
  let unhappyFriends = 0;

  //iterate over inital pairs and check for potential unhappy
  for (let i = 0; i < pairs.length; i++) {
    //add pairs to hash
    //add preferences to queue
    //good
    if (preferences[pairs[i][0]][0] !== pairs[i][1]) {
      let j = 0;
      pairsHash[pairs[i][0]] = [];
      while (preferences[pairs[i][0]][j] !== pairs[i][1] && j < n) {
        //{add preferences to hash, pair}
        pairsHash[pairs[i][0]].push(preferences[pairs[i][0]][j]);
        j++;
      }
    }
    if (preferences[pairs[i][1]][0] !== pairs[i][0]) {
      let j = 0;
      //add {preferences to hash, pair}
      pairsHash[pairs[i][1]] = [];
      while (preferences[pairs[i][1]][j] !== pairs[i][0] && j < n) {
        //{add preferences to hash, pair}
        pairsHash[pairs[i][1]].push(preferences[pairs[i][1]][j]);
        j++;
      }
    }
  }
  console.log("hash", pairsHash);
  //check if friend is also unhappy
  // iterate 1-n: if n exits in hash, check if its preferences prefer them, add unhappy friends, else move on
  for (let i = 0; i < n; i++) {
    if (pairsHash.hasOwnProperty(i)) {
      for (let j = 0; j < pairsHash[i].length; j++) {
        if (
          pairsHash.hasOwnProperty([pairsHash[i][j]]) &&
          pairsHash[pairsHash[i][j]].includes(i)
        ) {
          unhappyFriends++;
          break;
        }
      }
    }
  }

  //return count
  return unhappyFriends;
};

//input: preferences, pairs
//

// q [{friend: 3, potentialPref: 1}, [2, 1], [1, 3]]

//itierate through pairing
//first index, and then second index
//add pair to hash
//check if pair is in first preference index, if not, iterate through nums that come before pair num:
//push potential unhappy onto queue in array [potentual unhappy, potential preference
// q [{potentialUnhappyfriend: 3, potentialPref: 1}, [2, 1], [1, 3]]

//next iterative condition:
//shift front of queue off
//if preference exists: if shifted index [0] prefers 1 (its in greater index than its pair): //count +2
//else nothing
//repeat until q is empty

//move onto next pairing
