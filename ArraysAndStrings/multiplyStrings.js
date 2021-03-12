//combined multiplications and additiong with product array

var multiply = function (num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";
  const prod = Array(num1.length + num2.length).fill(0);
  let currIdx = prod.length - 1;

  for (let i = num1.length - 1; i >= 0; i--) {
    let idx = currIdx--;

    for (let j = num2.length - 1; j >= 0; j--) {
      const res = +num1[i] * +num2[j] + prod[idx];
      prod[idx] = res % 10;
      prod[--idx] += Math.floor(res / 10);
    }
  }
  return prod.join("").replace(/^0+/, "");
};

//long solution: separate multiplication and addition

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

/*
num1 = "123",
num2 = "456"
          0

base = '00'
products [738, ]

Output: "56088"
*/

var multiply = function (num1, num2) {
  let products = [];
  let longest = num1.length > num2.length ? num1 : num2;
  let smallest = longest === num1 ? num2 : num1;
  let base = "";

  for (let i = smallest.length - 1; i >= 0; i--) {
    let carry = 0;
    let product = base;
    for (let j = longest.length - 1; j >= 0; j--) {
      let subProduct = smallest[i] * longest[j] + carry;
      const singleNum = subProduct % 10;
      carry = Math.floor(subProduct / 10);
      console.log("carry + sn", carry, subProduct, singleNum);
      product = singleNum.toString() + product;
      console.log("product", product);
    }
    products.push(product);
    base += "0";
  }

  while (products.length > 1) {
    const firstNum = products.shift();
    const secondNum = products.shift();
    products.push(addNums(firstNum, secondNum));
  }

  function addNums(first, second) {
    let addCarry = 0;
    let result = "";
    const firstNum = first.split("");
    const secondNum = second.split("");

    while (firstNum.length || secondNum.length) {
      let num1 = firstNum.length ? Number(firstNum.pop()) : 0;
      let num2 = secondNum.length ? Number(secondNum.pop()) : 0;

      let sum = num1 + num2 + addCarry;

      if (sum > 9) {
        addCarry = 1;
      } else {
        addCarry = 0;
      }

      let singleNum = sum % 10;

      result = singleNum.toString() + result;
    }

    if (addCarry) {
      result = addCarry.toString() + result;
    }

    return result;
  }

  return products[0];
};

/*NOTES

input: num1 and num2 (string)
output: product of num1 and num2: (string)

ex:
Input:
num1 = "2",
num2 = "3"
Output: "6"

Input:
num1 = "123",
num2 = "456"
Output: "56088"

approach:

  because the length can exceed a 32 bit integer, we need to multiply the numbers individually

  take single numbers off the end, multiply them, and keep a carry variable to carry the first digit (either 0 or 1) if its a double digit
      if carry is 0 we
4
2

63
47

441

backwards nested for loop


carry 1
base 1


*/
