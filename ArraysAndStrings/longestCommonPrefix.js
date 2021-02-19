//time: 0(n^2)
//space: 0(1)

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) {
    return "";
  }

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    let str = "";
    if (strs[i].length) {
      let j = 0;
      while (strs[i][j] === prefix[j] && j < strs[i].length) {
        str += strs[i][j];
        j++;
      }
    }
    prefix = str;
  }
  return prefix;
};

//input: array of strings
//output: longest common prefix
//edge cases: there is no common prefix (output empty string), input is empty: empty string,
//are these all lowercase?

//ex:

//['flower', 'flow', 'float']
//. flow.      flow.  flo

//'flo'

//['bob', 'kite', 'ambulence']
//''

//approach

//iterate through strs
//at each iteration:
//compare last prefix to this prefix: find common prefix
//use regex to match beginning - update prefix with its output
//termination condition: end of strs
//return prefix
