//iterative
//Time complexity : O(\max(m, n))O(max(m,n))
//Space complexity : O(\max(m, n))O(max(m,n))
var addTwoNumbers = function (l1, l2) {
  const dummyHead = new ListNode(0);
  let currentNode = dummyHead;
  let carry = 0;
  let p = l1;
  let q = l2;

  while (p !== null || q !== null) {
    let x = p !== null ? p.val : 0;
    let y = q !== null ? q.val : 0;
    let sum = x + y + carry;
    carry = sum > 9 ? 1 : 0;
    currentNode.next = new ListNode(sum % 10);
    currentNode = currentNode.next;
    if (p !== null) {
      p = p.next;
    }
    if (q !== null) {
      q = q.next;
    }
  }
  if (carry > 0) {
    currentNode.next = new ListNode(carry);
  }
  return dummyHead.next;
};

//[2,4,3]
//[5,6,4]

//recursive
var addTwoNumbers = function (l1, l2) {
  let node = null;
  const carry = arguments[2];
  if (l1 || l2) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const next1 = l1 ? l1.next : null;
    const next2 = l2 ? l2.next : null;
    const val = carry ? val1 + val2 + 1 : val1 + val2;
    node = new ListNode(val % 10);
    node.next = addTwoNumbers(next1, next2, val >= 10);
  } else if (carry) {
    node = new ListNode(1);
    node.next = null;
  }
  return node;
};
