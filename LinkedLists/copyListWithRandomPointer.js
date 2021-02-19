//----------------------------

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
const visited = new Map();

var copyRandomList = function (head) {
  if (head === null) {
    return null;
  }

  if (visited.has(head)) {
    return visited.get(head);
  }

  const node = new Node(head.val, null, null);

  visited.set(head, node);

  node.next = copyRandomList(head.next);
  node.random = copyRandomList(head.random);

  return node;
};

//recursive simplified

//--------------------------
//iterative solution:

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (head === null) {
    return null;
  }

  const copyHead = new Node(head.val, null, null);
  let copyNode = copyHead;
  let givenNode = head;
  const hash = new Map();

  while (givenNode !== null) {
    hash.set(givenNode, copyNode);

    if (givenNode.next !== null) {
      const copyNext = new Node(givenNode.next.val, null, null);
      copyNode.next = copyNext;
    } else {
      copyNode.next = null;
    }
    copyNode = copyNode.next;
    givenNode = givenNode.next;
  }

  copyNode = copyHead;
  givenNode = head;

  while (givenNode !== null) {
    copyNode.random = hash.get(givenNode.random);
    copyNode = copyNode.next;
    givenNode = givenNode.next;
  }

  return copyHead;
};

//input: head of a SLL: has .next, random
//output: head of a deep copy: sll, have random and next pointers
//edge cases: cycling: random pointers? no; head null, return null,

//ex
//list 1->2->3->5->6->n
//rndm 2. 3. 6. n  1

//approach

//variables
//make a new node as CopyHead, assign the value of given head
//head
//curent node = head.next
//current copy node = copy head.next
//hash: (javascript map) it uses given node as key, copied node as value

//iterate through the list
//on each iteration:
//1. set given node as hash key, copied node as value
//2. make a new node: the value of the node will be the value of given nodes next value
//3. point current nodes next to new node
//4. make current node = the next node (that we just created)
//termination condition:
//given node equals null

//copy list current node- set its next to null

//iterate over list again
//look random pointers
//random pointer of current copy node = hash[current given node]
//iterate through the next
//termination condition: current given node is null

//return copy list head

//time: 0(n)
//space: 0(n)

//--------------------------

//interleaving one list, iterating over it twice
//0(n)
//0(n)

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (head === null) {
    return null;
  }

  const copyHead = new Node(head.val, null, null);
  const hash = new Map();

  const recurse = function (curr, copy) {
    if (curr === null) {
      return;
    }
    hash.set(curr, copy);

    if (curr.next !== null) {
      const next = new Node(curr.next.val, null, null);
      copy.next = next;
    } else {
      copy.next = null;
    }

    recurse(curr.next, copy.next);
  };

  const copyRandom = function (curr, copy) {
    if (curr === null) {
      return;
    }
    copy.random = hash.get(curr.random);
    copyRandom(curr.next, copy.next);
  };

  recurse(head, copyHead);
  copyRandom(head, copyHead);

  return copyHead;
};

//recursive approach
