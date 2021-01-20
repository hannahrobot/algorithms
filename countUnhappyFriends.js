

//hashmap


/////
//DFS
/**
 * @param {number} n
 * @param {number[][]} preferences
 * @param {number[][]} pairs
 * @return {number}
 */
const unhappyFriends = function(n, preferences, pairs) {
  let count = 0;

  const DFS = function(three, index, notPrefered){
      if(preferences[three[0]][0] === three){
          count ++;
          return
      }






  }

  for(let i = 0; i < pairs; i++){
      if(preferences[pairs[i][0]][0] !== pairs[i][1]){
          DFS()
      }
      if (preferences[pairs[i][1]][0] !== pairs[i][0]){
          DFS(preferences[pairs[i][1]], )
      }
  }

  return count
};


//iterate over pairs
//if someone in pairs prefers someone else, call DFS


//should i start iterating over pairs or preferences first?
//go over pairs because it will link you straight to the index
//iterate over

//find a unhappy friend:
--who they prefer above their pair
//see if the friends they prefer are also unhappy
--see if their preferences also prefer them over their pairs, if yes, count ++
//DFS, swap j in for i when you call recursively and compare

