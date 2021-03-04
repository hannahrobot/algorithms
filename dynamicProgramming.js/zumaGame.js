/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  const memo = {};

  const DFS = function (stack, i, currentHand) {
    //stack + postfix
    const currBoard =
      stack
        .map((arr) => {
          let str = "";
          while (arr[1]) {
            arr[1]--;
            str += arr[0];
          }
          return str;
        })
        .join("") + board.slice(i);

    const currHandString = currentHand.join("");

    const key = currBoard + "#" + currHandString;

    if (memo.hasOwnProperty(key)) {
      return memo[key];
    }

    //basecase: not a valid option
    if (i >= board.length && stack.length) {
      return -1;
    }

    //basecase: valid path complete
    if (!stack.length && i === board.length) {
      return 0;
    }

    let min = Infinity;
    let index = i;

    //recursive case: we use our hand
    //check hand

    for (let j = 0; j < currentHand.length; j++) {
      if (currentHand[j] === board[index]) {
        //copy stack
        const newStack = stack.slice();

        //*only do this if top matches
        if (
          newStack.length &&
          newStack[newStack.length - 1][0] === board[index]
        ) {
          //increment index for the ball we are adding and curr
          newStack[newStack.length - 1][1] += 2;
        } else {
          //add new arr to stack
          newStack.push([board[index], 2]);
        }
        //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
        while (index + 1 < board.length && board[index + 1] === board[index]) {
          index++;
          newStack[newStack.length - 1][1]++;
        }
        if (newStack[newStack.length - 1][1] >= 3) {
          newStack.pop();
        }

        //recursive call: we dont use our hand
        const res = DFS(
          newStack,
          index + 1,
          currentHand.filter((el, i) => i !== j)
        );
        if (res >= 0 && res + 1 < min) {
          min = 1 + res;
        }
      }
    }

    const newStack2 = stack.slice();
    //*only do this if top matches
    if (newStack2.length && newStack2[newStack2.length - 1][0] === board[i]) {
      //increment index for the curr
      newStack2[newStack2.length - 1][1]++;
    } else {
      //add new arr to stack
      newStack2.push([board[i], 1]);
    }
    //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
    while (i + 1 < board.length && board[i + 1] === board[i]) {
      i++;
      newStack2[newStack2.length - 1][1]++;
    }
    if (newStack2[newStack2.length - 1][1] >= 3) {
      newStack2.pop();
    }

    //recursive option where we dont use our hand
    const res2 = DFS(newStack2, i + 1, currentHand);
    if (res2 >= 0 && res2 + 1 < min) {
      min = 1 + res2;
    }

    memo[key] = min === Infinity ? -1 : min;
    return memo[key];
  };

  return DFS([], 0, hand.split(""));
};

//try memoizing hand instead of i

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  const memo = {};

  const DFS = function (stack, i, currentHand) {
    console.log("currentHand", currentHand);
    console.log("current stack", stack);
    console.log("i", i);

    if (memo.hasOwnProperty(i)) {
      return memo[i];
    }

    //basecase: not a valid option
    if (i >= board.length && stack.length) {
      return -1;
    }

    //basecase: valid path complete
    if (!stack.length && i === board.length) {
      console.log("inside valid");
      return 0;
    }

    let min = Infinity;
    let index = i;

    //recursive case: we use our hand
    //check hand

    for (let j = 0; j < currentHand.length; j++) {
      if (currentHand[j] === board[index]) {
        //copy stack
        const newStack = stack.slice();

        //*only do this if top matches
        if (
          newStack.length &&
          newStack[newStack.length - 1][0] === board[index]
        ) {
          //increment index for the ball we are adding and curr
          newStack[newStack.length - 1][1] += 2;
        } else {
          //add new arr to stack
          newStack.push([board[index], 2]);
        }
        //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
        while (index + 1 < board.length && board[index + 1] === board[index]) {
          index++;
          newStack[newStack.length - 1][1]++;
        }
        if (newStack[newStack.length - 1][1] >= 3) {
          newStack.pop();
        }

        //recursive call: we dont use our hand
        const res = DFS(
          newStack,
          index + 1,
          currentHand.filter((el, i) => i !== j)
        );
        console.log("res", res);
        if (res >= 0 && res + 1 < min) {
          min = 1 + res;
        }
      }
    }

    const newStack2 = stack.slice();
    //*only do this if top matches
    if (newStack2.length && newStack2[newStack2.length - 1][0] === board[i]) {
      //increment index for the curr
      newStack2[newStack2.length - 1][1]++;
    } else {
      //add new arr to stack
      newStack2.push([board[i], 1]);
    }
    //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
    while (i + 1 < board.length && board[i + 1] === board[i]) {
      i++;
      newStack2[newStack2.length - 1][1]++;
    }
    if (newStack2[newStack2.length - 1][1] >= 3) {
      newStack2.pop();
    }

    //recursive option where we dont use our hand
    const res2 = DFS(newStack2, i + 1, currentHand);
    if (res2 >= 0 && res2 + 1 < min) {
      min = 1 + res2;
    }

    memo[i] = min === Infinity ? -1 : min;
    console.log("memo[i]", memo[i]);
    return memo[i];
  };

  return DFS([], 0, hand.split(""));
};

