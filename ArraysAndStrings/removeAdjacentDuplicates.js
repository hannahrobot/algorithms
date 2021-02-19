//optimized stack
//time complexity: 0(n)
//space complexity: 0(n-d)

/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function (S) {
  if (!S.length || S.length === 1) {
    return S;
  }
  const stack = [S[0]];

  for (let i = 1; i < S.length; i++) {
    if (stack[stack.length - 1] === S[i]) {
      stack.pop();
    } else {
      stack.push(S[i]);
    }
  }

  return stack.join("");
};

//optimized recursive
//time complexity: 0(n log duplicates)
//space complexity: 0(n-D)

/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function (S) {
  if (!S.length || S.length === 1) {
    return S;
  }

  let crush = false;

  for (let i = 0; i < S.length; i++) {
    if (S[i] === S[i + 1]) {
      S = S.slice(0, i) + S.slice(i + 2);
      crush = true;
    }
  }

  return crush ? removeDuplicates(S) : S;
};

//--------------------------------------

//brute recursive
//time complexity: 0(n)
//space complexity: 0(log n)

/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function (S) {
  if (!S.length || S.length === 1) {
    return S;
  }

  for (let i = 0; i < S.length; i++) {
    if (S[i] === S[i + 1]) {
      S = removeDuplicates(S.slice(0, i) + S.slice(i + 2));
    }
  }

  return S;
};

//input: S: string, lowercase
//output: string: S with adjacent duplicates removed
//edge cases: empty string, S is only one char

//ex:
//'aabbcba'
//'cba'

//'abbac'
//'c'

//approach:
//find adjacent duplicates, recursively return sliced string

//input: S: string, lowercase
//output: string: S with adjacent duplicates removed
//edge cases: empty string, S is only one char

//ex:
//'aabbcba'
//'cba'

//'abbac'
//'c'

//approach:
//find adjacent duplicates, recursively return sliced string
