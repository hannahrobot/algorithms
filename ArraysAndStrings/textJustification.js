/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  const res = [];

  while (words.length) {
    let lengthCount = 0;
    const lineWords = [];

    while (
      words.length &&
      lengthCount + words[0].length + lineWords.length < maxWidth
    ) {
      lineWords.push(words.unshift());
      lengthCount += lineWords[lineWords.length - 1];
    }

    if (lineWords.length === 1) {
      let curr = lineWords.shift();
      let spacesNeeded = maxWidth - curr.length;
      while (spacesNeeded) {
        curr += " ";
        spacesNeeded--;
      }

      res.push(curr);
    } else if (words.length) {
      let spacesNeeded = maxWidth - lengthCount;
      const wordsAddingSpaces = lineWords.length - 2;
      let rem = "";
      let spaces = 0;

      if ((spacesNeeded % wordsAddingSpaces) % 2 !== 0) {
        rem = " ";
        spacesNeeded--;
      }

      spaces = spacesNeeded / wordsAddingSpaces;

      const firstWord = lineWords.shift();
      const lineStr = firstWord + rem;

      while (lineWords.length) {
        let curr = lineWords.shift();
        let countSpaces = spaces;
        while (countSpaces) {
          curr = " " + curr;
          countSpaces--;
        }
        lineStr += curr;
      }

      res.push(lineStr);
    } else {
      const firstWord = lineWords.shift();
      const lineStr = firstWord;
      while (lineWords.length) {
        let curr = lineWords.shift();
        curr = " " + curr;
        lineStr += curr;
      }

      while (lineStr.length < maxWidth) {
        lineStr += " ";
      }

      res.push(lineStr);
    }
  }

  return res;
};

/*NOTES

input: words: array of strings
output: array of sentences with maxWidth

questions:
  * will there ever be a word in word thats longer than max width

* each word has to have a space between it and other words
* other than that we pack as many words as possible (sum of word lengths + words-1 spaces)
* if theres one word in a line is goes on the left and the space comes after it
* outer words go without spaces, inner words have spaces divided evenly, if odd spaces: left gets more

* last line of test is left justifed, no extra space between words, all extra space on right


approach:

while words has length:

  length count = 0
  const lineWords = []
                                      includes the spaces we need
  while(lengt count + words[0].length + (lineWords.length) < maxWidth)
      linewords.push(words.unshift())
      count += linewords[linewords.length-1]

  if(word.length){
      count

      const spacesneeded = maxWidth - count

      const dividespacesby = count - 2

      if its odd - take one off and add it to first
      if its even its all good

      const first word = linewords.shift()

      //add spaces to font of words leftover
      new arr = [firstword] (if odd division, first word + 1 space)

      while(linewords.length){
          const curr = linwords.shift()
          let countSpaces = spaces
          while(countspaces){
              curr = ' ' + curr
              countspaces --
          }
          arr.push(curr)
      }

  } else if(!words.length){
      left justification
      add first word
      then all next words have one space before

      add spaces to the end of the array until it reaches max width
  }



** how do we implement changing the last string

*/