//its going into our valid case properly but not returning the correct number

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  const memo = {};

  const DFS = function (stack, i, currentHand) {
    console.log("currentHand", currentHand);
    console.log("current stack", stack);
    console.log("i", i);

    if (memo.hasOwnProperty(i)) {
      return memo[i];
    }

    //basecase: not a valid option
    if (i >= board.length && stack.length) {
      return -1;
    }

    //basecase: valid path complete
    if (!stack.length && i === board.length) {
      console.log("inside valid");
      return 0;
    }

    let min = Infinity;
    let index = i;

    //recursive case: we use our hand
    //check hand

    for (let j = 0; j < currentHand.length; j++) {
      if (currentHand[j] === board[index]) {
        //copy stack
        const newStack = stack.slice();

        //*only do this if top matches
        if (
          newStack.length &&
          newStack[newStack.length - 1][0] === board[index]
        ) {
          //increment index for the ball we are adding and curr
          newStack[newStack.length - 1][1] += 2;
        } else {
          //add new arr to stack
          newStack.push([board[index], 2]);
        }
        //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
        while (index + 1 < board.length && board[index + 1] === board[index]) {
          index++;
          newStack[newStack.length - 1][1]++;
        }
        if (newStack[newStack.length - 1][1] >= 3) {
          newStack.pop();
        }

        //recursive call: we dont use our hand
        const res = DFS(
          newStack,
          index + 1,
          currentHand.filter((el, i) => i !== j)
        );
        if (res >= 0 && res + 1 < min) {
          min = 1 + res;
        }
      }
    }

    const newStack2 = stack.slice();
    //*only do this if top matches
    if (newStack2.length && newStack2[newStack2.length - 1][0] === board[i]) {
      //increment index for the curr
      newStack2[newStack2.length - 1][1]++;
    } else {
      //add new arr to stack
      newStack2.push([board[i], 1]);
    }
    //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
    while (i + 1 < board.length && board[i + 1] === board[i]) {
      i++;
      newStack2[newStack2.length - 1][1]++;
    }
    if (newStack2[newStack2.length - 1][1] >= 3) {
      newStack2.pop();
    }

    //recursive option where we dont use our hand
    const res2 = DFS(newStack2, i + 1, currentHand);
    if (res2 >= 0 && res2 + 1 < min) {
      min = 1 + res2;
    }

    memo[i] = min === Infinity ? -1 : min;
    return memo[i];
  };

  return DFS([], 0, hand.split(""));
};

