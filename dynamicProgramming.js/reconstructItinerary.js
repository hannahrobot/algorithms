/*

Greedy strategy + post order traversal

build a map to store each departure location and its destinations array.
sort the destinations array.
now we assume that the departure airport 'JFK' is the root node for this tree, and its destinations are the children. Since the destinations are sorted, the children are arranged alfabetically from left to right. For each destination, if it is also a departure airport, then its children are the related destinations. Hopefully by now you get an idea of the structure of the tree.
run a post order traversal of the tree , as a result, 'JFK' now is the last airport visited, hence the Greedy part.
*we could push nodes to the res and reverse them, but to speed up this process, we shift them so that they go on the res in order

*/

//time: (e log e/v)
//space: 0(airports + flights)

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  const map = {};
  const res = [];
  //create hashmap for departures(keys) and that destinations(array of vals)
  for (let i = 0; i < tickets.length; i++) {
    const dep = tickets[i][0];
    const des = tickets[i][1];
    if (map[dep]) {
      map[dep].push(des);
    } else {
      map[dep] = [des];
    }
  }
  //sort destinations in lexical order
  for (let dep in map) {
    map[dep].sort();
  }

  const dfs = function (node) {
    const des = map[node];
    while (des && des.length > 0) {
      dfs(des.shift());
    }
    res.unshift(node);
  };

  dfs("JFK");
  return res;
};
