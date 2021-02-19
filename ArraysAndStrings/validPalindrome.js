/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  if (s.length === 1 || !s.length) {
    return true;
  }

  let start = 0;
  let end = s.length - 1;

  const regex = /[a-zA-Z0-9]/;

  while (start < end) {
    while (start < end && !regex.test(s[start])) {
      start++;
    }
    while (start < end && !regex.test(s[end])) {
      end--;
    }

    if (start < end && s[start].toLowerCase() !== s[end].toLowerCase()) {
      return false;
    }

    start++;
    end--;
  }

  return true;
};

//input: string
//ouput: true false
//edge: empty string
//ex:

//hannah
//true

//racecar
//true

//flower
//false

//approach:
//two pointers
//one pointer at the end
//one pointer at the start
//on each iteration
//check if they match
//if they dont match return false
//termination condition: if pointers equal eachother
//return true (if it got through the entire loop)

//time: 0(n)
//space: 0(1)
