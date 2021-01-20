//BFS: Breadth First Search with a queue to create a list that has <column, row, node.val>
//sort by priority in a row
//create a hashmap to group by column
//sort hashmap keys
//return mapped array with key-values from hashmap

//time complexity: 0(nlogn)
//space complexity: 0(n)

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const list = BFS(root);

  //sort list by priorities: column => row => val
  list.sort(compare);
  //group vals based on matching columns
  const hashmap = {};

  for (let i = 0; i < list.length; i++) {
    if (!hashmap[list[i][0]]) {
      hashmap[list[i][0]] = [list[i][2]];
    } else {
      hashmap[list[i][0]].push(list[i][2]);
    }
  }

  const keys = Object.keys(hashmap).sort((a, b) => a - b);
  return keys.map((key) => hashmap[key]);
};

function compare(a, b) {
  if (a[0] < b[0]) {
    return -1;
  }
  if (a[0] === b[0]) {
    if (a[1] < b[1]) {
      return -1;
    }
  }
  if (a[0] === b[0]) {
    if (a[1] === b[1]) {
      if (a[2] <= b[2]) {
        return -1;
      }
    }
  }

  return 1;
}

const BFS = function (root) {
  const list = [];
  const q = [[0, 0, root]];

  while (q.length) {
    const item = q.shift();
    let column = item[0];
    let row = item[1];
    let node = item[2];

    if (node !== null) {
      q.push([column - 1, row + 1, node.left]);
      q.push([column + 1, row + 1, node.right]);
      list.push([column, row, node.val]);
    }
  }

  return list;
};

//DFS: depth first search
//time complexity: 0(nlogn)
//space complexity: 0(n)

var verticalTraversal = function (root) {
  const list = [];

  const DFS = function (column, row, root) {
    if (root === null) {
      return;
    }
    list.push([column, row, root.val]);
    DFS(column - 1, row + 1, root.left);
    DFS(column + 1, row + 1, root.right);

    return list;
  };

  DFS(0, 0, root);

  //sort list by priorities: column => row => val
  list.sort(compare);
  //group vals based on matching columns
  const hashmap = {};

  for (let i = 0; i < list.length; i++) {
    if (!hashmap[list[i][0]]) {
      hashmap[list[i][0]] = [list[i][2]];
    } else {
      hashmap[list[i][0]].push(list[i][2]);
    }
  }

  const keys = Object.keys(hashmap).sort((a, b) => a - b);
  return keys.map((key) => hashmap[key]);
};

function compare(a, b) {
  if (a[0] < b[0]) {
    return -1;
  }
  if (a[0] === b[0]) {
    if (a[1] < b[1]) {
      return -1;
    }
  }
  if (a[0] === b[0]) {
    if (a[1] === b[1]) {
      if (a[2] <= b[2]) {
        return -1;
      }
    }
  }

  return 1;
}

// optimized Approach 2: BFS/DFS with Partition Sorting
//Time Complexity: 0(nlog(k/n))
//space complexity: 0(n)

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const hashmap = {};
  //we track the min and max columns
  let min = 0;
  let max = 0;

  const DFS = function (column, row, root) {
    if (root === null) {
      return;
    }
    //update min and max columns
    min = Math.min(column, min);
    max = Math.max(column, max);

    //put directly into the hashmap instead of an array
    if (hashmap[column]) {
      hashmap[column].push([row, root.val]);
    } else {
      hashmap[column] = [[row, root.val]];
    }

    DFS(column - 1, row + 1, root.left);
    DFS(column + 1, row + 1, root.right);
  };

  DFS(0, 0, root);

  const res = [];
  //we use min and max to get through the hashmap in order instead of sorting its keys
  while (min <= max) {
    //we sort the individual arrays in the hashmap by row
    hashmap[min].sort(compare);
    //put them together into an array based on their column and push to result
    res.push(hashmap[min].map((val) => val[1]));
    min++;
  }
  return res;
};

function compare(a, b) {
  if (a[0] < b[0]) {
    return -1;
  }
  if (a[0] === b[0]) {
    if (a[1] < b[1]) {
      return -1;
    }
  }

  return 1;
}
