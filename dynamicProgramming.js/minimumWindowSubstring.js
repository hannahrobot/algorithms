//sliding window solution for counting unique chars in t

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {

  if(s.length === 0 || t.length === 0) {
      return ''
  }

  const dictT = new Map()
  for(let i = 0; i < t.length; i ++) {
      dictT.set(t[i], dictT.has(t[i]) ? dictT.get(t[i]) + 1 : 1)
  }

  let required = dictT.size

  let l = 0
  let r = 0

  let formed = 0

  const windowCounts = new Map()

  let ans = [-1, 0, 0]

  while(r < s.length) {
      let c = s[r]
      windowCounts.set(c, windowCounts.has(c) ? windowCounts.get(c) + 1 : 1)
      if(dictT.has(c) && windowCounts.get(c) === dictT.get(c)){
          formed ++
      }
      while(l <= r && formed === required){
          c = s[l]
          if(ans[0] === -1 || r - l + 1 < ans[0]) {
              ans[0] = r - l + 1
              ans[1] = l
              ans[2] = r
          }
          windowCounts.set(c, windowCounts.get(c) - 1)
          if(dictT.has(c) && windowCounts.get(c) < dictT.get(c)){
              formed --
          }
          l++
      }
      r++
  }

  return ans[0] === -1 ? '' : s.substring(ans[1], ans[2] + 1)

};

//hashtable
//counter

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */


//sliding window & heap solution for requiring the count of duplicates in t
//Minheap class

var minWindow = function (s, t) {

  const hash = new Array(26).fill(0);
  let minWindow = s

  for (let i = 0; i < t.length; i++) {
    hash[t.charCodeAt(i)]++;
  }

  const indexHash = new Array(26).fill(false);

  let start = 0;
  let count = 0

  for (let end = 0; end < s.length; end++) {
      //if character exists in t
    if (hash[s.charCodeAt(end)] > 0) {
        //if we havent collected enough of the chars yet
      if (!indexHash[s.charCodeAt(end)] || indexHash[s.charCodeAt(end)].size() < hash[s.charCodeAt(end)]) {
         if(!indexHash[s.charCodeAt(end)]){
            indexHash[s.charCodeAt(end)] = new MinHeapCustom()
         }
        indexHash[s.charCodeAt(end)].insert(end);
          count ++
          //if we already have the nums of chars for this char that we need
          //and s is on the earliest index of the char
      } else if (
        indexHash[s.charCodeAt(end)].size() === hash[s.charCodeAt(end)] &&
        indexHash[s.charCodeAt(end)].peak() === start
      ) {
          //take the index out of our heap & start ++
        start++;
          //while length of heap char at start is greater than charcount in hash, start ++, extract min
          while()
      }



    }
    //check if our substring === char hash
    //if yes, udpate min window
    if(count === t.length){
        if((end - start + 1) < minWindow.length) {
            minWindow = s.substring(start, end + 1)
        }
    }
  }
};

//time: 0(s log s) we iterate through each element in s, and for each element we add it in log k to our heap array, a single heap array could become as big as s in the worst case where all of our indexes are the same char and t is the same size as s with all the same chars
//space: 0(s) in the worst case, our heap array's could collectively take on all of the indexes and s and become the size of s, although every other space is 0(1) because we are dealing with the constant size 26 for chars
