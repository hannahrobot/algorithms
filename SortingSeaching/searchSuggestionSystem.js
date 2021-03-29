//simple search

const suggestedProducts = (products, searchWord) => {
  const result = [];
  products.sort();
  for (let idx = 0; idx < searchWord.length; ++idx) {
    const next = [];
    result.push([]);
    for (let i = 0; i < products.length; ++i) {
      if (products[i][idx] === searchWord[idx]) {
        next.push(products[i]);
        if (result[idx].length < 3) {
          result[idx].push(products[i]);
        }
      }
    }
    products = next;
  }
  return result;
};

// Time complexity: O(searchWord.length * products.length)
// Space complexity: O(products.length)

//binary search:

const suggestedProducts = (products, searchWord) => {
  const result = Array.from({ length: searchWord.length }, () => []);
  let left = 0;
  let right = products.length - 1;
  products.sort();
  for (let idx = 0; idx < searchWord.length; ++idx) {
    const targetChar = searchWord[idx];
    for (let low = left, high = right; low < high; ) {
      const mid = Math.floor((high + low) / 2);
      products[mid][idx] === undefined || products[mid][idx] < targetChar
        ? (low = mid + 1)
        : (high = mid);
      left = low;
    }
    for (let low = left, high = right; low < high; ) {
      const mid = Math.ceil((high + low) / 2);
      products[mid][idx] > targetChar ? (high = mid - 1) : (low = mid);
      right = high;
    }
    for (let i = 0; i < 3; ++i) {
      if (left + i > right || products[left + i][idx] !== targetChar) break;
      result[idx].push(products[left + i]);
    }
    if (result[idx].length === 0) break;
  }
  return result;
};

// Time complexity: O(searchWord.length * log(products.length))
// Space complexity: O(1)

//trie and DFS with children as 26 char code array
/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */

const TrieNode = function (char) {
  this.char = char;
  this.children = new Array(26).fill(null);
};

var suggestedProducts = function (products, searchWord) {
  const root = new TrieNode("");
  const lists = [];

  //iterate through products & add products to tree
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    let curr = root;
    for (let j = 0; j < product.length; j++) {
      let char = product[j];
      if (!curr.children[product.charCodeAt(j)]) {
        curr.children[product.charCodeAt(j)] = new TrieNode(char);
      }
      curr = curr.children[product.charCodeAt(j)];
      if (j === product.length - 1) {
        curr.children.push("#");
      }
    }
  }

  const memo = new Map();

  //find all paths from node
  const DFS = function (node) {
    //basecase:
    if (node === "#") {
      return [""];
    }
    if (!node) {
      return [];
    }

    if (memo.has(node)) {
      return memo.get(node);
    }

    let ans = [];

    //recursive
    //iterate through all children, add curr char to res
    node.children.forEach((child) => {
      const res = DFS(child);
      res.forEach((str) => {
        ans.push(node.char + str);
      });
    });

    memo.set(node, ans);

    return ans;
  };
  let curr = root;
  let prefix = "";
  for (let i = 0; i < searchWord.length; i++) {
    const char = searchWord[i];
    console.log("char", char);
    console.log("curr", curr);
    if (!curr) {
      lists.push([]);
    } else {
      curr = curr.children[searchWord.charCodeAt(i)];
      let paths = DFS(curr);
      lists.push(paths.slice(0, 3).map((str) => prefix + str));
      prefix += char;
    }
  }
  return lists;
};

//trie and DFS with children as map:

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */

const MaxHeapCustom = function () {
  this.heap = [];
};

MaxHeapCustom.prototype.parent = function (index) {
  return Math.floor((index - 1) / 2);
};

MaxHeapCustom.prototype.leftChild = function (index) {
  return index * 2 + 1;
};

MaxHeapCustom.prototype.rightChild = function (index) {
  return index * 2 + 2;
};

MaxHeapCustom.prototype.size = function () {
  return this.heap.length;
};

MaxHeapCustom.prototype.swap = function (index1, index2) {
  [this.heap[index1], this.heap[index2]] = [
    this.heap[index2],
    this.heap[index1],
  ];
};

