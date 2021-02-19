//time: 0(m+n)
//space: 0(m+n)

/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
  let p1 = 0;
  let p2 = 0;
  const res = [];

  while (p1 < firstList.length && p2 < secondList.length) {
    if (
      secondList[p2][0] <= firstList[p1][1] &&
      secondList[p2][1] >= firstList[p1][0]
    ) {
      const first =
        firstList[p1][0] > secondList[p2][0]
          ? firstList[p1][0]
          : secondList[p2][0];
      const second =
        firstList[p1][1] < secondList[p2][1]
          ? firstList[p1][1]
          : secondList[p2][1];
      res.push([first, second]);
      if (
        p1 + 1 <= firstList.length - 1 &&
        secondList[p2][0] <= firstList[p1 + 1][1] &&
        secondList[p2][1] >= firstList[p1 + 1][0]
      ) {
        p1++;
      } else {
        p2++;
      }
      //add conditional to see which one to increment
    } else if (firstList[p1][0] > secondList[p2][1]) {
      p2++;
    } else {
      p1++;
    }
  }
  return res;
};

//input: two lists sorted by start times
//output: array of intervals
//edge cases: if first is empty, if second is empty: return empty array, if theres no intervals return empty array

//ex
/*
Input:                              p1
firstList = [[0,2],[5,10],[13,23],[24,25]],
                                    p2
secondList = [[1,5],[8,12],[15,24],[25,26]]

Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
*/
/*
//approach:
//two pointers
//p1
//p2

//res = [[1, 2], [5, 5], [8, 10], [15, 23],[24, 24], [25, 25] ]

//while p1 < first.length and p2 < second.length

  if p2 intersects with p1,
          add it to res,
              if(p1+1 < p1.length-1 &&) p2 intersects with p1 + 1: p1 ++ break;
              else: p2 ++ break

  if they dont intersect, p1++


return res
*/
