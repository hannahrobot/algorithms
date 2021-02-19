/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  //add backward and carry number

  let num1Idx = num1.length - 1;
  let num2Idx = num2.length - 1;
  let carry = 0;
  let res = "";

  while (num1Idx >= 0 || num2Idx >= 0) {
    const x = num1Idx < 0 ? 0 : num1[num1Idx];
    const y = num2Idx < 0 ? 0 : num2[num2Idx];

    let sum = parseInt(x) + parseInt(y) + carry;

    if (sum > 9) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }
    res = sum.toString() + res;
    num1Idx--;
    num2Idx--;
  }

  if (carry === 1) {
    res = carry.toString() + res;
  }

  return res;
};

//input: positive integers as string, num1, num2
//output: sum of two integers
//edge cases: both are empty strings, one is empty string,

//ex:
//'101'
//'25'
//answer: 126

//parse int cant parse big nums

//approach

//variables:
//num1pointer
//num2pointer
//carry

//both pointers start at the end of the nums and iterate backwards together
//carry takes carry (0 or one) if the added num is bigger than 9 its a 1, otherwise its a 0
//iterate backwards until one or both pointers is at 0
//after one pointer hits 0, we must add the carry to the string thats left and continue to add those
