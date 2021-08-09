/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function (s) {
  let lCount = 0;
  let aCount = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === "L" && i > 0 && s[i - 1] === "L") {
      lCount++;
    } else if (char === "L") {
      lCount = 1;
    }
    if (char === "A") {
      aCount++;
    }

    if (lCount === 3 || aCount === 2) {
      return false;
    }
  }

  return true;
};

/*



iterate throug string
  if char === l && char-1 === l
      lcount ++
  if char === 1 && char-1 !== l
      lcount = 1
    if char === a
      acount ++


  if lcount === 3, return false
  if a count === 2 return false


return true


*/
