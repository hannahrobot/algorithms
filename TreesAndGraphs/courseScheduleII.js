//adjacency list + DFS + check cycles with white grey black

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  let isPossible = true;
  const stack = [];
  const dirGraph = {};
  const color = {};

  prerequisites.forEach((req) => {
    const course = req[0];
    const pre = req[1];

    if (dirGraph.hasOwnProperty(pre)) {
      dirGraph[pre].push(course);
    } else {
      dirGraph[pre] = [course];
    }
  });

  for (let i = 0; i < numCourses; i++) {
    color[i] = "white";
  }

  const DFS = function (curr) {
    //basecase:
    if (!isPossible) {
      return;
    }

    color[curr] = "grey";

    //recursive case:
    if (dirGraph[curr]) {
      dirGraph[curr].forEach((neighbor) => {
        if (color[neighbor] === "white") {
          DFS(neighbor);
        } else if (color[neighbor] === "grey") {
          isPossible = false;
        }
      });
    }

    color[curr] = "black";
    stack.unshift(curr);
  };

  for (let i = 0; i < numCourses; i++) {
    if (color[i] === "white") {
      DFS(i);
    }
  }

  return isPossible ? stack : [];
};

//time: 0(v+e)
//space: 0(v+e)

//node in-degree

const findOrder = (numCourses, prerequisites) => {
  const inDegrees = Array(numCourses).fill(0);
  for (const [v] of prerequisites) {
    inDegrees[v]++;
  }

  const q = [];
  for (let i = 0; i < inDegrees.length; i++) {
    const degree = inDegrees[i];
    if (degree === 0) q.push(i);
  }

  const res = [];
  while (q.length) {
    const u0 = q.shift();
    numCourses--;
    res.push(u0);
    for (const [v, u] of prerequisites) {
      if (u === u0) {
        inDegrees[v]--;
        if (inDegrees[v] === 0) q.push(v);
      }
    }
  }
  return numCourses === 0 ? res : [];
};
