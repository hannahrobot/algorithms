/*NOTES:

extract order relations and insert them into an adjacency list

hashtable 1:
  char: char is a prefix for

hashtable 2:
  char: indegree number

if there is a cycle: return ''

topilogical sort

*/

/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
  const adjacencyList = {};
  const indegreeCount = {};

  //create datastructures and find all unique letters
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      const char = words[i][j];
      indegreeCount[char] = 0;
      adjacencyList[char] = [];
    }
  }

  //find all edges
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    //check that word2 is not a prefix of word1
    if (word1.length > word2.length && word1.startsWith(word2)) {
      console.log("here");
      return "";
    }
    //Find the first non match and insert the corresponding relation
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        adjacencyList[word1[j]].push(word2[j]);
        indegreeCount[word2[j]]++;
        break;
      }
    }
  }

  //build output with bfs and queue
  let output = "";
  const queue = [];
  for (let char in indegreeCount) {
    if (indegreeCount[char] === 0) {
      queue.push(char);
    }
  }

  while (queue.length) {
    const char = queue.shift();
    output += char;
    //decrement count for each child, if it reaches 0 add to queue
    adjacencyList[char].forEach((next) => {
      indegreeCount[next]--;
      if (indegreeCount[next] === 0) {
        queue.push(next);
      }
    });
  }

  //return output
  if (output.length < Object.keys(indegreeCount).length) {
    console.log("herhe2");
    return "";
  }
  return output;
};

/*NOTES
input: array of words with chars sorted lexographically by the alien language
output: string with letters representing the lexicographical order
edge cases: if order value is invalid (z is first and last): return an empty string, if array is empty return empty string

ex:
Input: words =
["wrt","wrf","er","ett","rftt"]
123.  123.  12.  123.  1234

*/
