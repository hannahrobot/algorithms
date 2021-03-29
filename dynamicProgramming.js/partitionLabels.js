/**
 * @param {string} S
 * @return {number[]}
 */

var partitionLabels = function (S) {
  const hash = new Array(26).fill(-Infinity);

  for (let i = 0; i < S.length; i++) {
    hash[S.charCodeAt(i) - 97] = i;
  }

  let firstIndexOfPartition = 0;
  let tempMaxIndex = hash[S.charCodeAt(0) - 97];
  const output = [];

  for (let i = 0; i < S.length; i++) {
    if (i === tempMaxIndex) {
      output.push(tempMaxIndex - firstIndexOfPartition + 1);
      firstIndexOfPartition = i + 1;
      tempMaxIndex = hash[S.charCodeAt(i + 1) - 97];
    } else {
      tempMaxIndex = Math.max(tempMaxIndex, hash[S.charCodeAt(i) - 97]);
    }
  }

  return output;
};

/*
input: s
output: array of ints: sizes of partitions
edge: s is empty

*partition so that each sections doesnt have duplicates of another sections (letters can only appear in one part)

Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".


approach

hash
create an array 26 length = -Infinity

iterate through the string, get their indexes for duplicates(save max index)

variables:
firstIndexOfPartition = 0
outputarray
tempMaxindex = -Infinity
iterate again

1. hit a, temp max index = Math.max(tempMaxIndex, newChar's last index)
2. keep iterating and updating until we get to the temp max
   if i === tempMax: partition everything before it as a substring
       add its length to our output array
       update our first index to the next i

return our outputarray

time: 0(n)
space: 0(1)
*/
