/**
 * @param {string[]} words
 * @return {string[]}
 */
 var stringMatching = function(words) {
  const substrings = new Set()

  for(let i = 0; i < words.length; i ++){
      for(let j = i+1; j < words.length; j ++) {
          if(words[i].includes(words[j])){
              substrings.add(words[j])
          }
          if(words[j].includes(words[i])){
              substrings.add(words[i])
          }
      }
  }

  return Array.from(substrings);
};

//time: 0(n^2)
//space: 0(n)
