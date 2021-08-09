var MyCalendar = function () {
  this.calendar = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  let canBook = true;
  this.calendar.forEach((booking) => {
    const [start2, end2] = booking;
    //if start overlaps inbetween, if end overlaps inbetween, if it surrounds, or if its inbetween
    if (
      (start < end2 && start > start2) ||
      (end < end2 && end > start2) ||
      (start2 <= start && end2 >= end) ||
      (start2 >= start && end2 <= end)
    ) {
      canBook = false;
    }
  });

  if (canBook) {
    this.calendar.push([start, end]);
    return true;
  } else {
    return false;
  }
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

/*



*/

// creating a BST to track the bookings that are possible
// Tree node will comprise of start, end values and left and right pointer
class TreeNode {
  constructor(start, end, left = null, right = null) {
    this.start = start;
    this.end = end;
    this.left = left;
    this.right = right;
  }
}

// initially the Calendar is empty
// `bookings` will be the root node of the BST
var MyCalendar = function () {
  this.bookings = null;
};

MyCalendar.prototype.book = function (start, end) {
  const node = new TreeNode(start, end);

  // if calendar is empty, simply add the node as root and return true
  // else check if it is possible to add the booking while checking that it does not overlap
  if (!this.bookings) {
    this.bookings = node;
    return true;
  }
  return this.bookings.addBooking(node);
};

TreeNode.prototype.addBooking = function (node) {
  if (node.start >= this.end) {
    if (!this.right) {
      this.right = node;
      return true;
    }
    return this.right.addBooking(node);
  } else if (node.end <= this.start) {
    if (!this.left) {
      this.left = node;
      return true;
    }
    return this.left.addBooking(node);
  }
  // booking overlaps
  return false;
};
