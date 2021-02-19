/**
 * @param {string[]} votes
 * @return {string}
 */
const rankTeams = function (votes) {
  if (votes.length === 1) return votes[0];

  const hash = {};

  for (let i = 0; i < votes.length; i++) {
    for (let j = 0; j < votes[0].length; j++) {
      const char = votes[i][j];
      if (hash.hasOwnProperty(char)) {
        hash[char][j]++;
      } else {
        hash[char] = new Array(votes[0].length).fill(0);
        hash[char][j]++;
      }
    }
  }

  const keys = Object.keys(hash);
  keys.sort((a, b) => {
    const A = hash[a];
    const B = hash[b];

    if (A > B) {
      return -1;
    } else if (A < B) {
      return 1;
    } else {
      if (a < b) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  return keys.join("");
};
/*
const compare = function(a, b) {
  if(a > b) {
      return 1
  } else {
      return -1
  }
}
*/
//naive
//use a hash to add teams to their rank
//hash{
//  A: [5, 0, 0]
//  B: [0, 2, 3]
//  C: [0, 3, 2]
//.  }

//approach:

//if theres one vote return one vote
//variables:
//    hash
//iterate through votes
//iterate through each character in votes
// if character doesnt exist in hash, create it with array the size of votes[i], add its j index ++
//if it exists, j index ++

//get hash keys and sort them by their number value number(turn their arrays into strings), then char code

//advanced
////use quick select to sort by frequency
