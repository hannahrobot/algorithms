function shiftLinkedList(head, k) {
  let tail = head;
  let newTail = head;
  let length = 1;

  //get the length of list
  while (tail.next !== null) {
    length++;
    tail = tail.next;
  }

  //if the length is divisible by k we will end up with same list
  const offset = Math.abs(k) % length;
  if (offset === 0) {
    return head;
  }

  let newTailPosition = k > 0 ? length - offset : offset;

  //increment p2 to set up k interval
  while (newTailPosition > 1) {
    newTail = newTail.next;
    newTailPosition--;
  }

  const temp = newTail.next;
  //p2 becomes the new tail
  newTail.next = null;
  //unify the end with the beginning
  tail.next = head;

  return temp;
}

// This is the class of the input linked list.
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Do not edit the line below.
exports.shiftLinkedList = shiftLinkedList;
