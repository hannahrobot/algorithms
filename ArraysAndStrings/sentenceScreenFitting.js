/**
 * @param {string[]} sentence
 * @param {number} rows
 * @param {number} cols
 * @return {number}
 */
var wordsTyping = function (sentence, rows, cols) {
  const wordLens = sentence.map((word) => word.length);
  const maxLen = Math.max(...wordLens);
  if (cols < maxLen) return 0;

  const memo = new Map();
  let currIdx = 0;
  let numOfSentences = 0;

  while (rows--) {
    if (!memo.has(currIdx)) memo.set(currIdx, getNext(currIdx));
    const [next, count] = memo.get(currIdx);
    currIdx = next;
    numOfSentences += count;
  }
  return numOfSentences;

  function getNext(i) {
    let left = cols;
    let fitCount = 0;

    while (true) {
      while (i < wordLens.length) {
        if (left < wordLens[i]) return [i, fitCount];
        left -= wordLens[i] + 1;
        i++;
      }
      i = 0;
      fitCount++;
    }
  }
};