//-------------

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  const memo = {};

  const DFS = function (stack, i, currentHand) {
    if (memo.hasOwnProperty(i)) {
      return memo[i];
    }

    //basecase: not a valid option
    if (i >= board.length && stack.length) {
      return -1;
    }

    //basecase: valid path complete
    if (!stack.length && i === board.length) {
      return 0;
    }

    let min = Infinity;
    let index = i;

    //recursive case: we use our hand
    //check hand

    for (let j = 0; j < currentHand.length; j++) {
      if (currentHand[j] === board[index]) {
        //copy stack
        const newStack = stack.slice();

        //*only do this if top matches
        if (
          newStack.length &&
          newStack[newStack.length - 1][0] === board[index]
        ) {
          //increment index for the ball we are adding and curr
          newStack[newStack.length - 1][1] += 2;
        } else {
          //add new arr to stack
          newStack.push([board[index], 2]);
        }
        //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
        while (index + 1 < board.length && board[index + 1] === board[index]) {
          index++;
          newStack[newStack.length - 1][1]++;
        }
        if (newStack[newStack.length - 1][1] >= 3) {
          newStack.pop();
        }

        //recursive call: we dont use our hand
        const res = DFS(
          newStack,
          index + 1,
          currentHand.filter((el, i) => i !== j)
        );
        if (res >= 0 && res < min) {
          min = 1 + res;
        }
      }
    }

    const newStack2 = stack.slice();
    //*only do this if top matches
    if (newStack2.length && newStack2[newStack2.length - 1][0] === board[i]) {
      //increment index for the curr
      newStack2[newStack2.length - 1][1]++;
    } else {
      //add new arr to stack
      newStack2.push([board[i], 1]);
    }
    //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
    while (i + 1 < board.length && board[i + 1] === board[i]) {
      i++;
      newStack2[newStack2.length - 1][1]++;
    }
    if (newStack2[newStack2.length - 1][1] >= 3) {
      newStack2.pop();
    }

    //recursive option where we dont use our hand
    const res2 = DFS(newStack2, i + 1, currentHand);
    if (res2 >= 0 && res2 < min) {
      min = 1 + res2;
    }

    memo[i] = min === Infinity ? -1 : min;
    return memo[i];
  };

  return DFS([], 0, hand.split(""));
};

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  const memo = {};

  const DFS = function (stack, i, currentHand) {
    if (memo.hasOwnProperty(i)) {
      return memo[i];
    }

    //basecase: not a valid option
    if (i >= board.length && stack.length) {
      return -1;
    }

    //basecase: valid path complete
    if (!stack.length && i === board.length) {
      return 0;
    }

    let min = Infinity;
    let index = i;

    //recursive case: we use our hand
    //check hand
    if (currentHand.has(board[index])) {
      //copy hand
      const handCopy1 = new Set(currentHand);
      //delete from hand
      handCopy1.delete(board[index]);
      //copy stack
      const newStack = stack.slice();

      //*only do this if top matches
      if (
        newStack.length &&
        newStack[newStack.length - 1][0] === board[index]
      ) {
        //increment index for the ball we are adding and curr
        newStack[newStack.length - 1][1] += 2;
      } else {
        //add new arr to stack
        newStack.push([board[index], 2]);
      }
      //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
      while (index + 1 < board.length && board[index + 1] === board[index]) {
        index++;
        newStack[newStack.length - 1][1]++;
      }
      if (newStack[newStack.length - 1][1] >= 3) {
        newStack.pop();
      }

      //recursive call: we dont use our hand
      const res = DFS(newStack, index + 1, handCopy1);
      if (res >= 0 && res < min) {
        min = 1 + res;
      }
    }

    const newStack2 = stack.slice();
    //*only do this if top matches
    if (newStack2.length && newStack2[newStack2.length - 1][0] === board[i]) {
      //increment index for the curr
      newStack2[newStack2.length - 1][1]++;
    } else {
      //add new arr to stack
      newStack2.push([board[i], 1]);
    }
    //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
    while (i + 1 < board.length && board[i + 1] === board[i]) {
      i++;
      newStack2[newStack2.length - 1][1]++;
    }
    if (newStack2[newStack2.length - 1][1] >= 3) {
      newStack2.pop();
    }

    //recursive option where we dont use our hand
    const res2 = DFS(newStack2, i + 1, currentHand);
    if (res2 >= 0 && res2 < min) {
      min = 1 + res2;
    }

    memo[i] = min === Infinity ? -1 : min;
    return memo[i];
  };

  const handSet = new Set(hand);

  return DFS([], 0, handSet);
};

