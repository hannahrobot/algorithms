Odd Even Linked List
// /*
// input: ListNode head
// output: ListNode head odd nodes first + even nodes
// corner cases: head == null head.next == null return head
// e.g.          1     -   3   -  4 - 5
//                        odd     |
//                              even

// at each iteration:
//     1. even = odd.next;
//     2. odd.next = even.next
//     3. even.next = null
//     4. prevEven.next = even
//     5. prevEven = even
//     6. odd = odd.next

// termination condition: odd.next.next!= null

// dummyHead -> 2 -> 4
//                   |
//               prevEven


// */

// class Solution{
//     public ListNode oddEvenList(ListNode head){
//         if(head == null || head.next == null) return head;

//         ListNode dummyHead = new ListNode(0);
//         ListNode prevEven = dummyHead;
//         ListNode odd = head;
//         ListNode even = head.next;

//         while(odd.next != null && odd.next.next != null){
//             even = odd.next;
//             odd.next = even.next;
//             prevEven.next = even;
//             even.next = null;
//             odd = odd.next;
//             prevEven = even;
//         }

//         if(odd.next != null){
//             prevEven.next = odd.next;
//         }

//         odd.next = dummyHead.next;
//         return head;
//     }
// }
--------------------------

203. Remove Linked List Elements
/*
input: ListNode head, int val
output: ListNode node, remove all nodes with val
corner cases: null or empty
solution:

 dummyHead     1  2  2  4  2  val = 2
               |        |
                             prev   cur

case 1: cur.val != val prev = cur, cur = cur.next
case 2: while(cur.val == val) cur = cur.next
*/

class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if(head == null) return head;

        ListNode dummyHead = new ListNode(0);
        ListNode prev = dummyHead;
        dummyHead.next = head;
        ListNode cur = head;
        while(cur != null){
           if(cur.val == val){
               prev.next = cur.next;
           } else {
               prev = cur;
           }
           cur = cur.next;
        }
        return dummyHead.next;
    }
}
---------------------------------------------

430. Flatten a Multilevel Doubly Linked List








/*
input: DLL head, next, previous, child
output: DLL head, single level
e.g. 1 - 2 - 3 - null
         |
         4 - 5-null
             |
             6-null
   1 2 4 5 6 3
traverse the linked list
stack.offer(head);
dummyHead.next = head;
prev = dummyHead;
at each node:
    cur = stack.pollFirst();
    if has next, stack.offer(cur.next); cur.next = null
    if has child, stack.offerFirst(cur.child); cur.child = null
    prev.next = cur;
    prev = cur;
*/

class Solution{
    public Node flatten(Node head){
        if(head == null) return head;
        Node prev = new Node();
        Node cur = head;
        prev.next = head;
        Deque<Node> stack = new ArrayDeque<>();
        stack.offerFirst(head);

        while(!stack.isEmpty()){
            cur = stack.pollFirst();
            if(cur.next != null){
                stack.offerFirst(cur.next);
                cur.next = null;
            }
            if(cur.child != null){
                stack.offerFirst(cur.child);
                cur.child = null;
            }
            prev.next = cur;
            cur.prev = prev;
            prev = cur;
        }

        head.prev = null;

        return head;
    }
}
