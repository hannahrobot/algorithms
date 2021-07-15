/**
 * @param {string} s
 * @return {boolean}
 */
 var validPalindrome = function(s) {

  let left = 0
  let right = s.length-1

  while(left < right) {
      if(s[left] !== s[right]){
          return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right-1)
      } else {
          left ++
          right --
      }
  }
  return true
};

const isPalindrome = function(string, left, right) {

  while(left < right) {
      if(string[left] !== string[right]){
          return false
      }
      left ++
      right --
  }

  return true
}


/*


if its a different length more than one character return false



two pointers:

left pointer
right pointer

count how many mismatch


*/
