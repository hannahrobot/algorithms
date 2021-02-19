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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  let beforeHead = new ListNode(0);
  let before = beforeHead;
  let afterHead = new ListNode(0);
  let after = afterHead;

  while (head !== null) {
    if (head.val < x) {
      before.next = head;
      before = before.next;
    } else {
      after.next = head;
      after = after.next;
    }
    head = head.next;
  }

  after.next = null;

  before.next = afterHead.next;

  return beforeHead.next;
};

//approach
//variables
//p1 dummyhead
//p2 dummyhead
//iterate from curr through p1 see if anythings equal to or bigger than num, when you find it attatch it to the end/curr of p2
//itereate from curr through p2, when you find something smaller than num, attach it to the end/curr of p1

//when you reach the end of p1 or p2,

//while(p1curr.next !== null or p2curr.next !== null)
//    if(listOne)
//checkp1: is currp1.next less than num ? if yes curp1 ++, if //not p2curr.next = p1curr.next, p1curr.next = null

//else
//checkp2: is currp2 less than num? if yes p1.curr.next = //p2curr.next, p1curr.next = null : currp2 ++
//. listOne = !listOne

//p1curr.next = p2 phead.next

//return p1

//input: head of a list, x: val/num
//output: list partitioned in place:  values lower than x come before values equal to or greater than x, maintain the original order for vals below and above
//edge cases: head is empty, x is lower than lowest n x is higher than or equal to highest

//is there a preference for in place or new list?

//ex:
//input: 1-4-5-2-3-8, 2
//p2:

//output:1-2-4-5-3-8

//

//input: 1-4-2-4-3-3-6-7-8-6, 6

//p2:
//output:1-
//------------------
//input: 6-7-3-6-5-9-6-5-7-2-3-5-1-null

//p1:phead-3-5-9-6-5-2-3-5-1-null
//p2:phead-6-7-6-7-

//scan list
//if node is bigger than or equal to target save it to a p2 list
//iterate p2 list, if less than target float back to main
//if you get to the end of p2(null tail), put p2 head onto list

//scan list, curr node. next equals anything under target
//save .next.next as a temp list
