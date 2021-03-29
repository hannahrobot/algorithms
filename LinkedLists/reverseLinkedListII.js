var reverseBetween = function (head, left, right) {
  let start = head,
    cur = head;
  let i = 1;
  while (i < left) {
    start = cur;
    cur = cur.next;
    i++;
  }
  let prev = null,
    tail = cur;
  while (i <= right) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
    i++;
  }
  start.next = prev;
  tail.next = cur;
  return left == 1 ? prev : head;
  // if m == 1, we have no need to connect start list with reversed list reversed list itself is the start (or the head)
  // Time Complexity: O(n)
  // Space Complexity: O(1)
};
