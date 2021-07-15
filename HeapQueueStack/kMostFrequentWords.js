/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */

 const MinHeap = function() {
  this.heap = []
}

MinHeap.prototype.parent = function(index) {
  return Math.floor((index - 1) / 2)
}

MinHeap.prototype.left = function(index) {
  return (index * 2) + 1
}

MinHeap.prototype.right = function(index) {
  return (index * 2) + 2
}

MinHeap.prototype.size = function() {
  return this.heap.length
}

MinHeap.prototype.swap = function(parent, child) {
 [this.heap[parent], this.heap[child]] = [this.heap[child], this.heap[parent]]
}

MinHeap.prototype.add = function(el) {
  this.heap.push(el)
  let index = this.heap.length-1
  while(index !== 0 && this.heap[this.parent(index)][1] > this.heap[index][1] || index !== 0 && this.heap[this.parent(index)[1]] === this.heap[index][1] && this.heap[this.parent(index)][0] < this.heap[index][0]){
      this.swap(index, this.parent(index))
  }
}

MinHeap.prototype.extractMin = function() {
  this.swap(0, this.heap.length-1)
  const min = this.heap.pop()
  this.heapify(0)
  return min;
}

MinHeap.prototype.heapify = function(index) {
  let left = this.left(index)
  let right = this.right(index)
  let smallest = 0;

  if(left < this.heap.length && this.heap[left][1] < this.heap[smallest][1] || left < this.heap.length && this.heap[left][1] === this.heap[smallest][1] && this.heap[left][0] > this.heap[smallest][0]) {
      this.swap(left, smallest)
      smallest = left
  }
  if(right < this.heap.length && this.heap[right][1] < this.heap[smallest][1]  || right < this.heap.length && this.heap[right][1] === this.heap[smallest][1] && this.heap[right][0] > this.heap[smallest][0]){
      this.swap(right, smallest)
      smallest = right
  }
  if(index !== smallest) {
      this.heapify(smallest)
  }
}


var topKFrequent = function(words, k) {

  const freqHash = new Map()
  const res = []
  const minHeap = new MinHeap

  words.forEach(word => {
      freqHash.set(word, freqHash.has(word) ? freqHash.get(word) + 1 : 1)
  })

  freqHash.forEach((value, key) => {
      if(minHeap.size() === k){
          minHeap.add([key, value])
          minHeap.extractMin()
      } else {
          minHeap.add([key, value])
      }
  })

  while(minHeap.size()){
      res.unshift(minHeap.extractMin()[0])
  }

  return res

};

/*
input: array of words, k (int, the number of most freq words)
output: array of k most freq words


brute force:
1. loop through words
2. add each word to a hash, if it exists increment, if it doesnt exist add it with a 1 value
3. create a words array from hash keys
3. sort the words array based on the freq number in the hash (from highest freq to lowest) (this will mutate words)
4. return array of words sliced at k

time: 0(nlogn)
space: 0(n)

optimized:
1. loop through words
2. hash freq of words
3. create a min heap, based on freq
4. add each key to min heap for its freq
5. min heap stays max size of k
6. if minheap is k, add new word freq and remove top
7. once finished looping through words, remove each min and unshift into an array
8. return the array

time: 0(n log k)
space: 0(n)

*/
