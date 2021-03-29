/**
 * @param {string[]} sentences
 * @param {number[]} times
 */

const TrieNode = function (char) {
  this.char = char;
  this.children = new Map();
  this.freq = null;
};

var AutocompleteSystem = function (sentences, times) {
  this.root = new TrieNode("");
  this.curr = this.root;

  sentences.forEach((sentence, i) => {
    for (let i = 0; i < sentence.length; i++) {
      const char = sentence[i];
      if (!this.curr.children.has(char)) {
        this.curr.children.set(char, new TrieNode(char));
      }
      this.curr = this.curr.children.get(char);
    }
    //add the freq
    this.curr.freq = times[i];
    //set curr back to root
    this.curr = this.root;
  });
};

/**
 * @param {character} c
 * @return {string[]}
 */
AutocompleteSystem.prototype.input = function (c) {
  const hotSentences = [];

  for (let i = 0; i < c.length; i++) {
    const char = c[i];
    if (this.curr.children.has(char)) {
      this.curr = this.curr.children.get(char);
    } else {
      return hotSentences;
    }
  }

  this.curr.children.forEach((child) => {
    hotSentences.push(...this.DFS(child, c));
  });

  this.curr = this.root;
  //we could improve sort by building a size 3 priority queue with freq then alpha

  hotSentences.sort((a, b) => {
    if (a.freq > b.freq) {
      return -1;
    } else if (b.freq > a.freq) {
      return 1;
    } else {
      if (a.sentence < b.sentence) {
        return -1;
      } else if (b.sentence < a.sentence) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  return hotSentences.map((obj) => obj.sentence).slice(0, 3);
};

AutocompleteSystem.prototype.DFS = function (node, sentence) {
  //basecase
  if (node.freq !== null) {
    return [{ sentence: sentence, freq: node.freq }];
  }

  //recursive case
  sentence += node.char;

  const sentences = [];

  for (let child of node.children) {
    sentences.push(...this.DFS(child, sentence));
  }

  return sentences;
};

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */

/*

approach: weighted trie
  trie:
      node:
          val: char
              * when we are adding sentences, we add chars to valhash to track / increment their freq
              * then we add them by freq to the freq hash(take from old freq add to new freq)
          childValHash: char: freq (we can check it the next char exists)
              * having one prefix char, we can head towards the top frequencies in 0(1)
          childFreqHash: freq: {chars/nodes}
              * once we have our whole sentences, we can sort them by alpha, this is better than alpha min heap for freq hash because we are going to be looking up and deleting / moving a lot of chars by freq, so its better to find them in 0(1)

              * we could improve by putting max Freq in a heap
*/
