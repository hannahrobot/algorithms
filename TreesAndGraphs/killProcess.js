/**
 * @param {number[]} pid
 * @param {number[]} ppid
 * @param {number} kill
 * @return {number[]}
 */

const Node = function (val, children) {
  this.val = val;
  this.children = children;
};

const killProcess = function (pid, ppid, kill) {
  if (ppid.length === 1) {
    return [kill];
  }

  const res = [];

  const hash = {};

  for (let i = 0; i < ppid.length; i++) {
    if (hash.hasOwnProperty(ppid[i])) {
      hash[ppid[i]].children.push(pid[i]);
    } else {
      hash[ppid[i]] = new Node(pid[i], []);
      hash[ppid[i]].children.push(pid[i]);
    }
  }

  const BFS = function (node) {
    const q = [node];

    while (q.length) {
      const curr = q.shift();
      res.push(curr);
      if (hash.hasOwnProperty(curr)) {
        const children = hash[curr].children;
        for (let i = 0; i < children.length; i++) {
          q.push(children[i]);
        }
      }
    }
  };

  BFS(kill);

  return res;
};

//time: 0(n)
//space 0(n)

//approach:
//kill
//traverse the tree: find the kill: log everything past the kill
//BFS(node)
//base case: if node is null
//if boolean is true:once we find kill: push children to res: continue recursion

//ex:
//resarr = [5, 10, 11, 12]

//PID [1, 3, 10, 5, 11, 12]
//PPID[3, 0, 5, 3, 10, 10]

//---------------------------------------

/**
 * @param {number[]} pid
 * @param {number[]} ppid
 * @param {number} kill
 * @return {number[]}
 */

const Node = function (val, children) {
  this.val = val;
  this.children = children;
};

const killProcess = function (pid, ppid, kill) {
  if (ppid.length === 1) {
    return [kill];
  }

  const res = [];

  const hash = {};

  for (let i = 0; i < ppid.length; i++) {
    if (hash.hasOwnProperty(ppid[i])) {
      hash[ppid[i]].children.push(pid[i]);
    } else {
      hash[ppid[i]] = new Node(pid[i], []);
      hash[ppid[i]].children.push(pid[i]);
    }
  }

  const DFS = function (node) {
    res.push(node);

    if (!hash.hasOwnProperty(node)) {
      return;
    }

    const children = hash[node].children;

    for (let i = 0; i < children.length; i++) {
      DFS(children[i]);
    }
  };

  DFS(kill);

  return res;
};

//time: 0(n)
//space 0(n)

//approach:
//kill
//traverse the tree: find the kill: log everything past the kill
//DFS(node)
//base case: if node is null
//if boolean is true:once we find kill: push children to res: continue recursion

//ex:
//resarr = [5, 10, 11, 12]

//PID [1, 3, 10, 5, 11, 12]
//PPID[3, 0, 5, 3, 10, 10]

//------------------------------------

/**
 * @param {number[]} pid
 * @param {number[]} ppid
 * @param {number} kill
 * @return {number[]}
 */

const Node = function (val, children) {
  this.val = val;
  this.children = children;
};

const killProcess = function (pid, ppid, kill) {
  if (ppid.length === 1) {
    return [kill];
  }

  const res = [];

  const hash = {};

  for (let i = 0; i < pid.length; i++) {
    hash[pid[i]] = new Node(pid[i], []);
  }

  for (let i = 0; i < ppid.length; i++) {
    if (ppid[i] !== 0) {
      hash[ppid[i]].children.push(pid[i]);
    }
  }

  const DFS = function (node) {
    res.push(node);

    if (!hash[node].children.length) {
      return;
    }

    const children = hash[node].children;

    for (let i = 0; i < children.length; i++) {
      DFS(children[i]);
    }
  };

  DFS(kill);

  return res;
};

//time: 0(n)
//space 0(n)

//approach:
//kill
//traverse the tree: find the kill: log everything past the kill
//DFS(node, boolean: indicates whether its coming after kill)
//base case: if node is null
//if boolean is true:once we find kill: push children to res: continue recursion

//ex:
//resarr = [5, 10, 11, 12]

//PID [1, 3, 10, 5, 11, 12]
//PPID[3, 0, 5, 3, 10, 10]

//--------------------------------

/**
 * @param {number[]} pid
 * @param {number[]} ppid
 * @param {number} kill
 * @return {number[]}
 */
const killProcess = function (pid, ppid, kill) {
  const resArray = [kill];

  const DFSHelper = function (node) {
    resArray.push(node);
    for (let i = 0; i < ppid.length; i++) {
      if (ppid[i] === node) {
        DFSHelper(pid[i]);
      }
    }
  };

  for (let i = 0; i < ppid.length; i++) {
    if (ppid[i] === kill) {
      DFSHelper(pid[i]);
    }
  }

  return resArray;
};

//input: pid: node on a tree, ppid: parent node, kill is node we want to kill = all of its children will be killed
//ouput: the nodes that will be killed (in an array)
//edge cases: if PID has no childen (just return pid), root is null (return the root); if the root is kill (return all nodes); if kill doesnt exist in the tree

//ex:
//resarr = [5, 10, 11, 12]

//PID [1, 3, 10, 5, 11, 12]
//PPID[3, 0, 5, 3, 10, 10]

//          3
//        1.  5
//           10
//          11 12

//approach:
//kill
//traverse the tree: find the kill: log everything past the kill
//DFS(node, boolean: indicates whether its coming after kill)
//base case: if node is null
//if boolean is true:once we find kill: push children to res: continue recursion

//res array: 5, 10, 11, 12

//killprocess: loop through PPID, when we come accross kill, push kill to res,  call DFS helper with the child node(corresponding index in PID), continue traversing

//DFS helper: push param node into res array, loop through PPID in search of node param, when we find the node, call recursively on corresponding PID index

//return res array

//time: 0(n^n) because im calling ppid over again on each node
//space: 0(n) because res array