MaxHeapCustom.prototype.insert = function (val) {
  this.heap.push(val);
  let index = this.heap.length - 1;
  while (index !== 0 && this.heap[index] > this.heap[this.parent(index)]) {
    this.swap(index, this.parent(index));
    index = this.parent(index);
  }
};

MaxHeapCustom.prototype.extractMax = function () {
  const max = this.heap[0];
  this.heap[0] = this.heap[this.heap.length - 1];
  this.heap.pop();
  this.heapify(0);
  return max;
};

MaxHeapCustom.prototype.heapify = function (index) {
  const left = this.leftChild(index);
  const right = this.rightChild(index);
  let biggest = index;
  if (left < this.heap.length && this.heap[left] > this.heap[biggest]) {
    biggest = left;
  }
  if (right < this.heap.length && this.heap[right] > this.heap[biggest]) {
    biggest = right;
  }
  if (index !== biggest) {
    this.swap(biggest, index);
    this.heapify(biggest);
  }
};

const TrieNode = function (char) {
  this.char = char;
  this.children = new Map();
};

var suggestedProducts = function (products, searchWord) {
  const root = new TrieNode("");
  const lists = [];

  //iterate through products & add products to tree
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    let curr = root;
    for (let j = 0; j < product.length; j++) {
      let char = product[j];
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode(char));
      }
      curr = curr.children.get(char);
      if (j === product.length - 1) {
        curr.children.set("#", null);
      }
    }
  }

  const memo = new Map();

  //find all paths from node
  const DFS = function (node) {
    //basecase:
    if (!node) {
      return [""];
    }

    if (memo.has(node)) {
      return memo.get(node);
    }

    let ans = [];

    //recursive
    //iterate through all children, add curr char to res
    node.children.forEach((child) => {
      const res = DFS(child);
      res.forEach((str) => {
        ans.push(node.char + str);
      });
    });

    memo.set(node, ans);

    return ans;
  };

  //iterate through search word
  //DFS to find all paths
  //iterate through paths:
  //add paths to maxheap (limit size of 3)
  //pop off maxheap and unshift into list
  //push list to lists

  let curr = root;
  let prefix = "";
  for (let i = 0; i < searchWord.length; i++) {
    const char = searchWord[i];
    let paths = [];
    let heap = new MaxHeapCustom();
    if (curr.children.has(char)) {
      curr = curr.children.get(char);
      paths = DFS(curr);
      // console.log('paths', paths)
    }
    while (paths.length) {
      if (heap.size() === 3) {
        const max = heap.extractMax();
      }
      heap.insert(prefix + paths.pop());
    }
    const inorder = [];
    while (heap.size()) {
      inorder.unshift(heap.extractMax());
    }
    lists.push(inorder);
    prefix += char;
  }
  return lists;
};
/*
input: products: array of strings, searchWord: string
output: list of lists, of suggested products after each character of searchword is typed
edge: searchWord is empty, products is empty

ex:

Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [
["mobile","moneypot","monitor"],
["mobile","moneypot","monitor"],
["mouse","mousepad"],
["mouse","mousepad"],
["mouse","mousepad"]
]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"]
After typing m and mo all products match and we show user ["mobile","moneypot","monitor"]
After typing mou, mous and mouse the system suggests ["mouse","mousepad"]


at each character, we add to our prefix and return the 3 smallest lexicographically products

approach:

iterate through products
build a trie datastructure
add products to tree by character
mark the end of a word by a # simble it its children

TrieNode: char, children
char: char
children: map: key(char), val(node)

initial head of TrieNode
TrieNode:
char: ''
children:
^as we add children,
we check if char exists:
if it exists, we go straight to that next char
else: we add the char, create node for val,
go to that childnode, and add the next char to that child
when we are on the last char of product, we add that char, and # to its children

now that our tree is created:

iterate through searchword
at each iteration:
  const list = DFS: find all possible paths/words from the character
  sort list lexicographically for ascending min - max (0(nlogn))
  add top 3 as an array to our output lists
  *instead of sorting, we add them to max heap, if we have more than 3, pop top
      * add that arr to output lists(pop max and unshift into list arr)
      *0(nlog3)

return lists


overall time complexity: 0(m)
overall space complexity: (26^n)
*/