//-----------------------------------------------------

//rework for memoization

//min = infinity

//we just return 0, each time we reach valid basecase we

//return 0, our memo[i] = math.Min(min, 1 + topDown(etc))

//switch hand to set here

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  let minTurns = Infinity;

  const DFS = function (stack, index, turns, currentHand) {
    //basecase: not a valid option
    if (index >= board.length && stack.length) {
      return;
    }

    //basecase: valid path complete
    if (!stack.length && index === board.length) {
      minTurns = Math.min(minTurns, turns);
      return;
    }

    //recursive case:
    for (let i = index; i < board.length; i++) {
      //check current stack top against each hand option
      if (currentHand.has(board[i])) {
        //if it matches the hand, increment the top stack, if its 3 count pop it off, then call recursively with the stack and new hand that doesnt include the ball we just used

        //copy hand
        const handCopy = new Set(currentHand);
        //delete the ball we are using
        handCopy.delete(board[i]);

        //copy stack
        const newStack = stack.slice();

        //*only do this if top matches
        if (newStack.length && newStack[newStack.length - 1][0] === board[i]) {
          //increment index for the ball we are adding and curr
          newStack[newStack.length - 1][1] += 2;
        } else {
          //add new arr to stack
          newStack.push([board[i], 2]);
        }
        //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
        while (i + 1 < board.length && board[i + 1] === board[i]) {
          i++;
          newStack[newStack.length - 1][1]++;
        }
        if (newStack[newStack.length - 1][1] >= 3) {
          newStack.pop();
        }

        //recursively call on the new stack,
        //with i in the next index
        //we increment turns
        //we splice the ball from out hand
        //next recursive call has the option to add another a ball the the current stack top, or the prev one if we popped
        //or increment to the next index
        DFS(newStack, i + 1, turns + 1, handCopy);
      }

      //* if we choose to not do anything, its the equivalent of skipping over all matching chars, so we find the next char that doesnt match

      //* you have to fix the way youre dealing with the stack

      //outside of iterating through all of our hand options, we have the option to do nothing but increment
      //if we move forward on our gameboard, we have to add the current index to the stack
      const copyStack = stack.slice();

      let j = index;
      //*only do this if top matches
      if (copyStack.length && copyStack[copyStack.length - 1][0] === board[j]) {
        //increment index for curr
        copyStack[copyStack.length - 1][1]++;
      } else {
        //add new arr to stack
        copyStack.push([board[j], 1]);
      }
      //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
      while (j + 1 < board.length && board[j + 1] === board[j]) {
        j++;
        copyStack[copyStack.length - 1][1]++;
      }
      if (copyStack[copyStack.length - 1][1] >= 3) {
        copyStack.pop();
      }

      DFS(copyStack, i + 1, turns, currentHand);
    }
  };

  const handSet = new Set(hand);

  DFS([], 0, 0, handSet);

  return minTurns === Infinity ? -1 : minTurns;
};

//-----------------------------------------------------

