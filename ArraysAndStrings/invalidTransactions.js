/**
 * @param {string[]} transactions
 * @return {string[]}
 */
var invalidTransactions = function (transactions) {
  const invalid = [];
  const added = new Array(invalid.length).fill(false);
  const hash = {};

  for (let i = 0; i < transactions.length; i++) {
    const [name, time, amount, city] = transactions[i].split(",");

    //check if its over 1000, if so add it
    if (amount > 1000) {
      invalid.push(transactions[i]);
      added[i] = true;
    }

    //if this name exists in the hash
    if (hash[name]) {
      //check if any other transations collide with this one
      hash[name].forEach((transaction) => {
        const [t, a, c, idx, raw] = transaction;

        if (Math.abs(time - t) <= 60 && c !== city) {
          if (!added[idx]) {
            invalid.push(raw);
            added[idx] = true;
          }

          if (!added[i]) {
            invalid.push(transactions[i]);
            added[i] = true;
          }
        }
      });
    } else {
      hash[name] = [];
    }
    //add current transaction to hash table
    hash[name].push([time, amount, city, i, transactions[i]]);
  }

  return invalid;
};

/*notes
input: array of transactors, strings, comma separated name, time(mins), amount, city of transaction

output: array of possibly invalid transactions (in their string form)

edge: transactions is empty or one length

ex:

Input: transactions = ["alice,20,800,mtv","alice,50,100,beijing"]
Output: ["alice,20,800,mtv","alice,50,100,beijing"]
Explanation: The first transaction is invalid because the second transaction occurs within a difference of 60 minutes, have the same name and is in a different city. Similarly the second one is invalid too.

possibly invalid if
//if it is > 1000
//if it occurs within & including 60 mins of another transaction with same name in a different city

approach:

  iterate through transactions:
      [name, time, amount, city] = string.split

      if the amount is over $1000, add it to the invalid transactions
      iterate through the hash[name][0] object to see if any of the times are at or within 60 mins
          if yes, compare the cities, if they are different cities, add it to invalid array as a string

      if they name doesnt exist in hash yet, create it:
      if it exists, add it

          we add the hash[name]

                 hash[name] = [time, amount, city]





*/
