/*
Given the Welsh Alphabet, which is slightly different than the English one, design a function that sorts a list of words by that alphabet:
"a b c ch d dd e f ff g ng h i j l ll m n o p ph r rh s t th u w y"
Note: "double" letters supersede single letters so "ng" would be considered in its current order and not as an "n g".
*/

//iterate through, check singles and see if its a double letter by checking next index, if its a double letter splice it off and add it to array and then i++(to increment i two positions), otherwise add the single letter and increment normally

//keep a hash that maintains the order of welsh alphabet

//sort the array based on welsh hash values, associating the key with the element in the array
