var reverse = function (x) {
  let negative = false;
  //make positive, but mark that is was originally negative
  if (x < 0) {
    negative = true;
    x *= -1;
  }
  let res = 0;
  while (x > 0) {
    //add another place to our res
    res *= 10;
    //the remainder of x/10 gives us the number we want to place
    let numberToPlace = x % 10;
    //we made room in step 1, so now we just add the numberToPlace         to our res
    res += numberToPlace;
    //we modify x to no longer include the number we just placed
    x = Math.floor(x / 10);
  }

  //if bigger than 32 bit constraint, return 0
  if (res > Math.pow(2, 31) - 1) return 0;

  //if we originally marked as negative, make negative again
  return negative ? res * -1 : res;
};
