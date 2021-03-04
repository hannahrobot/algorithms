//dequeue dataStructure, double sided queue
//time: 0(n) we traverse each node twice at most
//space: 0(n) our queue is dependent on k and length of nums

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const dequeue = [];

  const cleanDequeue = function (ii, kk) {
    if (dequeue.length && dequeue[0] === ii - kk) {
      dequeue.shift();
    }
    while (dequeue.length && nums[ii] > nums[dequeue[dequeue.length - 1]]) {
      dequeue.pop();
    }
  };

  let maxIdx = 0;
  for (let i = 0; i < k; i++) {
    cleanDequeue(i, k);
    dequeue.push(i);
    if (nums[i] > nums[maxIdx]) {
      maxIdx = i;
    }
  }

  const output = new Array(nums.length - k + 1);
  output[0] = nums[maxIdx];

  for (let i = k; i < nums.length; i++) {
    cleanDequeue(i, k);
    dequeue.push(i);
    output[i - k + 1] = nums[dequeue[0]];
  }

  return output;
};

//--------------
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

const MinHeap = function () {
  this.heap = [];
};

MinHeap.prototype.add = function (num) {
  //adds an element to the bottom of list
  this.heap.push(num);
  //calls bubbleUp to move it into position
  if (this.heap.length > 1) {
    this.bubbleUp();
  }
};

MinHeap.prototype.remove = function (num) {
  //calls find method to find the element
  const index = this.find(num);
  if (index === -1) {
    return false;
  }
  //swaps last element in for the element, removes the last el(which is now the el to remove)
  this.swap(index, this.heap.length - 1);
  this.heap.pop();
  //calls heapify on the index of the element we swapped in
  this.heapify(index);
  return true;
};

MinHeap.prototype.find = function (num) {
  let index = 0;
  //binary searches heap like a binary tree
  while (this.heap[index] !== num) {
    if (this.heap[index] > num) {
      if (index === 0) {
        index = 2;
      } else {
        index *= 2;
      }
    } else {
      //we found the level
      //we bs between the start of the level and end of the level
      let right = index;
      let left = Math.floor(index / 2);
      while (left < right) {
        let pivot = Math.floor((right + left) / 2);
        if (this.heap[pivot] < num) {
          left = pivot + 1;
        } else if (this.heap[pivot] > num) {
          right = pivot - 1;
        } else {
          return pivot;
        }
      }
    }
  }
  //returns -1 if we cant find it
  return -1;
};

//2,7,6,5,4,3,2,1

MinHeap.prototype.swap = function (index1, index2) {
  [this.heap[index1], this.heap[index2]] = [
    this.heap[index2],
    this.heap[index1],
  ];
};

Minheap.prototype.heapify = function (index) {
  //moves the element at i down until we find its position
  while (this.heap[index] > this.heap[index - 1]) {
    const nextIndex = index === 0 ? 2 : index * 2;
    this.swap(index, nextIndex);
    index = nextIndex;
  }
  while (
    this.heap[index] < this.heap[index + 1] ||
    this.heap[index] > this.heap[index - 1]
  ) {}
  //calls on the swap method
};

Minheap.prototype.bubbleUp = function () {
  //moves the end up until we find its position
  //calls on the swap method
};

const maxSlidingWindow = function (nums, k) {
  const minHeap = new MinHeap();
  let start = 0;
  const maxWindow = [];

  //build initial heap
  for (let end = k; end < nums.length; end++) {
    minHeap.add(nums[end]);
  }

  maxWindow.push(minHeap[0]);

  //slide
  for (let end = k + 1; end < nums.length; end++) {
    minHeap.remove(nums[start]);
    start++;
    minHeap.add(nums[end]);
    maxWindow.push(minHeap[0]);
  }

  return maxWindow;
};

/*NOTES

heap:

heap is the size of k
iterate through the array: 0(n)
add top to array each time you move: 0(logn)
remove last from heap each time you move: 0(logn)

return heap * does max sliding window have to be in order its added?
*if so: create new heap, add top eachtime

time: 0(n^logn) ?
space: 0(k)


----------------------

hashed doubly linked list:

  for first window:
  create a linked list with order of biggest - smallest
  hash each node

  as we iterate:
  to delete left node: find it in hash and remove it with linked list next / prev 0(1)
  check if its bigger than front or smaller than end 0(1)
  if not:
      to add a node, find its order by going through list: 0(k)

  add front of the list val to arr



----------------------

input: array of nums, k is length of sliding window
output: array of max num in each sliding window
edge cases: nums lengt is 1

ex:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
1 [3  -1  -3] 5  3  6  7       3
1  3 [-1  -3  5] 3  6  7       5
1  3  -1 [-3  5  3] 6  7       5
1  3  -1  -3 [5  3  6] 7       6
1  3  -1  -3  5 [3  6  7]      7

approach:
  brute:
      check all nums on every slide

  time: 0(n^k)
  space: 0(n) if max increases each increment


  optimized:
      update max as you go
      use a queue or nothings?
      use a queue and a hash?
      use a hashed DLL? i want a queue but need to access the center

          need to add them into a queue in order of size
          need to access the center in order to delete or add?

  time:0(n)
  space: 0(n) or 0(1)

*/
