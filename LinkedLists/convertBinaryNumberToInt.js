/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function (head) {
  let concatenatedNum = "";

  while (head !== null) {
    concatenatedNum += head.val.toString();
    head = head.next;
  }
  //we are saying that we are parsing the number from base 2 into base 10
  return parseInt(concatenatedNum, 2);
};

//input: linked list head
//output: integer

//clarification
//linked list altogether represents a binary number
//convert the number from base 2 (binary), to base 10 (decimal)

//edge cases:
//head is 0 = 0

//example
//1 -> 1 -> 0
//

//approach

//variables:
//concatenatedNum
//

//at each iteration
//add node.val to concatenadedNum
//head = head.next
//termination condition: head === null

//return parseInt from base 2 to base 10

//time complexity: 0(n)
//space complexity: 0(n)

//optimized approach:
//instead of dealing with strings, add number to concatVar in base 2, then parse into base 10? would improve to 0(1) space
