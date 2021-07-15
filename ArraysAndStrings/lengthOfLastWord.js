/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function(s) {

  if(!s.length){
      return 0
  }

  const arr = s.split(' ')

  for(let i = arr.length-1; i >=0; i --) {
      if(arr[i] !== ''){
          return arr[i].length
      }
  }

  return 0;

};

/*

time: 0(n)
space: 0(n)

*/

/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function(s) {

  if(!s.length){
      return 0
  }

  for(let i = s.length-1; i >=0; i --) {
      if(s[i] !== ' '){
          let j = i
          let count = 0
          while(j >= 0 && s[j] !== ' '){
              count ++
              j --
          }
          return count
      }
  }

  return 0;

};
