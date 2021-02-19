const UNVISITED = 0;
const VISITING = 1;
const VISITED = 2;

class Node {
  constructor(course) {
    this.course = course;
    this.state = UNVISITED;
    this.preReqFor = [];
  }
}

const topologicalSortDFS = (node) => {
  node.state = VISITING;

  for (var i = 0; i <= node.preReqFor.length - 1; i++) {
    let child = node.preReqFor[i];

    if (child.state === VISITING) {
      return false;
    } // cannot be topologically sorted
    if (child.state === UNVISITED && !topologicalSortDFS(child)) return false;
  }

  node.state = VISITED;
  return true;
};

var canFinish = function (numCourses, prerequisites) {
  const hash = {}; // holds new nodes

  for (const [course, prereq] of prerequisites) {
    if (!(prereq in hash)) {
      let newNode = new Node(prereq);
      hash[prereq] = newNode;
    }

    if (!(course in hash)) {
      let newNode = new Node(course);
      hash[course] = newNode;
    }

    hash[prereq].preReqFor.push(hash[course]);
  }

  for (var i = 0; i <= numCourses - 1; i++) {
    let node = hash[i];

    if (
      node !== undefined &&
      node.state === UNVISITED &&
      !topologicalSortDFS(node)
    )
      return false;
  }

  return true;
};

//----------------------------------------inefficient DFS backtracking solution

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const hash = {};
  const visited = {};

  for (let i = 0; i < prerequisites.length; i++) {
    visited[prerequisites[i][0]] = false;

    if (hash.hasOwnProperty(prerequisites[i][0])) {
      hash[prerequisites[i][0]].push(prerequisites[i][1]);
    } else {
      hash[prerequisites[i][0]] = [prerequisites[i][1]];
    }
  }

  const DFS = function (i, seen) {
    if (!hash.hasOwnProperty(i)) {
      return true;
    }

    if (seen[i]) {
      return false;
    }

    seen[i] = true;

    const preReqs = hash[i];

    for (let j = 0; j < preReqs.length; j++) {
      return DFS(preReqs[j], Object.assign({}, seen));
    }
  };

  for (let key in hash) {
    const seen = Object.assign({}, visited);
    if (!DFS(key, seen)) {
      return false;
    }
  }

  return true;
};

//individual hash tables

/*
input: numCourses: number of courses you must take
      prerequisites: index 0: course, index 1: prerequisite

output: true or false (if you can take the numCourses or not)
edge cases: prerequisites is shorter than numcourses: return false; prerequisites is empty: return false, numCourses is 0: return true

ex:

numCourses 2
preReq: [3, 1],[2, 4],[1, 4],[4, 2]
output: false

approach:
  this question essentially asks if we have a cycle, if we can count enough courses before we hit a cycle

  hash: seen

  outer loop i
      call dfs(i, count)

      dfs
          basecase: we cycled, break
                  we got the count

          add count
          mark visited

          j loop
              dfs


*/
