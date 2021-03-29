//bottom up

/**
 * @param {number[]} houses
 * @param {number} k
 * @return {number}
 */
var minDistance = function (houses, k) {
  let n = houses.length;
  let sorted = houses.sort((a, b) => a - b);
  costs = new Array(n);
  for (let i = 0; i < n; i++) {
    costs[i] = new Array(n).fill(0);
  }
  const memo = new Array(100);

  for (let i = 0; i < 100; i++) {
    memo[i] = new Array(100);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let median = sorted[Math.floor((i + j) / 2)];
      for (let t = i; t < j + 1; t++) {
        costs[i][j] += Math.abs(median - sorted[t]);
      }
    }
  }

  const dp = (k, i) => {
    if (k === 0 && i === n) return 0;
    if (k === 0 || i === n) return Infinity;
    if (memo[k][i] != null) return memo[k][i];
    let ans = Infinity;
    for (let j = i; j < n; j++) {
      let cost = costs[i][j];
      ans = Math.min(ans, cost + dp(k - 1, j + 1));
    }
    memo[k][i] = ans;
    return ans;
  };

  return dp(k, 0);
};

//backtracking / top down

/*notes

allocate mailboxs


given arr houses, int k, your task is to allocate k mailboxes in the street
arr houses[i] is a location of the ith house

index is the address of house

return min total distance between each house and its nearest mailbox

numbers of houses are units of distance


ex
                        i
Input: houses = [1,4,8,10,20], k = 3
Output: 5.

Input: houses = [2,3,5,12,18], k = 2
Output: 9

Input: houses = [7,4,6,1], k = 1
Output: 8

Input: houses = [3,6,14,10], k = 4
Output: 0



dynamic programming: median between houses

  outer func:
    variables:
      minDistance

    DFS: index, mailboxes, location of last mailbox
      basecase: dont have mailboxes left, dont have any houses left (index at length)
        update our minDistance if distance that we accumulated is smaller
          if we dont have any mailboxes left but we have houses left
            house that we are at, we need to add the remaining sum from last mailbox to last house
          if we have mailboxes left, but we are at the last index, stop recursing because its invalid
          if we have one mailbox left and we are at last index, we can still update min because its valid, we dont need to add to our sum: it would have 0 distance

      recursive case:
        loop: start at index,
          put a mailbox between start index, index that our loop is at, distance + accumulative

   return mindistance

optimized memo: i k

 */

function minDistance(houses, k) {
  let min = Infinity;

  houses.sort((a, b) => a - b);

  function DFS(index, mailboxesLeft, distanceSum, locationOfLastMailBox) {
    //basecase:
    if (!mailboxesLeft && index < houses.length) {
      const totalDistance =
        distanceSum + houses[houses.length - 1] - locationOfLastMailBox;
      min = Math.min(min, totalDistance);
      return;
    } else if (mailboxesLeft === 1 && index === houses.length - 1) {
      min = Math.min(min, distanceSum);
      return;
    } else if (!mailboxesLeft || index >= houses.length) {
      return;
    }

    //recursive case:
    for (let i = index + 1; i < houses.length; i++) {
      const medianHouse = findMedian(index, i, houses);
      const newDistance = medianHouse - houses[index] + houses[i] - medianHouse;
      DFS(i + 1, mailboxesLeft - 1, distanceSum + newDistance, medianHouse);
    }
  }

  DFS(0, k, 0, null);

  return min === Infinity ? 0 : min;
}

function findMedian(start, end, houses) {
  let middleHouse = null;

  if ((end - start + 1) % 2 !== 0) {
    const middleIndex = (end + start) / 2;
    middleHouse = houses[middleIndex];
  } else {
    const firstIndex = Math.floor((end + start) / 2); //0
    middleHouse = Math.floor((houses[firstIndex] + houses[firstIndex + 1]) / 2);
  }
  return middleHouse;
}

console.log(minDistance([1, 4, 8, 10, 20], 3));
