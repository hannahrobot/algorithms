//simple approach - tree traversal, or if you are ok with adding a node to the queue multiple times in a graph with cycle

/**
 * Return the length of the shortest path between root and target node.
 */
function BFS(root, target) {
  const queue = []; // store all nodes which are waiting to be processed
  let step = 0; // number of steps neeeded from root to current node
  // initialize
  queue.push(root);
  // BFS
  while (queue.length) {
    step++;
    // iterate the nodes which are already in the queue
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let cur = queue[0];
      if (cur === target) {
        return step;
      }

      if (cur.left !== null) {
        queue.push(cur.left);
      }
      if (cur.right !== null) {
        queue.push(cur.right);
      }
      queue.shift();
    }
  }
  return -1; // there is no path from root to target
}


//approach in case its a graph with cycle, we need to create a hashmap that tracks visited nodes

/**
 * Return the length of the shortest path between root and target node.
 */
int BFS(Node root, Node target) {
  Queue<Node> queue;  // store all nodes which are waiting to be processed
  Set<Node> visited;  // store all the nodes that we've visited
  int step = 0;       // number of steps neeeded from root to current node
  // initialize
  add root to queue;
  add root to visited;
  // BFS
  while (queue is not empty) {
      step = step + 1;
      // iterate the nodes which are already in the queue
      int size = queue.size();
      for (int i = 0; i < size; ++i) {
          Node cur = the first node in queue;
          return step if cur is target;
          for (Node next : the neighbors of cur) {
              if (next is not in used) {
                  add next to queue;
                  add next to visited;
              }
          }
          remove the first node from queue;
      }
  }
  return -1;          // there is no path from root to target
}
