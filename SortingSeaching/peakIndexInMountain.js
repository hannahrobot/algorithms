//binary search
var peakIndexInMountainArray = function (arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const pivot = Math.floor((left + right) / 2);
    if (arr[pivot - 1] < arr[pivot] && arr[pivot] > arr[pivot + 1]) {
      return pivot;
    } else if (arr[pivot] < arr[pivot + 1]) {
      left = pivot + 1;
    } else {
      right = pivot - 1;
    }
  }

  return left;
};

//iterative
var peakIndexInMountainArray = function (arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] < arr[i] && arr[i] > arr[i + 1]) {
      return i;
    }
  }
};

/*
input: arr
output: index of mountain (there are multiple possibilities)
edge: arr is not 3 length

ex:


approach:

iterate until we find a mountain (comparing last and next to the curr)
return i rightaway

0(n)


binary search: find a peak
binary search by the slope

left, right
while left !== right
pivot in the middle
check if pivot is a mountain, if yes return pivot

if arr[pivot] < arr[pivot+1]
  left = pivot + 1
else
  right = pivot-1


*/
