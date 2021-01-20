var frequencySort = function (s) {
  const ordered = s.split("").sort((a, b) => {
    if (a < b) {
      return -1;
    } else {
      return 1;
    }
  });

  console.log("ordered", ordered);
  const grouped = [];
  let tempString = "";
  let anchor = 0;

  for (let i = 0; i < ordered.length; i++) {
    if (ordered[i + 1] !== ordered[i] || i === ordered.length - 1) {
      tempString += ordered[i];
      grouped.push(tempString);
      tempString = "";
    } else {
      tempString += ordered[i];
    }
  }

  const sorted = grouped.sort((a, b) => b.length - a.length);

  return sorted.join("");
};
