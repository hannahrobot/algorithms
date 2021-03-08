/*NOTES

given arr of ints arr
calculate for each index i: the product of all ints: except the int at that index i

implement func arrayOfArrayProducts(arr)
returns array of the products


ex:
input:  [8, 10, 2]
output: [20, 16, 80]
edge: if array is length1: [],

left:   [84, 12, 4, 1]
right:  [1, 2, 14, 42]

ans: [84, 24, 56, 42]

input:  [2,  7,  3,  4]
output: [84, 24, 56, 42]


*solve without division

 */

function arrayOfArrayProducts(arr) {
  const left = new Array(arr.length);
  const right = new Array(arr.length);

  //first of right needs to be 1
  left[left.length - 1] = 1;
  left[left.length - 2] = arr[arr.length - 1];
  right[0] = 1;
  right[1] = arr[0];
  //last index of left needs to be 1

  //right
  for (let i = 2; i < right.length; i++) {
    right[i] = arr[i - 1] * right[i - 1];
  }

  //left
  for (let i = left.length - 3; i >= 0; i--) {
    left[i] = arr[i + 1] * left[i + 1];
  }

  //output
  for (let i = 0; i < left.length; i++) {
    left[i] = left[i] * right[i];
  }

  return left;
}

console.log(arrayOfArrayProducts([2, 7, 3, 4]));
