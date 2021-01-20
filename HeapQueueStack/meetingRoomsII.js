//Priority queues / heap
//Time Complexity: O(N\log N)O(NlogN)
//Space Complexity: O(N)O(N)

function minMeetingRooms(intervals) {
  // Check for the base case. If there are no intervals, return 0
  if (intervals.length === 0) {
    return 0;
  }

  // Min heap
  const allocator = [];

  // Sort the intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);
  console.log(intervals);

  // Add the first meeting
  allocator.push(intervals[0][1]);

  // Iterate over remaining intervals
  for (let i = 1; i < intervals.length; i++) {
    // If the room due to free up the earliest is free, assign that room to this meeting.
    if (intervals[i][0] >= allocator[0]) {
      allocator.shift();
    }

    // If a new room is to be assigned, then also we add to the heap,
    // If an old room is allocated, then also we have to add to the heap with updated end time.
    allocator.push(intervals[i][1]);
    allocator.sort((a, b) => a - b);
  }

  // The size of the heap tells us the minimum rooms required for all the meetings.
  return allocator.length;
}

//alternate priority queus / heap
var minMeetingRooms = function (intervals) {
  if (!intervals.length) return 0;
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  let minHeap = [];
  for (let i = 0; i < intervals.length; i++) {
    let [start, end] = intervals[i];
    if (!minHeap.length) minHeap.push(end);
    else {
      let earliestAvailableTime = minHeap[0];
      if (start < earliestAvailableTime) {
        minHeap.push(end);
        minHeap.sort((a, b) => (a > b ? 1 : -1));
      } else {
        minHeap[0] = end;
        minHeap.sort((a, b) => (a > b ? 1 : -1));
      }
    }
  }
  return minHeap.length;
};

//chronological ordering
function minMeetingRooms(intervals) {
  if (intervals.length === 0) {
    return 0;
  }

  const startTimes = [];
  const endTimes = [];

  for (let i = 0; i < intervals.length; i++) {
    startTimes.push(intervals[i][0]);
    endTimes.push(intervals[i][1]);
  }

  if (startTimes.length > 1) {
    startTimes.sort((a, b) => a - b);
    endTimes.sort((a, b) => a - b);
  }

  let s = 0;
  let e = 0;
  let rooms = 0;

  while (s < startTimes.length) {
    if (startTimes[s] < endTimes[e]) {
      rooms++;
    } else {
      e++;
    }
    s++;
  }
  return rooms;
}
