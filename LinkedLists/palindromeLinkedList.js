//iterate to middle, reverse mid to end, iterate towards middle
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
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (head === null || head.next === null) {
    return true;
  }
  if (head.next.next === null) {
    if (head.val === head.next.val) {
      return true;
    } else {
      return false;
    }
  }

  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  //reverse end pointers to middle
  let prev = slow;
  let curr = prev.next;
  let temp = curr.next;
  curr.next = prev;
  prev.next = null;
  prev = curr;
  curr = temp;

  while (curr !== null) {
    temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }

  let start = head;
  let end = prev;

  //iterate towards middle comparing each
  while (end !== null) {
    if (start.val === end.val) {
      start = start.next;
      end = end.next;
    } else {
      return false;
    }
  }
  return true;
};
