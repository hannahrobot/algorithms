/**
 * @param {number[]} target
 * @return {number}
 */
var minNumberOperations = function (target) {
  let totalOperations = target[0];
  let operationsWeCanReuse = target[0];

  for (let i = 1; i < target.length; i++) {
    if (target[i] <= operationsWeCanReuse) {
      operationsWeCanReuse = target[i];
    } else {
      totalOperations += target[i] - operationsWeCanReuse;
      operationsWeCanReuse = target[i];
    }
  }
  return totalOperations;
};
