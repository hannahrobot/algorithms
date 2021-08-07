/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var numberOfPatterns = function (m, n) {
  /*
      1,2,3
      4,5,6
      7,8,9
  */

  const betweenHash = {
    "1->3": "2",
    "1->9": "5",
    "1->7": "4",
    "2->8": "5",
    "3->1": "2",
    "3->7": "5",
    "3->9": "6",
    "4->6": "5",
    "6->4": "5",
    "7->1": "4",
    "7->3": "5",
    "7->9": "8",
    "8->2": "5",
    "9->3": "6",
    "9->1": "5",
    "9->7": "8",
  };

  const visited = new Set();
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const res = new Set();

  const backtrack = function (path) {
    //basecase:
    if (path.length === n) {
      res.add(path);
      return;
    }

    if (path.length >= m) {
      res.add(path);
    }

    //add key to visited
    visited.add(path[path.length - 1]);

    keys.forEach((key) => {
      if (!visited.has(key)) {
        if (betweenHash[`${path[path.length - 1]}->${key}`]) {
          //if theres a between num
          if (visited.has(betweenHash[`${path[path.length - 1]}->${key}`])) {
            //if visited between num
            backtrack(path + key);
          }
        } else {
          // if they are adjacent or dont have a through center between key
          backtrack(path + key);
        }
      }
    });

    visited.delete(path[path.length - 1]);
  };

  backtrack("");

  return res.size;
};

/*

DFS / backtracking
count valid unique paths of at least m keys and at most n keys
if it goes in a straight line (horizontal, vertical, diagonal) from 1 key to another and there is a key inbetween, that key must previously have been selected


grid:

1,2,3
4,5,6
7,8,9

vars:
const = everyPermutation
const = validPermutations

(backtracking 1)
create every possible combination of keys of at least m and at most n [1,2,3,4,5,6,7,8,9]

(backtracking 2)
validate list of possible combinations via DFS on the grid


betweenHash = {}


optimized:
-might be able to do it with one backtracking process, as we add the keys to permutation, we can check to make sure they are valid
-theres a finite amount of going through the other keys
-we can create a hash that shows the prerequisite for keys going between
-we can keep a visited hash while we are building our possibility so we can check if between was visited in 0(1)


pseudoCode

vars:
m=
n=
const betweenHash = {}
const visited = new Set()
const keys = [1,2,3,4,5,6,7,8,9]
const res = new Set()


backtrack function: path

  basecase:
      if keys in path are === length n
          add path to res
          return;

  count:
      if keys in path are >= length m
          add path to res

  add key to visited

  iterate through keys starting from 0
      if(keys[i] !== path.top && !visited.has(keys[i])){
          if(betweenhash[path.top->keys[i]]){
              visited.has(betweenhash[path.top->keys[i]]){
                  backtrack(path + keys[i])
              }

          } else { // if they are adjacent or dont have a through center between key
              backtrack(path + keys[i], i+1)
          }
      }

  delete key from visited

return res.size

*/
