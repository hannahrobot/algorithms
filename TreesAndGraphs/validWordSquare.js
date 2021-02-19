/**
 * @param {string[]} words
 * @return {boolean}
 */
var validWordSquare = function (words) {
  for (let r = 0; r < words.length; r++) {
    if (words[r].length > words.length) {
      return false;
    }
    for (let c = r + 1; c < words.length; c++) {
      if (words[r][c] !== words[c][r]) {
        return false;
      }
      if (!words[r][c] && !words[c][r]) {
        break;
      }
    }
  }
  return true;
};

//input: array of words: strings
//output: true or false
//edge cases: if theres one word: true?

//lowercase

//ex:

//false

//true

//true

//what is k?

//approach

//grid problem
//in order to traverse the first row, we need a for loop with a nested loop(r1, j1-n)
//in order to traverse the first column, we need a for loop with a nested loop (r1-n, j)

//variables
//r (i) (row)
//c (j) (column ++)

//we swap them to compare the column word and row word on each iteration

//use a while loop and pointers

//outer for loop (increments row)
//inner for loop (increments collumn)
//use for loop because it can terminate when there is no more length

//on each iteration
//we need to check to make sure we dont get a reference error here when we are swapping them around
//word[row].length < c+1 (return false) of words[r][c] !== words[c][r]
//return false
//c++

//outer loop r++

//edge case in here is if r is past words.length or c is past words[r].length: so we dont get a reference error

//if we get to the end return true