//switch hand to set here

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  //edge
  //if board is empty
  //if hand is empty

  let minTurns = Infinity;

  const DFS = function (stack, index, turns, currentHand) {
    //basecase: not a valid option
    if (index >= board.length && stack.length) {
      return;
    }

    //basecase: valid path complete
    if (!stack.length && index === board.length) {
      minTurns = Math.min(minTurns, turns);
      return;
    }

    //recursive case:
    for (let i = index; i < board.length; i++) {
      //check current stack top against each hand option
      if (hand.has(board[i])) {
        //if it matches the hand, increment the top stack, if its 3 count pop it off, then call recursively with the stack and new hand that doesnt include the ball we just used

        //copy hand
        const handCopy = new Set(currentHand);
        //delete the ball we are using
        handCopy.delete(board[i]);

        //copy stack
        const newStack = stack.slice();

        //*only do this if top matches
        if (newStack[newStack.length - 1][0] === board[i]) {
          //increment index for the ball we are adding and curr
          newStack[newStack.length - 1][1] += 2;
        } else {
          //add new arr to stack
          newStack.push([board[i], 2]);
        }
        //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
        while (i + 1 < board.length && board[i + 1] === board[i]) {
          i++;
          newStack[newStack.length - 1][1]++;
        }
        if (newStack[newStack.length - 1][1] >= 3) {
          newStack.pop();
        }

        //recursively call on the new stack,
        //with i in the next index
        //we increment turns
        //we splice the ball from out hand
        //next recursive call has the option to add another a ball the the current stack top, or the prev one if we popped
        //or increment to the next index
        DFS(newStack, i + 1, turns + 1, handCopy);
      }

      //* if we choose to not do anything, its the equivalent of skipping over all matching chars, so we find the next char that doesnt match

      //* you have to fix the way youre dealing with the stack

      //outside of iterating through all of our hand options, we have the option to do nothing but increment
      //if we move forward on our gameboard, we have to add the current index to the stack
      const copyStack = stack.slice();

      let j = index;
      //*only do this if top matches
      if (copyStack[copyStack.length - 1][0] === board[j]) {
        //increment index for curr
        copyStack[copyStack.length - 1][1]++;
      } else {
        //add new arr to stack
        copyStack.push([board[j], 1]);
      }
      //if its greater or equal to 3, we have to see if all the ones following it add up to 3 or greater
      while (j + 1 < board.length && board[j + 1] === board[j]) {
        j++;
        copyStack[copyStack.length - 1][1]++;
      }
      if (copyStack[copyStack.length - 1][1] >= 3) {
        copyStack.pop();
      }

      DFS(copyStack, i + 1, turns, currentHand);
    }
  };

  //switch hand to a set
  const handSet = new Set(hand);

  //loop through hand initially and recursive call on first el in board so that initial stack isnt empty
  let i = 0;
  if (handSet.has(board[i])) {
    //make a copy
    const handSetCopy = new Set(handSet);
    //delete the ball you are using from the copy
    handSetCopy.delete(board[i]);
    //create a new stack with the current char & the added ball accounted for
    const newStack = [board[i], 2];
    //increment forward while the characters are matching
    while (i < board.length && board[i + 1] === board[i]) {
      i++;
      newStack[newStack.length - 1][1]++;
    }
    //check if the top of the stack is greater or equal to 3
    if (newStack[newStack.length - 1][1] >= 3) {
      stack.pop();
    }
    DFS(newStack, i + 1, 1, handSetCopy);
  }

  //DFS having not chosen any of the items in the hand
  //starts where i left off
  //*for the count: wherever i lands, i-1 is the prev char, i-start is the count of that char that we incremented to
  const newStack2 = [[board[i], i + 1]];
  if (newStack2[newStack2.length - 1][1] >= 3) {
    newStack2.pop();
  }

  DFS(newStack2, i + 1, 0, hand);

  return minTurns === Infinity ? -1 : minTurns;
};

//-----------------------------------------------------

