//to improve space: create an algorithm that encodes and decodes based on content: less secure, takes more time complexity

//---------------------------------------
//time: 0(1)
//space: 0(n)
//encoding range is limited by 6 spaces
//chance we would get the same code collision in hash, in this case generate a new random code

/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */

const hash = {};

var encode = function (longUrl) {
  let str = "";

  while (str.length < 6) {
    let rdm = Math.floor(Math.random() * 25);
    str += String.fromCharCode(rdm + 65);
    rdm = Math.floor(Math.random() * 9);
    str += rdm.toString();
  }

  hash[str] = longUrl;

  return longUrl.replace(/(?<=\.com|\.net|\.org|\.edu|\.)\S+$/, str);
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function (shortUrl) {
  let match = shortUrl.match(/(?<=\.com|\.net|\.org|\.edu|\.)\S+$/)[0];

  return hash[match];
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */

//created a function that encodes, saves codes in hash

//use regex to get the last part of the string after .com/
//

//save code as key with orig url as value

//hash

//encoding algorithm:
//choose random 6 letters/numbers mix
//choose random alph between 65-90
//choose random num 1-9
