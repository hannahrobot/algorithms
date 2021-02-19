/**
 * @param {number} num
 * @return {string}
 */

//5000

var numberToWords = function (n) {
  const lengthIndex = [1000000000, 1000000, 1000, 100, 10];
  const numbersHash = {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
  };

  const doubleNumbersHash = {
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty",
    30: "Thirty",
    40: "Forty",
    50: "Fifty",
    60: "Sixty",
    70: "Seventy",
    80: "Eighty",
    90: "Ninety",
  };

  const lengthHash = {
    0: " Billion",
    1: " Million",
    2: " Thousand",
    3: " Hundred",
  };

  //*20
  //One hundred twenty
  //120
  //1120
  //one thousand one hundred twenty
  //120040

  function convertToWords(num, p, verbal) {
    //num = 120

    if (num === 0) {
      return "Zero";
    }

    while (num < lengthIndex[p]) {
      p++;
    }

    let firstWords = "";
    let smallerNumber = 0;

    //if number is greater than single numbers/teens/20s - break number down and return it
    if (p < lengthIndex.length - 1) {
      smallerNumber = Math.floor(num / lengthIndex[p]);
      firstWords = convertToWords(smallerNumber, p, "");
    }

    if (
      p === lengthIndex.length - 1 &&
      !doubleNumbersHash.hasOwnProperty(num)
    ) {
      smallerNumber = Math.floor(num / lengthIndex[p]) * 10;
      firstWords = convertToWords(smallerNumber, p, "");
      if (firstWords === "Zero") {
        firstWords = "";
      }
    }

    const length = p < lengthIndex.length - 1 ? lengthHash[p] : "";

    const verbalNumber = firstWords.length
      ? firstWords
      : doubleNumbersHash.hasOwnProperty(num)
      ? doubleNumbersHash[num]
      : numbersHash[num];

    if (p < lengthIndex.length - 1) {
      num -= lengthIndex[p] * smallerNumber;
    } else if (p === lengthIndex.length - 1 && smallerNumber > 0) {
      num -= smallerNumber;
    } else {
      num -= num;
    }

    let next = convertToWords(num, p, "");

    if (next === "Zero") {
      next = "";
    }

    return next.length
      ? verbalNumber + length + " " + next
      : verbalNumber + length;
  }

  return convertToWords(n, 0, "");
};

//time: 0(n) we traverse each individual number once
//space: 0(n) our recursion stack gets as high as the numbers length

/* NOTES
check highest num that is it greater or equal to

hash: 1-9, 10-90 words{
  1: 'One'
  2: 'Two'
  3: 'Three'
  4: 'Four'
  ...
  10: 'Ten'
  ...
  90: 'Ninety'
  100: 'Hundred'
}


arr: 1000000000, 1000000, 1000, 100


hash: index: words describing length{
  0:' Billion'
  1: ' Million'
  2: ' Thousand'
  3: ' Hundred'
}

*/
