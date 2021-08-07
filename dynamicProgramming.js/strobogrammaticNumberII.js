/**
 * @param {number} n
 * @return {string[]}
 */

var findStrobogrammatic = function (n) {
  const res = new Set();
  const hash = { 6: 9, 8: 8, 1: 1, 9: 6, 0: 0 };

  //find every strobogrammatic permutation of these numbers with n length
  const backtrack = function (path, open, close) {
    //basecase
    if (path.length === n) {
      res.add(path.join(""));
      return;
    }

    //if we are half way we can only add a single for the middle
    if (n % 2 !== 0 && path.length === Math.floor(n / 2)) {
      path.push("0");
      backtrack(path, open, close);
      path.pop();
      path.push("1");
      backtrack(path, open, close);
      path.pop();
      path.push("8");
      backtrack(path, open, close);
      path.pop();
    }

    if (open < Math.floor(n / 2)) {
      for (let key in hash) {
        if (key === "0") {
          if (path.length) {
            path.push(key);
            backtrack(path, open + 1, close);
            path.pop();
          }
        } else {
          path.push(key);
          backtrack(path, open + 1, close);
          path.pop();
        }
      }
    } else if (close < open) {
      path.push(hash[path[open - 1 - close]]);
      backtrack(path, open, close + 1);
      path.pop();
    }
  };

  backtrack([], 0, 0);

  return Array.from(res);
};

/*

create a hash with matching nums

{6: 9, 8: 8, 1: 1, 9: 6, 0:0}

almost like a palindrome check but the pointers (start, end) need to match the hash[curr] match

get every multiple of keys in hash between 0 and n

for every multiple, strobogrammatic palindrome check;

  while(start <= end) {
      hash[number[start]] !== number[end] ? return false
      number[start] === number[end] ? start ++ end --
  }

  return true

return res;




basecase:

  const res = new Set()

  const hash = {6: 9, 8: 8, 1: 1, 9: 6, 0:0}

  const isStob = function(number) {
      const str = number.toString()
      let start = 0;
      let end = str.length - 1

      while(start <= end) {
          hash[number[start]] !== number[end] ? return false
          number[start] === number[end] ? start ++, end --
      }

      return true
  }

  //basecase:
      if number is a decimal, return [];

  if(strobogrammatic palindrome check (n)){
      res.add(n)
  }

  //recursive
  hash.foreach(key => {
      if(n/key !== n) {
          res.add(findStrobogrammatic(n / key))
      }
  })

  return Array.from(res);



  **duplicates is an issue, fix with set


  **can only add zeros unbetween, not outside

*/
