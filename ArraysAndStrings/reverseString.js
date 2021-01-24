/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) {
      [s[start], s[end]] = [s[end], s[start]];
    }
    start++;
    end--;
  }

  return s;
};
//time: 0(n)
//space: 0(1)

//input: string
//output: reversed string
//must do it in place - 0(1) space

//edge cases:
//string is empty
//string is a palindrome
//string is all lowercase?
//what if its uneven / even? i wouldnt swap the middle

//[h e l l o]
//[o l l e h]

//approach:
//use pointers

//variable:
//start pointer
//end pointer

//iteration
//iterative case: while the start pointer !== end pointer
//use us6 to swap in place
//increment start, decrement end

//return the modified string
