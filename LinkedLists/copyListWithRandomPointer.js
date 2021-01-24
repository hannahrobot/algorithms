//interleaving one list, iterating over it twice
//0(n)
//0(n)

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  const pointer = head;

  //interleave new list
  while (head !== null) {
    const curr = new Node(head.val, head.next, head.random);
    const temp = head.next;
    head.next = curr;
    head = temp;
  }
  //set head back to beginning
  head = pointer;

  //iterate over list and change pointers for new list, get rid of old list
  while (head.next.next !== null) {
    temp = head.next.next;
    head.next.next = head.next.next.next;
    //if the random is null we dont need to go to the next node
    head.next.random = head.next.random === null ? null : head.random.next;
    head = temp;
  }
  //update the random node for the last element
  head.next.random = head.random.next;

  return pointer.next;
};

//we have our original list
//we have our new list
// --get head.random
// --if head.random === null, assign null to new list random and break
// --count how many next you have to do to get to the random
// --do that many next on our new list
// --assign it

//traverse the linked list and make a deep copy of the nodes

//traverse our copy - fill in our deep copy nodes for randoms

//you have to be aware of cycling in this problem
