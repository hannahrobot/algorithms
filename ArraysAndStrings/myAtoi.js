/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let pro = 1;
  let num = 0;

  let string = s.replace(/^\s+/, "");

  if (string[0] === "+" || string[0] === "-") {
    pro = string[0] === "-" ? -1 : 1;
    string = string.slice(1);
  }

  for (let i = 0; i < string.length; i++) {
    if (/[0-9]/.test(string[i])) {
      let singleNum = +string[i];
      if (pro > 0) {
        num *= 10;
        num += singleNum;
        if (num > Math.pow(2, 31) - 1) {
          num = Math.pow(2, 31) - 1;
          break;
        }
      } else {
        num *= -1;
        num *= -10;
        num -= singleNum;
        if (num < Math.pow(2, 31) * -1) {
          num = Math.pow(2, 31) * -1;
        }
      }
    } else {
      break;
    }
  }

  return num;
};

/*

input is string
convert string to 32bit signed int
if its greater than 32 bit + clamp it
if its less than -32 bit - clamp it

take the negative / positive sign off the start so u can include it at the end
ignore white space at the end

variables:
  pro: (1 or -1)
  num:

iterate forward through s
  1. ignore leading whitespace
  2. save leading positive or negative int as 1 or -1
  3. if its a num: take it off, multiple sum by ten, add it to sum
      if new num + sum makes it greater than 32 bit int, cap it
  4. if its a char other than num: break

multiply num by pro
return int


*/
