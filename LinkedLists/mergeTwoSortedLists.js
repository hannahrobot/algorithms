//merge two sorted linked lists

//input: head, head, there two sorted ll, singly linked
//output: single list (head)
//edge case: if one head is null return the other

//notes:
//0(1) space
//

//ex:
/*
input: 1->2->3->4->4->6->7->null

p2 8->null

p2 =


output: 1->2->3->4->4->6->7->8->null


input: 3->6->8->null
       4->5->9->null

output: 3->4->5->6->8->9->null


input: null
      1-> null
output: 1-> null

*/

//approach:

//in place
/*

edge cases

variables:
p1 =
p2 =
originalHead =

pick the smaller head as starting point
p1 = smaller head
p2 = bigger head

while(p1.next !== null) {
  check if p1.next <= p2
  p1 = p1.next

  temp p1.next
  p1.next = p2
  p2 = temp
}
p1.next p2

return head of p1

input: 3->
6->8->null
       3->5->9->null

*/

// function mergeSorted(head1, head2) {

//   if(head1 === null || head2 === null) {
//     return head1 === null? head1 : head2
//   }

//   let p1;
//   let p2;
//   let origHead;

//   p1 = head1.val <= head2.val ? head1 : head2
//   p2 = head1.val > head2.val ? head1 : head2

//   origHead = p1

//   while(p1.next !== null && p2 !== null){

//     if(p1.next.val <= p2.val) {
//       p1 = p1.next
//     } else {
//       let temp = p1.next
//       p1.next = p2
//       p2 = temp
//     }
//   }

//   p1.next = p2

//   return origHead;
// }

function mergeSorted(head1, head2) {
  // console.log('head1', head1.val)
  // console.log('head2', head2.val)

  if (head1 === null || head2 === null) {
    return head1 === null ? head2 : head1;
  }

  let p1;
  let p2;
  let origHead;

  p1 = head1.val <= head2.val ? head1 : head2;
  p2 = head1.val > head2.val ? head1 : head2;

  origHead = p1;

  p1.next = mergeSorted(p1.next, p2);

  // function recurse(P1, P2) {

  //   if(P1.next === null || P2 === null){
  //     P1.next = P2
  //     return;
  //   }

  //   if(P1.next.val <= P2.val) {
  //     recurse(P1.next, P2)
  //   } else {
  //     let temp = P1.next
  //     P1.next = P2
  //     recurse(P1, temp)
  //   }
  // }
  // recurse(p1, p2)

  return origHead;
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

//return list of nodes
function createNodeList(arr) {
  const pseudoHead = new ListNode();
  let curr = pseudoHead;
  for (let i = 0; i < arr.length; i++) {
    const newNode = new ListNode(arr[i]);
    curr.next = newNode;
    curr = curr.next;
  }

  return pseudoHead.next;
}

const listOne = createNodeList([3, 6, 8]);
const listTwo = createNodeList([4, 5, 9]);

// console.log(mergeSorted(listOne, listTwo))

function helper(head) {
  const arr = [];
  while (head !== null) {
    arr.push(head.val);
    head = head.next;
  }
  return arr;
}

console.log(helper(mergeSorted(listOne, listTwo)));

//1: 1, 2, 3-null

// null
