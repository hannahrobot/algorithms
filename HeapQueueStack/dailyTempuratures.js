//use a stack that saves temp and index info

var dailyTemperatures = function (T) {
  const result = new Array(T.length).fill(0);
  if (T.length < 2) return result;
  const mono = [];
  T.forEach((temp, index) => {
    while (mono.length && mono[mono.length - 1].temp < temp) {
      const pop = mono.pop();
      result[pop.index] = index - pop.index;
    }
    mono.push({ temp, index });
  });
  return result;
};

//my version

/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function (T) {
  const stack = [];
  const res = new Array(T.length).fill(0);

  for (let i = 0; i < T.length; i++) {
    if (stack.length && T[i] <= stack[stack.length - 1].temp) {
      stack.push({ temp: T[i], index: i });
    }

    while (stack.length && T[i] > stack[stack.length - 1].temp) {
      const temp = stack.pop();
      res[temp.index] = i - temp.index;
    }

    stack.push({ temp: T[i], index: i });
  }

  return res;
};

//////

//time complexity: 0(n^2)
//space complexity: 0(n)

/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function (T) {
  const res = [];

  for (let i = 0; i < T.length; i++) {
    for (let j = i + 1; j < T.length; j++) {
      if (T[j] > T[i]) {
        res.push(j - i);
        break;
      }
      if (j === T.length - 1) {
        res.push(0);
      }
    }
    if (i === T.length - 1) {
      res.push(0);
    }
  }

  return res;
};

//brute force
//i is the one we are looking at
//j to iterate through following
//increment count as you iterate
//push count and break when you find a higher number
