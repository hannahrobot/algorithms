/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  let valid = new Set();
  let removed = Infinity;

  const DFS = function (
    string,
    index,
    leftCount,
    rightCount,
    leftRem,
    rightRem,
    newString
  ) {
    //basecase:
    if (index >= s.length) {
      if (leftRem === rightRem) {
        valid.add(newString);
      }
      return;
    }

    let char = s[index];
    let length = newString.length;

    //discard recursive case
    if ((char === "(" && leftRem > 0) || (char === ")" && rightRem > 0)) {
      DFS(
        s,
        index + 1,
        leftCount,
        rightCount,
        leftRem - (char === "(" ? 1 : 0),
        rightRem - (char === ")" ? 1 : 0),
        newString
      );
    }

    newString += char;

    //if the current char is not a parenthesis
    if (char !== "(" && char !== ")") {
      DFS(s, index + 1, leftCount, rightCount, leftRem, rightRem, newString);
    } else if (char === "(") {
      DFS(
        s,
        index + 1,
        leftCount + 1,
        rightCount,
        leftRem,
        rightRem,
        newString
      );
    } else if (rightCount < leftCount) {
      DFS(
        s,
        index + 1,
        leftCount,
        rightCount + 1,
        leftRem,
        rightRem,
        newString
      );
    }
  };

  const countParenth = function (string) {
    let right = 0;
    let left = 0;

    for (let i = 0; i < string.length; i++) {
      if (string[i] === ")") {
        right = left === 0 ? right + 1 : right;
        left = left > 0 ? left - 1 : left;
      } else if (string[i] === "(") {
        left++;
      }
    }

    return [left, right];
  };

  const [left, right] = countParenth(s);

  DFS(s, 0, 0, 0, left, right, "");

  const result = [];

  valid.forEach((key) => result.push(key));

  return result;
};

//backtracking

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  let seen = new Set();
  let result = [];
  let removed = Infinity;

  const validParenth = function (string) {
    let count = 0;

    for (let i = 0; i < string.length; i++) {
      if (string[i] === ")") {
        count--;
      } else if (string[i] === "(") {
        count++;
      }
      if (count < 0) {
        return false;
      }
    }

    return count ? false : true;
  };

  const DFS = function (index, string) {
    //basecase:
    if (index >= s.length) {
      //if its a valid p string, we check to see if we should update our output
      const isValid = validParenth(string);
      if (isValid && !seen.has(string)) {
        if (s.length - string.length < removed) {
          result = [string];
          removed = s.length - string.length;
        } else if (s.length - string.length === removed) {
          result.push(string);
        }
        seen.add(string);
      }
      //we end our recursion
      return;
    }

    //recursive case: option where we take a parenthesis out if its a parenthesis
    //we always have a recursive case that adds, as we want to check all p combinations
    //and if its not a parenthesis, we dont want to take it out
    if (s[index] === ")" || s[index] === "(") {
      DFS(index + 1, string);
    }
    DFS(index + 1, string + s[index]);
  };

  s[0] === ")" ? DFS(1, "") : DFS(0, "");

  return result;
};

/*NOTES

input: s
output: array of valid p strings with minimum num of p removed
edge: string is empty

*valid
  opening then closing

*invalid
  if it starts with closing

ex:
Input: "()())()"
Output: ["()()()", "(())()"]

Input: "(a)())()"
Output: ["(a)()()", "(a())()"]

stack: []

i
"(a)())()"

Input: ")("
Output: [""]

approach:
  we can check valid parenthesis with a stack
  since this also can have other chars, when we check the stack, we need to hop over the chars

  brute force: backtracking

      variables:
          result array
          removed = Infinity

      helperFunc: validParenthesis: takes a string
          variables:
              count

              we iterate through the string,
                  if its a closing bracket: count - 1
                  if its an opening bracket: count + 1
                  if we ever dip under 0, return false

              if we get to the end and count is 0: return true, otherwise: return false

      helperFunc: DFS: takes string index,

          basecase: if i is >= s.length
              check our string to see if its a valid p string: call validParenthesis
              if true:
                  if orig string length - string length is less than removed, result array = [string]
                  if orig string length - string length === removed, result array push string
                  update removed

          recursive case:
              DFS(index + 1, string+ string[i])
              DFS(index + 1, string)

      if first index is closing, we remove it, DFS(1, '')
      otherwise:
      we call DFS at (0, '')


*/
