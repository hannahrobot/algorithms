/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists(head1, head2) {
  if (!head1 || !head2) {
    return head1 ? head1 : head2;
  }

  let p1 = head1.val < head2.val ? head1 : head2;
  let p2 = p1 === head1 ? head2 : head1;
  const origHead = p1;

  while (p1.next !== null && p2 !== null) {
    if (p1.next.val <= p2.val) {
      p1 = p1.next;
    } else {
      const temp = p1.next;
      p1.next = p2;
      p2 = temp;
      p1 = p1.next;
    }
  }

  p1.next = p2;

  return origHead;
}

//-----------

//recursive
function merge2Lists(head1, head2) {
  if (!head1 || !head2) {
    return head1 ? head1 : head2;
  }

  const p1 = head1.val < head2.val ? head1 : head2;
  const p2 = p1 === head1 ? head2 : head1;

  p1.next = merge2Lists(p1.next, p2);

  return p1;
}
