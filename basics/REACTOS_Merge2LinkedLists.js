/*

Prompt:

Write a function that takes in the heads of two Singly Linked Lists that are in sorted order, respectively. The function should merge the lists in place (i.e., it shouldn't create a brand new list) and return the head of the merged list; the merged list should be in sorted order.

Each LinkedList node has an integer value as well as a next node pointing to the next node in the list or to null if it's the tail of the list.

EXAMPLES

headOne = 2 -> 6 -> 7 -> 8 // the head node with value 2
headTwo = 1 -> 3 -> 4 -> 5 -> 9 -> 10 // the head node with value 1
mergeLinkedLists(headOne, headTwo) = 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 // the new head node with value 1

HINTS:
You can iterate through the Linked Lists from head to tail and merge them along the way by inserting nodes from the second Linked List into the first Linked List.
You'll need to manipulate three nodes at once at every step.

*/

//Solution 1
//Optimized Solution 1:

function mergeLinkedLists(headOne, headTwo) {
  let p1 = headOne
  let p1Prev = null
  let p2 = headTwo
  while (p1 !== null && p2 !== null) {
    if (p1.value < p2.value) {
      p1Prev = p1
      p1 = p1.next
    } else {
      if (p1Prev !== null) p1Prev.next = p2
      p1Prev = p2
      p2 = p2.next
      p1Prev.next = p1
    }
  }
  if (p1 === null) p1Prev.next = p2
  return headOne.value < headTwo.value ? headOne : headTwo
}

// O(n+m) time complexity
// n = length(headOne), m = length(headTwo)
// O(1) space complexity

//-------------------------------------------------------

// Solution 2
// Optimized Solution 2:

// Using Recursion

function mergeLinkedLists(headOne, headTwo) {
  recursiveMerge(headOne, headTwo, null);
  return headOne.value < headTwo.value ? headOne : headTwo;
}
​
function recursiveMerge(p1, p2, p1Prev) {
  if (p1 === null) {
    p1Prev.next = p2;
    return;
  }
  if (p2 === null) return;
​  if (p1.value < p2.value) {
    recursiveMerge(p1.next, p2, p1);
  } else {
    if (p1Prev !== null) p1Prev.next = p2;
    const newP2 = p2.next;
    p2.next = p1;
    recursiveMerge(p1, newP2, p2);
  }
}

//-------------------------------------------------------

// O(n+m) time complexity
// n = length(headOne), m = length(headTwo)
// O(n+m) space complexity

//Hannah's SUPER SIMPLIFIED RECURSIVE SOLUTION

 var mergeTwoLists = function(l1, l2) {

  if(l1 === null || l2 === null) {
      return l1 === null ? l2 : l1
  }

  let p1 = l1.val <= l2.val ? l1 : l2
  let p2 = p1 === l1 ? l2 : l1
  const head = p1

  head.next = mergeTwoLists(p1.next, p2)

  return head;
};

// O(n+m) time complexity
// n = length(headOne), m = length(headTwo)
// O(n+m) space complexity
