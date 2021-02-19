//time: o(nlogn)
//space: 0(1)

/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] > intervals[i + 1][0]) {
      return false;
    }
  }
  return true;
};

//input: array of intervals (nestest [x, y])
//output: true or false
//that person attend all meetings
//edge cases: intervals is empty, theres on meeting,
//questions: are the meetings sorted by time? no; are the meetings in military time? yes

//ex [[1,3], [2, 4], [7, 10]]
//false: meeting one overlaps with meeting 2

//ex [[1,2][2,4][5,7]]
//true

//if start or end time is between another meeting : false
//otherwise true

//brute would be a nested loop to check if start and end fall between any of the intervals

//optimizeD: sort meetings by start time
//check if end time conflicts w next start time
