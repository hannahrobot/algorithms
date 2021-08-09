//two pass

/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
  let bulls = 0;
  let cows = 0;
  const hash = {};

  for (let i = 0; i < secret.length; i++) {
    const char = secret[i];
    if (!hash.hasOwnProperty(char)) {
      hash[char] = 0;
    }
    hash[char]++;
  }

  for (let i = 0; i < guess.length; i++) {
    const char = guess[i];
    if (hash.hasOwnProperty(char)) {
      if (guess[i] === secret[i]) {
        bulls++;
        hash[char]--;
      }
    }
  }

  for (let i = 0; i < guess.length; i++) {
    const char = guess[i];
    if (hash.hasOwnProperty(char)) {
      if (guess[i] !== secret[i] && hash[char] > 0) {
        cows++;
        hash[char]--;
      }
    }
  }

  return bulls.toString() + "A" + cows.toString() + "B";
};

/*
iterate through secret and hash chars: indexes, count

iterate through guess,

  check if it exists in hash,

      and if indexSet has guess index, if yes, increment bulls and remove chars index,
      if no: increment cows & decrement count


return bulls.toString() + 'A' + cows.toString() + 'B'


*/

//one pass
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function (secret, guess) {
  let bulls = 0;
  let cows = 0;
  const hash = {};

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      bulls++;
    } else {
      if (!hash.hasOwnProperty(secret[i])) {
        hash[secret[i]] = 0;
      }
      if (!hash.hasOwnProperty(guess[i])) {
        hash[guess[i]] = 0;
      }

      if (hash[secret[i]] < 0) {
        cows++;
      }

      if (hash[guess[i]] > 0) {
        cows++;
      }

      hash[secret[i]]++;
      hash[guess[i]]--;
    }
  }

  return bulls.toString() + "A" + cows.toString() + "B";
};

/*
iterate through secret and hash chars: indexes, count

iterate through guess,

  check if it exists in hash,

      and if indexSet has guess index, if yes, increment bulls and remove chars index,
      if no: increment cows & decrement count


return bulls.toString() + 'A' + cows.toString() + 'B'


*/
