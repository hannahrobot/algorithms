//one pass
//time: 0(n)
//space: 0(1)

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let i = 0;
  let j = 0;

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++;
      j++;
    } else {
      j++;
    }
  }

  return i >= s.length;
};

//input: two strings, s and t
//output: true or false: is s a subsequence of t
//edge cases: t is empty, s is emtpty,
//can s have duplicates? if yes, t can be any length, if no - if t is smaller than s we can return false
//can t have duplicates?

//ex:
//s: 'abc'
//t: 'aygnbdunc'
//true

//s: 'abc'
//t: 'bac'
//false

//s: 'axy'
//t: 'hinaby'
//false

//order matters

//approach:

//one pass:
//pointer on s: i
//pointer on t: j

//iterate through t, if s[i] === s[j] i++ & j++, else j++

//termination condition
//if i > s.length return true
//if j > t.length && i < s.length return false
