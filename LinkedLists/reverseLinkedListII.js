/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  let pseudoHead = new ListNode(0, head);
  let beforeM;
  let nodeN;
  let curr = pseudoHead;
  let prev;
  let next;
  let count = 0;

  //edge cases:
  if (head === null || head.next === null || m === n) {
    return head;
  }

  while (count < m - 1) {
    curr = curr.next;
    count++;
  }
  beforeM = curr;
  count++;

  prev = curr.next;
  nodeN = prev;
  curr = prev.next;
  next = curr.next;
  while (count < n && next !== null) {
    curr.next = prev;
    prev = curr;
    curr = next;
    next = next.next;
    count++;
  }
  if (count < n && next === null) {
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  beforeM.next = prev;
  nodeN.next = curr;

  return pseudoHead.next;
};

//time: 0(n)
//space: 0(1)
