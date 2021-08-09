/**
 * @param {number} length
 */
const SnapshotArray = function (int) {
  this.array = [];
  this.snapshots = [];
};

SnapshotArray.prototype.set = function (index, val) {
  this.array[index] = val;
};

SnapshotArray.prototype.snap = function () {
  this.snapshots.push(this.array.slice());
  return this.snapshots.length - 1;
};

SnapshotArray.prototype.get = function (index, snap_id) {
  return this.snapshots[snap_id][index] === undefined
    ? null
    : this.snapshots[snap_id][index];
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */
