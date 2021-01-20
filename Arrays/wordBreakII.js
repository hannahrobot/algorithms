/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  let memo = {};

  function dp(str) {
    if (str == "") return [""];

    if (memo[str]) {
      return memo[str];
    }

    let res = [];

    wordDict.forEach((word) => {
      if (str.startsWith(word)) {
        let output = dp(str.slice(word.length));
        for (let x of output) {
          res.push(word + (x.length ? " " : "") + x);
        }
      }
    });
    memo[str] = res;
    return res;
  }

  return dp(s);
};

//     function breakword(s, output, wordDict){
//         console.log('output', output)
//         console.log('s', s)
//         console.log('dict', wordDict)
//         if(!s.length){
//             return output
//         } else {
//             wordDict.forEach((word, i) => {
//                 const length = word.length
//                 tempString = s.slice(0,length)
//                 if (tempString = word){
//                    breakword(s.slice(length), output + ' ' + word, wordDict.slice(i+1))
//                 }
//             })
//         }
//     }
