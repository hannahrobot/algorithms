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
