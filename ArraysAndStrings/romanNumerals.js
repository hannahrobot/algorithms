/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const roman = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  let res = "";
  let i = 0;

  while (num > 0) {
    while (num >= values[i]) {
      res += roman[i];
      num -= values[i];
    }
    i++;
  }

  return res;
};

//time: 0(1) we always iterate through the same list, worst case is constant
//space: 0(1) the only extra space we use is building out the string, which is constant
