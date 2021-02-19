/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [[]];

  for (let i = 0; i < nums.length; i++) {
    let sequenceArr = [nums[i]];
    res.push(sequenceArr);
    for (let j = i + 1; j < nums.length; j++) {
      const copy = sequenceArr.slice();
      copy.push(nums[j]);
      res.push(copy);
      sequenceArr = copy;
      if (j > i + 1) {
        const nonSeqArr = [nums[i], nums[j]];
        res.push(nonSeqArr);
      }
    }
  }

  return res;
};

//input: nums: arr of unique elements
//output: array of all posible subsets
//edge cases: nums is empty, return empty array; nums is length 1, return array,

//ex:

//[1, 2, 3, 4, 5]

//[[],[1], [1, 2], [1, 2, 3], [1, 3] [1, 2, 3, 4], [1, 4], [1, 2, 3, 4, 5], [1, 5], [2], [2, 3], [2, 3, 4], [2, 4]]

//approach: brute force
//outerloop i
//subset array
//push i el to subset array
//push subset to res
//innerloop: j = i+1
//add j element to subset array
//push subset to res
//if(j is bigger than i+1)
//detatched subset arr = i,j
//push detatched subset arr to res

//return res

//time: 0(n^2)
//space 0(n^2)

//--------------------------

//approach: optimized
//pointers

//start=0
//end=1

//push start
//push end
//push start,end
//push start -> end
//end ++
