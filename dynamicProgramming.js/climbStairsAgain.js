//climbing stairs

//climbing stair case n steps to reach top
//each time clinb 1 or 2 steps
//input: n int of total steps of staircase (n is always bigger or equal to one)
//output: all of the distinct ways (int) that i can climb the stairs
//edge cases: n=1: return 1

//ex:

//n: 2
//1
//1,1
//output: 2

//n: 4
//1, 1, 1, 1
//2, 2
//1, 2, 1
//2, 1, 1
//1, 1, 2

//output: 5

//approach
//dynamic programming

//solution = until it hits 0 as a base case (n-1) (n-2)

//top down: base case 0:

//bottom up: base case n

//top down: n
//n = 0
//return 0
//

//1 + recursive(n-1)
//1 + recursive(n-2)

//return

//n = 3

//n=1 res 1
//n=2 res 2
//n=3 res 2

//n=4

//.        5
//.      4   3
//.     3 2 2 1
//.    2 1
//
//

//return 5

// function stairs(n) {

// //save the n's that ive seen
// const memo = {}

// const recurse = function(n){

//   //base case: n == 0, return 0: stop recursion, wont count that step
//   if(n === 1) {
//     return 1
//   }
//   if(n === 2) {
//     return 2
//   }

//   if(memo.hasOwnProperty(n)){
//     return memo[n]
//   } else {
//     memo[n] = stairs(n-1) + stairs(n-2)
//     return memo[n]
//   }

// }

//   return recurse(n)

// }

//n = 5

function stairs(n) {
  // const array = new Array(n +1)
  let min = 1;
  let max = 2;
  let sum = 0;

  for (let i = 3; i < n + 1; i++) {
    sum = min + max;
    min = max;
    max = sum;
  }
  return sum;
}

//time: 0(n)
//space: 0(1)

console.log(stairs(10));
//time: 0(2^n)
//space: 0(n)

///

//build an array the size of n
//
//1, 2, 3, 5, 8

//recursive

//return function(n-1) + (n-2)

///iterative
