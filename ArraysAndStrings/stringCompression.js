var compress = function (chars) {
  let anchor = 0;
  let write = 0;

  for (let read = 0; read < chars.length; read++) {
    //checking if we are at the last index & the next index is not different as this index
    if (read + 1 == chars.length || chars[read + 1] !== chars[read]) {
      //incrementing write
      chars[write] = chars[anchor];
      write++;
      //check to see if our cluster char count is greater than 1
      if (read > anchor) {
        //make our number of consecutive digits a string and split it into an array to single out each digit
        let count = read - anchor + 1;
        const string = count.toString().split("");
        string.forEach((digit) => {
          //increment write for each digit
          chars[write] = digit;
          write++;
        });
      }
      anchor = read + 1;
    }
  }
  //return the new length
  return write;
};

//["a","a","b","b","c","c","c"]

//["a","a","a","b","b","a","a"]

/**
 * @param {character[]} chars
 * @return {number}
 */

//Input: chars =  ['a', 'a', 'b', 'b', 'c', 'c', 'c']
//Output: ["a","2","b","2","c","3"]
//-----------------------------

//Input: chars =  ['a', 2, 'b', 2]
//stack = ['c', 3]
//curr =
//poll =

var compress = function (chars) {
  const first = chars.shift();
  const stack = [[first, 1]];
  const length = chars.length;

  for (let i = 0; i < length; i++) {
    const curr = chars.shift();
    if (curr === stack[stack.length - 1][0] && stack[stack.length - 1][1] < 9) {
      stack[stack.length - 1][1]++;
    } else {
      const poll = stack.pop();
      if (poll[1] === 1) {
        chars.push(poll[0]);
      } else if (poll[1] === 9) {
        chars.push(poll[0]);
        chars.push(poll[1].toString());
        stack.push([poll[0], 1]);
      } else {
        chars.push(poll[0]);
        chars.push(poll[1].toString());
      }
      stack.push([curr, 1]);
    }
  }

  const poll = stack.pop();
  if (poll[1] === 1) {
    chars.push(poll[0]);
  } else {
    chars.push(poll[0]);
    chars.push(poll[1].toString());
  }

  return chars.length;
};

// pointers
// anchor: (tracks the first letter in the cluster)
// read: for loop, i, always tells us how far we've gone
// write: where we are supposed to add the numbers
// in order to get write, we will end up subtracting anchor from read at that stage
// ["a","a","b","b","a","a","a"] and ["a","2","b","2","a","3"]
