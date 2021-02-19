//brute force
//time: 0(n)
//space: 0(n)

var MyCalendarTwo = function () {
  this.calendar = [];
  this.overlaps = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function (start, end) {
  if (!this.calendar.length) {
    this.calendar.push([start, end]);
    return true;
  }
  //check overlaps to see if it triple overlaps, if it does, end operation
  if (this.overlaps.length) {
    for (let i = 0; i < this.overlaps.length; i++) {
      if (start < this.overlaps[i][1] && end > this.overlaps[i][0]) {
        return false;
      }
    }
  }

  //check calendar for overlaps before adding new booking, if theres an overlap, add it to overlaps
  for (let i = 0; i < this.calendar.length; i++) {
    if (start < this.calendar[i][1] && end > this.calendar[i][0]) {
      const startOverlap =
        start < this.calendar[i][0] ? this.calendar[i][0] : start;
      const endOverlap = end > this.calendar[i][1] ? this.calendar[i][1] : end;
      this.overlaps.push([startOverlap, endOverlap]);
    }
  }
  //add new booking to calendar and return true
  this.calendar.push([start, end]);
  return true;
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */
