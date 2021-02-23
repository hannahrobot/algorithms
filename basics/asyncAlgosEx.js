// Write a method to find the sum of all numbers in a multidimensional array of integers.

/*NOTES

input: multidimensional array of numbers
output: the sum of all numbers
edge cases: array is empty: return 0

ex:
input: [1, [1]]
output: 2

input: [1, [1, [2]]]
output: 4

input: []
output: 0


approach:

brute force:

  variable:
    sum
  iterate over the array
    if the element at the index is
    if its a number,
      add that to my sum
    array:
      recursively call multiDimSum func on that element
      add the return to my sum


    return sum;

 */

function multiDimSum(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      sum += arr[i];
    } else {
      sum += multiDimSum(arr[i]);
    }
  }

  return sum;
}

console.log(multiDimSum([]));
