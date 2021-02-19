//stack and string builder

/**
 * @param {string} s
 * @return {string}
 */

var minRemoveToMakeValid = function (s) {
  let pStack = [];
  let aStack = "";

  for (let i = 0; i < s.length; i++) {
    if (s[i] === ")" && pStack.length && pStack[pStack.length - 1] === "(") {
      pStack.pop();
      aStack += s[i];
    } else if (s[i] === "(") {
      aStack += s[i];
      pStack.push(s[i]);
    } else if (s[i] !== "(" && s[i] !== ")") {
      aStack += s[i];
    }
  }

  if (pStack.length) {
    pStack = [];
    let bStack = "";
    for (let i = aStack.length - 1; i >= 0; i--) {
      if (
        aStack[i] === "(" &&
        pStack.length &&
        pStack[pStack.length - 1] === ")"
      ) {
        pStack.pop();
        bStack = aStack[i] + bStack;
      } else if (aStack[i] === ")") {
        bStack = aStack[i] + bStack;
        pStack.push(aStack[i]);
      } else if (aStack[i] !== ")" && aStack[i] !== "(") {
        bStack = aStack[i] + bStack;
      }
    }
    return bStack;
  }

  return aStack;
};

//input: string
//output: string

//valid:
//the string is empty
//contains only alpha chars
//

//edge cases:
//if s is empty string: returns empty string;

//ex :

//allstack
//(a(bb)

//pStack:
//
//res (unshift so it lines up forward)
//

//'(())': '(())'
//')()': '()'
//'AB)AB(' 'ABAB'
//'(ab)': '(ab)'
//'(ab)(': '(ab)'
//'(a(bb)'

//iterated forward, add each el to an array (push) and add each p to a stack (push)
//on each iteration, check if its a p, if yes: if its opening p push to stack, if its closing p check if you have opening p on stack, if no, dont push p to array, if yes, push p to array
//if theres any p remaining in the stack, iterate backwards (unshift el to an array, push p to a stack)
//time: 0(n)
//space: 0(n)
