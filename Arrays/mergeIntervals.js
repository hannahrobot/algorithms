var merge = function (intervals) {
  let start = [];
  let end = [];
  const merged = [];

  intervals.forEach((arr) => {
    start.push(arr[0]);
    end.push(arr[1]);
  });

  start.sort((a, b) => a - b);
  end.sort((a, b) => a - b);

  let result = [];
  let i = 0;
  let j = 0;

  while (start.length) {
    if (start[j] === start[j] + 1) {
      j++;
    }
    if (end[j] >= start[j + 1]) {
      j++;
    } else {
      result.push(start[i], end[j]);
      start = start.slice(j + 1);
      end = end.slice(j + 1);
      j = 0;
    }
  }
  return result;
};
