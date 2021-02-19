/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let pointerA = headA;
  let pointerB = headB;
  let cycle = 0;

  while (pointerA !== pointerB && cycle <= 2) {
    if (pointerA === null) {
      pointerA = headB;
      cycle++;
    } else {
      pointerA = pointerA.next;
    }
    if (pointerB === null) {
      pointerB = headA;
      cycle++;
    } else {
      pointerB = pointerB.next;
    }
  }

  return cycle > 2 ? null : pointerA;
};

//input: head of each list
//output: node where they intersect
//edge cases: they never meet, the other list is null, their first node is connected

//ex:

//8->1->3
//        \
//         5 -> 6 -> 7 -> null
//        /
//    2->1

//approach:

//////////////////3: pointers

//////////////////2: hash

//add nodes from headA into a hash with their val as key, object as val
//iterate through headb: check the hash based on val

///////////////////1: brute force

//iterate through entire heada, checking it it matches b1, then through entire see if it matches b2, etc
