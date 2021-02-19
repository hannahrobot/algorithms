//optimized iterative Divide and conquer
//merge two lists at a time until we have one list
//time complexity: 0(n log k) array length * lengths of lists
//space complexity: 0 (1) list is halfed as we iterate

var mergeKLists = function (lists) {
  if (!lists.length) {
    return null;
  }

  while (lists.length > 1) {
    const l1 = lists.shift();
    const l2 = lists.shift();
    lists.push(mergeTwoLists(l1, l2));
  }

  return lists[0];
};

var mergeTwoLists = function (l1, l2) {
  if (l1 === null && l2 === null) {
    return null;
  }
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }

  let head = l1.val < l2.val ? l1 : l2;
  let p1 = head;
  let p2 = head === l1 ? l2 : l1;

  while (p1 !== null) {
    while (p1.next !== null && p2 !== null && p1.next.val < p2.val) {
      p1 = p1.next;
    }
    if (p1.next !== null) {
      let tmp = p1.next;
      p1.next = p2;
      p1 = p1.next;
      p2 = tmp;
    } else {
      p1.next = p2;
      return head;
    }
  }
  return head;
};
