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
var addTwoNumbers = function (l1, l2) {
  let listOne = reverseList(l1);
  let listTwo = reverseList(l2);
  let head = null;
  let carry = 0;

  while (listOne !== null || listTwo !== null) {
    let x1 = listOne != null ? listOne.val : 0;
    let x2 = listTwo != null ? listTwo.val : 0;

    let sum = (carry + x1 + x2) % 10;
    carry = (carry + x1 + x2) / 10;

    const curr = new ListNode(sum);
    curr.next = head;
    head = curr;

    listOne = listOne !== null ? listOne.next : null;
    listTwo = listTwo !== null ? listTwo.next : null;
  }
  //add one more node if carry is one
  if (carry !== 0) {
    const curr = new ListNode(carry);
    curr.next = head;
    head = curr;
  }

  return head;
};

var reverseList = function (head) {
  if (head === null) {
    return head;
  }
  let last = head;
  let curr = head.next;
  head.next = null;
  while (curr !== null) {
    let temp = curr.next;
    curr.next = last;
    last = curr;
    curr = temp;
  }
  return last;
};

//add complete numbers from both lists
//

//traverse both lists and add numbers to a string
//parse int strings and add them together
//split and create a linked list
//return linked list

//*simplify string transformation by using base math equation /10 for something

//add complete numbers from both lists
//

//traverse both lists and add numbers to a string
//parse int strings and add them together
//split and create a linked list
//return linked list

//*simplify string transformation by using base math equation /10 for something

//first solution, doesnt work for large decimal numbers, you cant use string/parse int, must use math

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
var addTwoNumbers = function (l1, l2) {
  const firstNum = traversal(l1, l1.val.toString());
  const secondNum = traversal(l2, l2.val.toString());
  const total = (parseInt(firstNum) + parseInt(secondNum)).toString();
  const pseudoHead = new ListNode();
  let current = pseudoHead;

  for (let i = 0; i < total.length; i++) {
    const node = new ListNode(total[i]);
    current.next = node;
    current = current.next;
  }

  return pseudoHead.next;
};

const traversal = function (list, string) {
  if (list.next !== null) {
    return (string += traversal(list.next, list.next.val.toString()));
  }
  return string;
};

//add complete numbers from both lists
//

//traverse both lists and add numbers to a string
//parse int strings and add them together
//split and create a linked list
//return linked list

//*simplify string transformation by using base math equation /10 for something
