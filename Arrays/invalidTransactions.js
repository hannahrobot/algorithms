//naive - doesnt work
var invalidTransactions = function (transactions) {
  const res = [];
  const hash = {};

  for (let i = 0; i < transactions.length; i++) {
    const name = transactions[i].match(/^[a-z]+/);
    if (hash[name]) {
      const curr = transactions[i].split(",");
      if (
        curr[1] !== hash[name][1] &&
        Math.abs(curr[1] - hash[name][1]) <= 60 &&
        curr[3] !== hash[name][3]
      ) {
        res.push(hash[name].join(","), transactions[i]);
      } else if (curr[2] > 1000) {
        res.push(transactions[i]);
      }
      hash[name] = curr;
    } else {
      const curr = transactions[i].split(",");
      if (curr[2] > 1000) {
        res.push(transactions[i]);
      }
      hash[name] = curr;
    }
  }
  return res;
};

//optimized
var invalidTransactions = function (transactions) {
  const invalid = new Set();
  const info = [];

  // create info arr: each element contains an obj with name, time, price, city, & raw string of input
  for (let trans of transactions) {
    let [name, time, price, city] = trans.split(",");
    info.push({ name, time, price, city, raw: trans });
  }
  // sort ascending times
  info.sort((a, b) => Number(a.time) - Number(b.time));

  // add to invalid if price > 1000
  for (let infoEl of info) {
    if (infoEl.price > 1000) {
      invalid.add(infoEl.raw);
    }
  }
  // add elements to invalid if (within 60 time of eachother, diff city, same name)
  for (let i = 0; i < info.length - 1; i++) {
    let curr = info[i];
    let nextI = i + 1;

    while (nextI < info.length && info[nextI].time - curr.time <= 60) {
      if (curr.name === info[nextI].name && curr.city !== info[nextI].city) {
        invalid.add(curr.raw);
        invalid.add(info[nextI].raw);
      }
      nextI++;
    }
  }
  return Array.from(invalid);
};
