const reorderList = function (head) {
  const hash = {};
  let count = 1;
  let curr = head;
  while (curr !== null) {
    console.log(count);
    hash[count] = curr;
    count++;
    curr = curr.next;
  }
  /*hash {
    1: {val: 1, next: [2, 3, 4,]},
    2: {val: 2, next: [3, 4,]},
    3: {val: 3, next: [4,]},
    4: {val: 4, next: null},
  } */
  count--;
  const length = count;
  curr = head;
  while (count > length / 2 + 1) {
    temp = curr.next;
    curr.next = hash[count];
    curr = curr.next;
    hash[count - 1].next = null;
    curr.next = temp;
    curr = curr.next;
    count--;
  }
  return head;
};
