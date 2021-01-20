//sliding window

const getSay = (s) => {
  let output = "";
  let count = 1;
  let prev = s[0];
  if (s.length === 1) return `${count}${prev}`;
  for (let i = 1; i < s.length; i++) {
    let ch = s[i];
    if (ch !== prev) {
      output += `${count}${prev}`;
      prev = ch;
      count = 1;
    } else {
      count++;
    }
    if (i === s.length - 1) {
      output += `${count}${prev}`;
    }
  }
  return output;
};

const countAndSay = (n) => {
  let next = "1";
  for (let i = 1; i < n; i++) {
    next = getSay(next);
  }
  return next;
};
