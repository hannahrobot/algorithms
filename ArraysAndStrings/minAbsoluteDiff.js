//optimized: one pass no hashtable
//time complexity: 0(n log n) because of sort
//space complexity: 0(n) because of out array, but saves more space than a hash

/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  let out = [];
  let min = Infinity;

  arr.sort((a, b) => a - b);

  //get min
  for (let i = 0; i < arr.length; i++) {
    const abs = arr[i + 1] - arr[i];
    if (abs < min) {
      min = abs;
      out = [[arr[i], arr[i + 1]]];
    } else if (abs === min) {
      out.push([arr[i], arr[i + 1]]);
    }
  }

  return out;
};

//optimized one pass / hash
//time complexity: 0(n log n) because of sort
//space complexity: 0(n) because of hash

/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  const hash = {};
  let min = Infinity;

  arr.sort((a, b) => a - b);

  //get min
  for (let i = 0; i < arr.length; i++) {
    const abs = arr[i + 1] - arr[i];
    if (abs < min) {
      min = abs;
      hash[min] = [[arr[i], arr[i + 1]]];
    } else if (abs === min) {
      hash[min].push([arr[i], arr[i + 1]]);
    }
  }

  return hash[min];
};

//brute force
//time complexity: 0(n^2)
//space complexity: 0(n^2)

/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  const hash = {};
  let min = Infinity;

  arr.sort((a, b) => a - b);

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const abs = Math.abs(arr[i] - arr[j]);
      if (abs <= min) {
        min = abs;
        const pair = arr[i] < arr[j] ? [arr[i], arr[j]] : [arr[j], arr[i]];
        if (hash.hasOwnProperty(abs)) {
          hash[abs].push(pair);
        } else {
          hash[abs] = [pair];
        }
      }
    }
  }

  return hash[min];
};
//input: arr of distinct integers
//output: 2D arr ascending order, b-a == min absolute different
//edge cases: input empty, return empty array, input 0, return empty array

//clarification:
//negative numbers? no
//all nums unique? yes

//[4, 2, 1, 3]

//[1, 2, 3, 4]
//if the array is sorted, the minimum different will always be adjacent

//1 is the min absolute dif
//find all pairs that have this diff
//[1, 2], [2, 3], [3, 4]

//approach:
//iterate through and find min absolute diff between any
//hash table for each number
//push numbers min absolute combinations - check them in order
//return object keys sorted
