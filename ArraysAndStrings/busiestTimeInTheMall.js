function findBusiestPeriod(data) {
  const n = data.length;
  let count = 0;
  let maxCount = 0;
  let maxPeriodTime = 0;

  for (let i = 0; i < n; i++) {
    if (data[i][2] === 1) {
      count += data[i][1];
    } else if (data[i][2] === 0) {
      count -= data[i][1];
    }

    if (i === n - 1 || data[i][0] !== data[i + 1][0]) {
      if (count > maxCount) {
        maxCount = count;
        maxPeriodTime = data[i][0];
      }
    }
  }
  return maxPeriodTime;
}

//time: 0(n)
//space: 0(1)
