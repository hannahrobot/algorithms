var lastRemaining = function (n) {
  let min = 1;
  let max = n;
  // step is how much numbers we should be jump, at first we are jumping two numbers
  let step = 2;
  // we could have stored this variable as a boolean but this solution is my first draft and i think its the most easy to read, so i did not want to make it more complicated
  // we could also easily derive this from the step variable
  let direction = "left";

  while (min < max) {
    if (direction === "left") {
      // If we are just starting then all what we have to do is remove odd numbers
      if (min === 1) {
        min = 2;
        max = n % 2 === 0 ? n : n - 1;
        step = 4;
        direction = "right";
      } else {
        // If we are moving from the left we know that the first number will be discarded and the one after it will be included
        // the one after it will be the current left + the value of previous steps
        const prvStep = step / 2;
        min = min + prvStep;
        // we want to keep jumping forward till the max number that is still less or equal than the current max
        // we know that we have to start at min, so how many jumps can we do, that will depend upon the distance between max and min
        // As an example,  assume that the distance is 11 and u want to jump 2 steps, the max jumps that you can get is Math.floor(11/ 2) any more than that and you will exceed the distance
        const possibleSteps = parseInt((max - min) / step, 10);
        max = min + possibleSteps * step;
        direction = "right";
        step = step * 2;
      }
    } else {
      // the same logic as the left but in reverse
      const prvStep = step / 2;
      max = max - prvStep;
      const possibleSteps = parseInt((max - min) / step, 10);
      min = max - possibleSteps * step;
      direction = "left";
      step = step * 2;
    }
  }

  // after we apply all the previous logic, we know that we will reach the state where min === max and that is the number that is left
  return min;
};

//iterative
//inefficient - 2 stacks
//time: 0(nlogn)
//space: 0(n)

/**
 * @param {number} n
 * @return {number}
 */
const lastRemaining = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  let stack1 = [];

  for (let i = n; i > 0; i--) {
    stack1.push(i);
  }

  while (stack1.length > 1) {
    const stack2 = [];
    while (stack1.length) {
      stack1.pop();
      if (stack1.length) stack2.push(stack1.pop());
    }
    stack1 = stack2;
  }

  return stack1[0];
};
