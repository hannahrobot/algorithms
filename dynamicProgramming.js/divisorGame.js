//time: 0(1)
//space: 0(1)

/**
 * @param {number} N
 * @return {boolean}
 */
var divisorGame = function (N) {
  return N % 2 === 0;
};

//input: n
//output is: true or false / even or odd
//edge cases: N is 0: return false

// approach:
//alice will win if its divisible by an odd number of nums: odd === true
//bob will win if its divisible by an even number of nums: even === false;

//ex:
//28

//helper function to find the amount of divisible nums
//variables: tmp = num (tmp = num/2 ?), count: how many turns

//at each iteration:
//decrement tmp
//
//if its divisible increment count and update num, if its not divisible: continue to decrement until you find one
//termination condition: n === 1: return 1
//return count
