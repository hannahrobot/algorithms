/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  const freq = new Array(26).fill(0);

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    freq[task.charCodeAt(0) - 65]++;
  }

  freq.sort((a, b) => a - b);

  let maxFreq = freq[freq.length - 1];
  let idleTime = (maxFreq - 1) * n;

  for (let i = freq.length - 2; i >= 0 && idleTime > 0; i--) {
    idleTime -= Math.min(maxFreq - 1, freq[i]);
  }
  idleTime = Math.max(0, idleTime);

  return idleTime + tasks.length;
};