/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
const findMinStep = function (board, hand) {
  //edge
  //if board is empty
  //if hand is empty

  let minTurns = Infinity;

  const DFS = function (stack, index, turns, currentHand) {
    //basecase: not a valid option
    if (index >= board.length && stack.length) {
      return;
    }

    //basecase: valid path complete
    if (!stack.length) {
      minTurns = Math.min(minTurns, turns);
      return;
    }

    //recursive case:
    for (let i = index; i < board.length; i++) {
      //check current stack top against each hand option
      for (let j = 0; j < currentHand.length; j++) {
        //if it matches the hand, increment the top stack, if its 3 count pop it off, then call recursively with the stack and new hand that doesnt include the ball we just used
        if (stack[stack.length - 1][0] >= currentHand[j]) {
          //copy stack
          const newStack = stack.slice();
          //increment index
          newStack[stack.length - 1][1]++;
          //if its greater or equal to 3, we have to pop it off
          if (newStack[stack.length - 1][1] >= 3) {
            newStack.pop();
          }
          //recursively call on the new stack,
          //with i in the same index
          //we increment turns
          //we splice the ball from out hand
          //next recursive call has the option to add another a ball the the current stack top, or the prev one if we popped
          //or increment to the next index
          DFS(
            newStack,
            i,
            turns + 1,
            currentHand.slice(0, j) + currentHand.slice(j + 1)
          );
        }
      }
      //outside of iterating through all of our hand options, we have the option to do nothing but increment
      //if we move forward on our gameboard, we have to add the current index to the stack
      const copyStack = stack.slice();
      if (copyStack[copyStack.length - 1][0] === board[i]) {
        copyStack[copyStack.length - 1][1]++;
        if (copyStack[copyStack.length - 1][1] >= 3) {
          copyStack.pop();
        }
        DFS(copyStack, i + 1, turns, currentHand);
      } else {
        copyStack.push([board[i], 1]);
        DFS(copyStack, i + 1, turns, currentHand);
      }
    }
  };

  //loop through hand initially and recursive call on first el in board so that initial stack isnt empty
  for (let i = 0; i < hand.length; i++) {
    if (hand[i] === board[0]) {
      //it has to be 3 or more so we never have the option to pop off here
      DFS([board[0], 2], 1, 1, hand.slice(0, i) + hand.slice(i + 1));
    }
  }
  //DFS having not chosen any of the items in the hand
  DFS([board[0], 1], 1, 0, hand);

  return minTurns === Infinity ? -1 : minTurns;
};

/*NOTES

input: board, hand: balls in hand
output: lowest number of moves to win

approach:

  dynamic programming with candy crush
  backtracking / dfs, memoization, keep a min num of moves variable
  we could return min num moves and hold the min in our memoization

  we have 2 backtracking cases going on here
      backtracking board
          backtracking hand

  DP and stack:
      variables:
          validGames = -1


          backtracking
          DFS(stack, index, turns, currentHand)
              basecase: stack is empty:
                 updateValid games with min

              start loop i at index iterate through board from index
                  at each iteration:
                      j for loop = 0 ; currentHandidx

                  //recursive case where we add a ball
                  //recursive case where we dont add a ball

                          //do something and it matches (if it doesnt match anything we dont want to add it)
                          if CurrentHand[j] matches board[i]
                              nextStack = stack copy
                              turns ++
                              increment nextstack.top
                              if nextstack.top >= 3, stacktop pop
                                  DFS(nextstack, i + 1,turns, currentHand.slice(0, j) + currentHand.slice(j+1))

                          //do nothing but increment i
                          else {
                              add i to stack: either it matches and we increment or it doesnt match and we push new value
                              DFS(nextstack, i+1, turns, hand)
                          }

          return validGames



refactor to memoize (i) and return turns at basecase, save min to memo


      memo= {}


          DFS(stack, index, turns, currentHand)
              basecase: stack is empty:
                 return turns

                 if memo exists return memo

                 memo[i] = Infinity

              start loop i at index iterate through board from index
                  at each iteration:
                      j for loop = 0 ; currentHandidx

                  //recursive case where we add a ball
                  //recursive case where we dont add a ball

                          //do something and it matches (if it doesnt match anything we dont want to add it)
                          if CurrentHand[j] matches board[i]
                              nextStack = stack copy
                              turns ++
                              increment nextstack.top
                              if nextstack.top >= 3, stacktop pop
                                  memo[i] = Math.min(DFS(nextstack, i + 1,turns, currentHand.slice(0, j) + currentHand.slice(j+1)), memo[i])

                          //do nothing but increment i
                          else {
                              add i to stack: either it matches and we increment or it doesnt match and we push new value
                              memo[i] = Math.min(DFS(nextstack, i+1, turns, hand), memo[i])
                          }

                   increment or push i onto stack


                  return memo[i]


          return DFS([], 0, 0, hand)


optimization

  hash your hand in each dfs call so you can check it in 0(1) throughout the inner loop and easily delete what you dont want instead of slicing



  with candy crush, we use a stack
  do we need a stack? could we do it with pointers?

*/
