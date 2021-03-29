/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (!lists.length) {
    return null;
  }

  while (lists.length > 1) {
    const h1 = lists.shift();
    const h2 = lists.shift();
    lists.push(mergeTwoLists(h1, h2));
  }

  return lists[0];
};

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

/*

approach one: q w/ merge two lists func
  loop through array, merge two at a time until list is one length

approach two: priotity queue
  add heads to a priority queue by val
  put .next node back into priority queue

*/
