var crackSafe = function (n, k) {
  if (k < 1 || n === 0) return "";
  let perms = getPerms(n, k);
  let graph = buildGraph(perms, k);
  let used = new Set();
  let pass = dfs();
  return pass;

  function dfs(current = perms[0], nextPerm = perms[0]) {
    used.add(nextPerm);
    if (used.size === perms.length) {
      return current;
    }

    const children = graph[nextPerm];
    for (let overlapPerm of children) {
      if (used.has(overlapPerm)) continue;
      let nonOverlap = overlapPerm.slice(overlapPerm.length - 1);
      let password = dfs(current + nonOverlap, overlapPerm);
      if (password.length) {
        return password;
      }
    }

    used.delete(nextPerm);
    return "";
  }
};

function buildGraph(perms, k) {
  let graph = {};
  for (let perm of perms) {
    graph[perm] = [];
  }
  for (let perm1 of perms) {
    for (let i = 0; i < k; i++) {
      let nextPerm = perm1.slice(1) + i;
      for (let perm2 of perms) {
        if (nextPerm === perm2) {
          graph[perm1].push(perm2);
        }
      }
    }
  }
  return graph;
}

function getPerms(n, k) {
  let perms = [];
  getPermsRec();
  return perms;

  function getPermsRec(curr = "") {
    if (curr.length === n) {
      perms.push(curr);
      return;
    }
    for (let i = 0; i < k; i++) {
      getPermsRec(curr + i);
    }
  }
}
