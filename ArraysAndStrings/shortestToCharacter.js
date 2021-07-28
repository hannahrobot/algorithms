/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
 var shortestToChar = function(s, c) {

  const counts = new Array(s.length).fill(-Infinity)
  let prev = -Infinity

  //go foreward
  for(let i = 0; i < s.length; i ++) {
      if(s[i] === c){
          prev = i
      }
      counts[i] = i - prev

  }

  prev = Infinity

  //go backwards
  for(let i = s.length-1; i >= 0; i --) {
      if(s[i] === c){
          prev = i
      }
      counts[i] = Math.min(prev - i, counts[i])
  }

  return counts


};

/*

time: 0(n)
space: 0(n)




*/
