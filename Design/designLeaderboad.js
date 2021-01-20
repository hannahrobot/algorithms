//naive solution

//within top (k)
//get object.values
//sort
//return slice(0, k)
/////////////////////
//optomize
//heap could be used
//the time complexity of adding an element to heap is 0(log n)
//the time complexity of retrieving an element is 0(1)

//the desicion to use a heap with these time complexities would depend on how often scores are added as opposed to how often they are retrieived, with a leaderboard, they are pretty in line with one another, since we would retrieve the updated leaderboard everytime a score is added that is greater than the top elements

//alternate solutions to heap would be to add an element to the end of the leaderboard and resort all of the elements (0(nlogn)) each time, or to create a BST, which would take 0(nlogn) to find each of the tops elements

//a heap is created like a BFS queue, most popularly with javascript using an array

//heap implementation

//TIME COMPLEXITY
//0(1) for add score
//o(1) for reset
//0(n log k) : it takes 0(k) to construct the initial heap, and for the rest of n-k elements, we perform extractmin and add operations on the heap each of which take (logK) time

//SPACE COMPLEXITY:
//0(n + k) : where 0(n) is used by the scores hash, and 0(k) is used by the heap

//create a heap class
class Heap {
  constructor() {
    this.elements = [];
  }

  get top() {
    return this.elements[0];
  }

  get all() {
    return this.elements;
  }

  //custom push adds it to the end and swaps until it finds its place
  push(element) {
    this.elements.push(element);
    let index = this.elements.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.elements[parentIndex] > this.elements[index]) {
        [this.elements[parentIndex], this.elements[index]] = [
          this.elements[index],
          this.elements[parentIndex],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
    return;
  }

  //pop takes off the first element and replaces it with the last element, swaps until its in the right place
  pop() {
    if (!this.elements) {
      return;
    }
    this.elements[0] = this.elements[this.elements.length - 1];
    this.elements.pop();

    let index = 0;

    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let swap = null;

      if (leftChild < this.elements.length) {
        if (this.elements[leftChild] < this.elements[index]) {
          swap = leftChild;
        }
      }

      if (rightChild < this.elements.length) {
        if (
          this.elements[rightChild] < this.elements[index] &&
          this.elements[rightChild] < this.elements[leftChild]
        ) {
          swap = rightChild;
        }
      }

      if (!swap) {
        break;
      }
      [this.elements[swap], this.elements[index]] = [
        this.elements[index],
        this.elements[swap],
      ];
      index = swap;
    }
  }
}

/**
 * Your Leaderboard object will be instantiated and called as such:
 * var obj = new Leaderboard()
 * obj.addScore(playerId,score)
 * var param_2 = obj.top(K)
 * obj.reset(playerId)
 */

class Leaderboard {
  constructor() {
    this.scores = {};
  }

  /**
   * @param {number} playerId
   * @param {number} score
   * @return {void}
   */
  addScore(playerId, score) {
    if (!(playerId in this.scores)) {
      this.scores[playerId] = 0;
    }
    this.scores[playerId] += score;
  }

  /**
   * @param {number} K
   * @return {number}
   */
  top = function (K) {
    let heap = new Heap();
    let allScores = Object.values(this.scores);
    allScores.slice(0, K).forEach(function (score) {
      heap.push(score);
    });
    allScores.slice(K, allScores.length).forEach(function (score) {
      if (score > heap.top) {
        heap.pop();
        heap.push(score);
      }
    });
    return heap.all.reduce(function (total, current) {
      return total + current;
    }, 0);
  };

  /**
   * @param {number} playerId
   * @return {void}
   */
  reset = function (playerId) {
    delete this.scores[playerId];
  };
}
