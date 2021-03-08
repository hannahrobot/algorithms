/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) {
    return [];
  }

  /**
   * Create an adjacency list and run bfs to create a map for
   * verteices with transformation distances.
   * ex: transformation distance for hit -> dot is 2.
   * (two letters transformation)
   *
   *               hit
   *                |
   *               hot
   *              /   \
   *           dot --- lot
   *            |       |
   *           dog --- log
   *             \     /
   *               cog
   */
  const adjacencyList = createAdjacencyList([beginWord, ...wordList]);
  const distances = bfs(beginWord, endWord, adjacencyList);
  /**
   * Use dfs to backtrack all possible paths begin with beginWord. Add
   * all shortest paths to sequences.
   */
  const sequences = [];
  const dfs = (currWord, endWord, path) => {
    if (currWord === endWord) {
      sequences.push([...path]);
      return;
    }

    const neighbors = adjacencyList.get(currWord);

    neighbors.forEach((neighbor) => {
      if (
        distances.has(neighbor) &&
        distances.get(neighbor) === distances.get(currWord) + 1
      ) {
        path.push(neighbor);
        dfs(neighbor, endWord, path);
        path.pop();
      }
    });
  };
  dfs(beginWord, endWord, [beginWord]);

  return sequences;
};

function createAdjacencyList(words) {
  const adjacencyList = new Map();

  words.forEach((word) => {
    let adjacentWords = [];
    for (let i = 0; i < word.length; i++) {
      const regex = new RegExp(
        `${word.substring(0, i)}\\w${word.substring(i + 1)}`
      );
      const neighbors = words.filter((w) => w !== word && regex.test(w));
      adjacentWords = [...adjacentWords, ...neighbors];
    }
    adjacencyList.set(word, adjacentWords);
  });

  return adjacencyList;
}

function bfs(beginWord, endWord, adjacencyList) {
  const distances = new Map();
  const queue = [beginWord];
  let level = 0;

  distances.set(beginWord, level);

  while (queue.length !== 0) {
    let size = queue.length;

    while (size > 0) {
      const word = queue.shift();

      if (word === endWord) {
        return distances;
      }

      const neighbors = adjacencyList.get(word);

      neighbors.forEach((neighbor) => {
        if (!distances.has(neighbor)) {
          distances.set(neighbor, level + 1);
          queue.push(neighbor);
        }
      });
      size -= 1;
    }
    level += 1;
  }
}
