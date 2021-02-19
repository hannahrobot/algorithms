//one pass pointers:
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
 * @return {ListNode}
 */

function deleteDuplicates(head) {
  // sentinel
  const sentinel = new ListNode(0, head);

  // predecessor = the last node
  // before the sublist of duplicates
  let pred = sentinel;

  while (head != null) {
    // if it's a beginning of duplicates sublist
    // skip all duplicates
    if (head.next != null && head.val == head.next.val) {
      // move till the end of duplicates sublist
      while (head.next != null && head.val == head.next.val) {
        head = head.next;
      }
      // skip all duplicates
      pred.next = head.next;
      // otherwise, move predecessor
    } else {
      pred = pred.next;
    }

    // move forward
    head = head.next;
  }
  return sentinel.next;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const sentinel = new ListNode(0);
  let pred = sentinel;

  //                     p
  //                     h
  //      s
  //input:p->1->2->3->3->4->4->4->5->null

  while (head !== null) {
    // if it's a beginning of duplicates sublist
    // skip all duplicates
    if (head.next !== null && head.val === head.next.val) {
      // move till the end of duplicates sublist
      while (head.next !== null && head.val === head.next.val) {
        head = head.next;
      }
      //skip all duplicates
      pred.next = head.next;
      //otherwise, move predecessor
    } else {
      pred = pred.next;
    }
    head = head.next;
  }

  return sentinel.next;
};

//two pass hashMap:
//time: 0(n) traverse 2 times by length
//space: 0(n) hashmap

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const hashMap = {};
  const pseudoHead = new ListNode(0);
  let curr = head;

  //build hashMap
  while (curr !== null) {
    if (hashMap.hasOwnProperty(curr.val)) {
      hashMap[curr.val]++;
    } else {
      hashMap[curr.val] = 1;
    }
    curr = curr.next;
  }

  let build = pseudoHead;
  curr = head;

  while (curr !== null) {
    while (curr !== null && hashMap[curr.val] > 1) {
      curr = curr.next;
    }
    build.next = curr;
    build = build.next;
    curr = curr === null ? null : curr.next;
  }

  if (build !== null) {
    build.next = null;
  }

  return pseudoHead.next;
};

/*notes:

input: head of a linked list
output: same list with only distinct nums
edge case: head is null, all arent distrinct: return null

ex:       a
                 b
                       c
input: 1->2->3->3->4->4->4->5->null
output: 1->2->5->null

input: 1->1->3->3->4->null
output: 4->null

input: 1->1->3->3->4->4->null
output: null

input: 1->null
output: 1->null

input: null
output: null

--------------------------
approach: pointers
  check if head is null, or head.next is null: return head;

pseudohead: create node: set psedudohead.next = head

anchor = pseudohead
curr = anchor.next

loop:
  while curr = curr.next{
      curr = curr.next
  }
  if(curr !== curr.next && curr.next !== curr.next.next){
      anchor = anchor.next
      anchor.next = curr
  }
  curr = curr.next

approach: hashMap
  iterate through the list: hash values with count
  iterate through the list again: if hash count is > 1 skip it


*/
