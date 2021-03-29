///recursive
//time complexity: 0(n)
//space complexity: 0(n)

function flatten(head) {
  if (head == null) return head;
  // pseudo head to ensure the `prev` pointer is never none
  const pseudoHead = new Node(0, null, head, null);

  flattenDFS(pseudoHead, head);

  // detach the pseudo head from the real head
  pseudoHead.next.prev = null;
  return pseudoHead.next;
}
/* return the tail of the flatten list */
function flattenDFS(prev, curr) {
  if (curr == null) return prev;
  curr.prev = prev;
  prev.next = curr;

  // the curr.next would be tempered in the recursive function
  let tempNext = curr.next;

  let tail = flattenDFS(curr, curr.child);
  curr.child = null;

  return flattenDFS(tail, tempNext);
}

//iterative
//uses a stack
//time complexity: 0(n)
//space complexity: 0(n)

function flatten(head) {
  if (head == null) return head;

  let pseudoHead = new Node(0, null, head, null);
  let curr,
    prev = pseudoHead;

  const stack = [];
  stack.push(head);

  while (stack.length) {
    curr = stack.pop();
    prev.next = curr;
    curr.prev = prev;

    if (curr.next != null) stack.push(curr.next);
    if (curr.child != null) {
      stack.push(curr.child);
      // don't forget to remove all child pointers.
      curr.child = null;
    }
    prev = curr;
  }
  // detach the pseudo node from the result
  pseudoHead.next.prev = null;
  return pseudoHead.next;
}

//----------------------------------

var flatten = function (head) {
  const traverseList = function (prev, node) {
    if (node === null) {
      return prev;
    }

    if (prev) {
      prev.next = node;
    }

    node.prev = prev;

    const tempNext = node.next;

    const tail = traverseList(node, node.child);

    node.child = null;

    return traverseList(tail, tempNext);
  };

  traverseList(null, head);

  return head;
};
