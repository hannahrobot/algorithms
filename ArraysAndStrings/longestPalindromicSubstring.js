//brute force
//nested loop
//time: 0(n^2)
//space: 0(1)

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let palindrome = "";

  function isPalindrome(i, j) {
    while (s[i] === s[j] && i < j) {
      i++;
      j--;
    }
    if (s[i] === s[j]) {
      return true;
    } else {
      return false;
    }
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < s.length; j++) {
      if (isPalindrome(i, j) && j - i + 1 > palindrome.length) {
        palindrome = s.slice(i, j + 1);
      }
    }
  }

  return palindrome;
};

/* notes



  func: is palindrome
      while(start === end && start < end){
          start ++
          end --
      }
      if(start === end){
          if(j-i > palindome.length){
              palindrome = slice(i, j+1)
              return true
          }
      }
      return false



find the palindromes
search using backtracking and check each substring
as i search - if its longer, update my palidrome
return the biggest palidrome

//brute force
outer func
  variables:
      maxPalindrome:

  nested for loop
      i
          j
              compare inside for loop using pointers from i><j
              if its a palindrome:
                  update longest palindrome

sliding window
  b
  ba
  bab: is a palindrome
       the only way we can beat this is if we find a bigger palindrome, increase to 4 and check sliding window 4
  baba: outer pointers dont match
  abad: outer pointers dont match

  longest palindrome is bab


  cbbd

  c
  cb
  bb is a palindeome
  cbb
  bbd

  bb is longest palindrome
  //-----------------------------------


  while(isPalindrome){
      increase sliding window size
  }


  func: is palindrome
      while(start === end && start < end){
          start ++
          end --
      }
      if(start === end){
          if(j-i > palindome.length){
              palindrome = slice(i, j+1)
              return true
          }
      }
      return false



*/
