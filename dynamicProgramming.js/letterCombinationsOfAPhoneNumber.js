/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits.length) {
    return [];
  }

  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const letterArr = [];
  const res = [];

  for (let i = 0; i < digits.length; i++) {
    letterArr.push(map[digits[i]]);
  }

  const DFS = function (path, i) {
    //basecase
    if (i === letterArr.length) {
      res.push(path);
      return;
    }

    //recursiveCase
    for (let j = 0; j < letterArr[i].length; j++) {
      DFS(path + letterArr[i][j], i + 1);
    }
  };

  for (let i = 0; i < letterArr[0].length; i++) {
    DFS(letterArr[0][i], 1);
  }

  return res;
};

/*


digits = "23"
stringarr = ['abc', 'def']

'ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'


input: digits as a string
output: all possible letter combinations
questions: could there be duplicates in digits? yes
          do the selections of letters need to be in the order of the digits? yes
edge:


brute force:
we need to come up with every possible combination

vars:
  stringArr = []
  res = []

have a map that represents the letters that map to each digit

iterate through digits, build an array that represents the string associated with each digit


iterate through the first string in digits
  DFS(string[i](letter), 1)


dfs through arr of letterstrings: currentpath, index of stringArr
  basecase:
      if index of string array is the length of string array
          push currentPath to result

  recursivecase
      iterate through stringarr[i] starting from j=0
          at each iteration
              DFS(path +stringarr[i][j], i+1)


return res;


time: 0(n^2*L)
space: 0(n) recursion stack gets as big as the N


*/
