/*NOTES

input: integer
output: num of times you must multiply to get a single digit
edge cases: input is one digit, return int

questions:
-will the int sometimes be larger than 2 digits? yes

ex:
intput: 39
3*9 = 27
2*7 = 14
1*4 = 4
output: 3

approach:
  brute force: recursive
    helper func for recursion:
      basecase: if num is smaller than 10, return num
      num to string
      iterate over string, multiply/reduce
      call recursively on the product, count++
    return helperFunc

  time: 0(mp*numlength)
  space: 0(mp) we call recursively the mp amount of times *note that creating an array adds to space complexity, but its likely that mp will be a greater number than our number length

  slightly improved recursive
    ^ same
    instead of dealing with string, use numbers * division to split & multiply the num to avoid parsing, save on space complexity

  time: 0(mp*numlength)
  space: 0(mp) we call recursively the mp amount of times

  brute force iterative, refactored recursive:
      variables:
        count
      while loop: while num is greater or equal to 10
        variables;
          currentnum = 1
        newNum = modulo num
        currentnum *= newnum
        subtract newNum from num
        update num to equal currentnum
        add to count

      return count

  time: 0(mp*numlength)
  space: 0(1)

 */

//math recursive

function multiplicativePersistance(num) {
  if (num < 10) {
    return 0;
  }

  let buildNum = 1;

  while (num) {
    let singleNum = num % 10;
    buildNum *= singleNum;
    num -= singleNum;
    num /= 10;
  }

  return 1 + multiplicativePersistance(buildNum);
}
// time: 0(mp*numlength)
// space: 0(mp) we call recursively the mp amount of times

//math iterative

function multiplicativePersistance(num) {
  let count = 0;

  while (num >= 10) {
    let buildNum = 1;
    let numCopy = num;
    while (numCopy) {
      let singleNum = numCopy % 10;
      buildNum *= singleNum;
      numCopy -= singleNum;
      numCopy /= 10;
    }
    num = buildNum;
    count++;
  }

  return count;
}

// time: 0(mp*numlength)
// space: 0(1)

console.log(multiplicativePersistance(39));
