/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let x = nums1.length < nums2.length ? nums1 : nums2;
  let y = x === nums1 ? nums2 : nums1;

  let start = 0;
  let end = x.length;
  let partitionX;
  let partitionY;
  let leftX;
  let leftY;
  let rightX;
  let rightY;

  while (start <= end) {
    partitionX = Math.floor((start + end) / 2);
    partitionY = Math.floor((x.length + y.length + 1) / 2) - partitionX;
    leftX = partitionX ? x[partitionX - 1] : -Infinity;
    leftY = partitionY ? y[partitionY - 1] : -Infinity;
    rightX = partitionX < x.length ? x[partitionX] : Infinity;
    rightY = partitionY < y.length ? y[partitionY] : Infinity;

    //found
    if (leftX <= rightY && leftY <= rightX) {
      if ((x.length + y.length) % 2 !== 0) {
        //if its odd
        return Math.max(leftX, leftY);
      } else {
        //if its even
        return (Math.max(leftX, leftY) + Math.min(rightX, rightY)) / 2;
      }
    } else if (leftX > rightY) {
      end = partitionX - 1;
    } else {
      start = partitionX + 1;
    }
  }
};

/*

do a binary search to find the partitian of the arrays such that
x1 <= y2
y1 <= x2

if combined length is even:
ans = Avg(min(y2, x2), max(x1, y1))

if combined length is odd:
ans = max(x1, y1)

challenge:
-do a binary search to find the correct partition
-the nums arrays have to be partitioned such that xleftlen + yleftlen === xriglen + yriglen
-search for every el on left is less than every el on right

found:
  maxLeft x <= minRight Y
  maxLeft y <= minRight X
else if:
  maxLeft x > minRight y
      move towards left in x
else:
  move towards right in x


do the binary search on the smaller array
x is smaller
xPartition = (left + right) / 2
yPartition = ((leftLen + rightLen + 1) / 2) - xPartition

*if the total size of the arrays is an odd number, we will have on extra element on the left side

Edge cases:
*if there are 0 els on the left side or 0 els on the right side at any time during binary partition,

*/
