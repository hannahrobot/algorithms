function peaks(arr) {
  let max = 0;

  function helper(left, right) {
    let leftCount = 0;
    let rightCount = 0;

    while (arr[left] > arr[left - 1]) {
      left--;
      leftCount++;
    }
    while (arr[right] > arr[right + 1]) {
      right++;
      rightCount++;
    }

    return [leftCount + rightCount + 3, right];
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i - 1] < arr[i] && arr[i + 1] < arr[i]) {
      const [count, right] = helper(i - 1, i + 1);
      max = Math.max(count, max);
      i = right + 1;
    }
  }

  return max;
}

console.log(peaks([1, 2, 3]));

//time: 0(n)
//space: 0(1)
