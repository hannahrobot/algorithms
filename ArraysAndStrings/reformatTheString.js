/**
 * @param {string} s
 * @return {string}
 */
var reformat = function (s) {
  const numsArray = [];
  const lettersArray = [];
  let output = "";

  for (let i = 0; i < s.length; i++) {
    if (/[0-9]/.test(s[i])) {
      numsArray.push(s[i]);
    } else {
      lettersArray.push(s[i]);
    }
  }

  if (Math.abs(numsArray.length - lettersArray.length) >= 2) {
    return "";
  }

  let first;
  let second;

  if (numsArray.length > lettersArray.length) {
    first = numsArray;
    second = lettersArray;
  } else {
    first = lettersArray;
    second = numsArray;
  }

  while (first.length || second.length) {
    const firstEl = first.shift();
    const secondEl = second.shift();
    output += firstEl;
    output += secondEl ? secondEl : "";
  }

  return output;
};

/*

time: 0(n)
space: 0(n)

vars
  nums array
  letters array
  output = ''

iterate through s
  add nums to num array
  add letters to letter array

if Math abs numsarray.length - lettersarr.length >= 2
  return false

let first;
let second;

figure our which one is longer and start with that one
if(numsarray.length > letters array.length){
  first = numsarray
  second = letters array
} else {
  first = lettersarray
  second = numsarray
}

while(first.length && second.length) {
  const firstEl = first.shift()
  const secondEl = second.shift()

  output += first
  output += secondEl ? secondEl : ''
}

return output

*/
