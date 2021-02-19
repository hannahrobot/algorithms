/*
Diff Between Two Strings
Given two strings of uppercase letters source and target, list (in string form) a sequence of edits to convert from source to target that uses the least edits possible.

For example, with strings source = "ABCDEFG", and target = "ABDFFGH" we might return: ["A", "B", "-C", "D", "-E", "F", "+F", "G", "+H"]

More formally, for each character C in source, we will either write the token C, which does not count as an edit; or write the token -C, which counts as an edit.

Additionally, between any token that we write, we may write +D where D is any letter, which counts as an edit.

At the end, when reading the tokens from left to right, and not including tokens prefixed with a minus-sign, the letters should spell out target (when ignoring plus-signs.)

In the example, the answer of A B -C D -E F +F G +H has total number of edits 4 (the minimum possible), and ignoring subtraction-tokens, spells out A, B, D, F, +F, G, +H which represents the string target.

If there are multiple answers, use the answer that favors removing from the source first.

Constraints:

[time limit] 5000ms
[input] string source
2 ≤ source.length ≤ 12
[input] string target
2 ≤ target.length ≤ 12
[output] array.string
*/

//"ABCDEFG"
//"ABDFFGH"

//'EFEFEEF'
//'FFEFEEF'

//'TTLTTL'
//'TTLTTL'

//"AABACC"
//"BABCAC"

//"AABACC"
//"BABCAC"

//['']

//"BC"
//"CABAABBC"

//APPROACH
//dynamic programming

//recursively called the source and target
//take first index off and call the next slice
//changing a letter or not changing it:
//if its a letter I need to change - change it, recursively call the tring at the following index
//not making that change, seeing if i can make another change, taking the same index out
//pointers or slice
//push letter as is or change it
//keep track of number of changes
//

//outer func

//min count: infinity
//output string:

//helper func that recurses, it takes the next index as an arg each time, string that its building for each option, counts changes

//base case: basecase is last index
//if count is less than min - update in, update output:
//if they are equal, ill compare the strings to see which one removes first
//for each index
//if els at index is different
//option where i Add , string for output , count +1
//option where i subtract, string for output, count +1

//go recurse to next index normally, string, count
//++

//return final output

/////////////

function strings(source, target) {
  let min = Infinity;
  let output = [];

  function helper(sourceD, targetD, outArr, count) {
    //basecase
    if (!sourceD.length || !targetD.length) {
      if (count < min) {
        console.log("count", count);
        console.log("outArr", outArr);
        output = outArr;
        min = count;
        //compare if they are equal and update
      }
      // else if(count === min) {
      //   for (let i = 0; i < outArr; i ++) {
      //     if(outArr[i][0] === '-'){

      //     }
      //   }
      // }
    }
    //if the basecase isnt hit
    if (sourceD[0] === targetD[0]) {
      outArr.push(sourceD[0]);
      helper(sourceD.slice(1), targetD.slice(1), outArr, count);
    } else {
      //add target[0] source in that index
      let temp = sourceD.slice();
      sourceD = targetD[0] + sourceD;
      outArr.push(`+${targetD[0]}`);
      helper(sourceD.slice(1), targetD.slice(1), outArr, count + 1);
      //subtract the first index of sourceD, then recurse
      outArr.push(`-${temp[0]}`);
      temp = temp.slice(1);
      helper(temp, targetD, outArr, count + 1);
    }
  }

  helper(source, target, [], 0);

  console.log("min", min);
  return output;
}

console.log(strings("ABCDEFG", "ABDFFGH"));
