/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 */

/*

    variables:
        minSum

    possible sum & loop
     (DFS problem)

    outerloop: i (ratio)
        innerloop: j (starts at i+1)(worker)
            call dfs on worker index (workerIndex, ratio, workersNeededleft, sum)

            DFS:
                basecase: workersNeededLeft === 0: minSum = Math.min(minSum, sum)

                recursivecase: loop through workers starting from working index
                    if workerIndex's quality * ratio is more or eqal to their wage
                        DFS(workerIndex + 1, ratio, workersNeededleft-1, sum+ quality*ratio)



    quality = [3,1,10,10,1],
    wage =    [4,8, 2, 2,7],
    k = 3

*/

var mincostToHireWorkers = function(quality, wage, k) {

  /*

  [10,20,5]
  [70,50,30]
  [7, 2.5, 6]


  DFS: 0, 0, 0, 210

  i=1



  DFS: 0, 0, 0, 105

  i=2


  2
  */

  let minSum = Infinity
  const ratios = new Array(quality.length) //creating for readability

  //create ratios array
  for(let i = 0; i < ratios.length; i ++) {
      ratios[i] = wage[i] / quality[i]
  }

  const DFS = function(starter, worker, numWorkersNeeded, sum) {

      //basecase
      if(worker === quality.length && numWorkersNeeded > 0) {
          return;
      }
      //base case
      if(numWorkersNeeded === 0) {
          console.log('minsum', minSum)
          minSum = Math.min(sum, minSum)
      }

      //recursive case
      for(let i = worker; i < quality.length; i ++) {
          //check to make sure we arent comparing current worker to themself
          //(starter has already been added)
          //check to make sure current ratio meets workers minimum wage
          if(i !== starter && (ratios[starter] * quality[i]) >= wage[i]) {
              console.log('new sum being added', ratios[i] * quality[i])
              //if so, we increment i to next worker, decrement num workers, add $ to sum
              DFS(starter, i + 1, numWorkersNeeded-1, sum + (ratios[i] * quality[i]))
          }
      }
  }
  //*issue: this is not backwards compatible

  //loop through each worker ratio as a starting point for DFS
  for(let i = 0; i < ratios.length; i ++) { //starting ratio
      //we need to pick each ratio and always start DFS from the beginning of workers
      //so the we consider every worker with it
      console.log('i', i, 'inside new DFS: wage being added:', wage[i])
      DFS(i, 0, k-1, wage[i])
  }

  return minSum
};



/*

check the ratio:
wage divided by quality (ratio)
* by other's quality
everyone has to have at least their min wage
so basically everyone is getting paid the same amount for their quality per unit

we need k workers and to show the min cost

brute force:
create a new array n length
find everyones ratio
find every possible combination

quality = [10,20,5 ],
  wage = [70,50,30],
  k = 2

  7, 2.5, 6

  interesting thing is their ratio doesnt signify being cheaper because they could have a high ratio and a small min wage

  sorting isnt an option because we need to maintain their order (there could be duplicates accross arrays)


  ratios
  if a ratio is bigger than another ratio, they will fit under that ratio, then we just need to find the smallest wages out of what fits under the largest ratio

  or we could get their ratios & wages [ratio, wage] and sort them


  this problem is like happy friends

  quality = [3,1,10,10,1],
  wage =    [4,8, 2, 2,7],
  k = 3

  ratios    [1.3,8,.2,.2,7]

  variables:
      minSum

  possible sum & loop
   (DFS problem)

  outerloop: i (ratio)
      innerloop: j (starts at i+1)(worker)
          call dfs on worker index (workerIndex, ratio, workersNeededleft, sum)

          DFS:
              basecase: workersNeededLeft === 0: minSum = Math.min(minSum, sum)

              recursivecase: loop through workers starting from working index
                  if workerIndex's quality * ratio is more or eqal to their wage
                      DFS(workerIndex + 1, ratio, workersNeededleft-1, sum+ quality*ratio)



*/
