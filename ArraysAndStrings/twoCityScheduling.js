//greedy approach
//time complexity: 0(n log n)
//space complexity: 0(1)

/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function (costs) {
  //sort by first city - second city

  costs.sort((a, b) => a[0] - a[1] - (b[0] - b[1]));

  let total = 0;

  //add first half of people first city to second half of people second city
  //using this for loop cuts iteration in half instead of doing slice and two reduce functions
  for (let i = 0; i < costs.length / 2; i++) {
    total += costs[i][0] + costs[i + costs.length / 2][1];
  }

  return total;
};

//find top lowest ones for each city
//if someone is tied for the lowest for both cities, check the next lowest for each city

//find the minimums
//people have to go to each city
//how many people have to go to each city? half and half. its always two cities

//if we are looking at half, will it always be an even number of people?
