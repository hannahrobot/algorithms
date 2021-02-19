//two pass:
//time: 0(n)
//space: 0(1)

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (root, n) {
  let length = 0;
  const head = root;

  while (root !== null) {
    length++;
    root = root.next;
  }

  if (length <= 1) {
    return null;
  }

  root = head;
  let nth = length - n;

  if (nth < 1) {
    return root.next;
  }

  while (nth !== 1) {
    root = root.next;
    nth--;
  }

  root.next = root.next.next;

  return head;
};
