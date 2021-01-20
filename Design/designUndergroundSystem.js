//initial solution
//time complexity: checkin - 0(1), checkout - 0(1), (0(n))
//space complexity: 0(n)

var UndergroundSystem = function () {
  this.ids = {};
  this.stations = {};
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  this.ids[id] = [stationName, t];
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  //one way to improve this would to have an array with two indices, one is count and another is average time, update average with each addition
  if (this.ids[id]) {
    if (this.stations[`${this.ids[id][0]}${stationName}`]) {
      this.stations[`${this.ids[id][0]}${stationName}`].push(
        t - this.ids[id][1]
      );
    } else {
      this.stations[`${this.ids[id][0]}${stationName}`] = [t - this.ids[id][1]];
    }
  }
};

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function (
  startStation,
  endStation
) {
  return (
    this.stations[`${startStation}${endStation}`].reduce((a, b) => a + b) /
    this.stations[`${startStation}${endStation}`].length
  );
};

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */

//optomized solution
//time complexity: checkin - 0(1), checkout - 0(1), (0(1))
//space complexity: 0(n)
var UndergroundSystem = function () {
  this.ids = {};
  this.stations = {};
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  this.ids[id] = [stationName, t];
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  //one way to improve this would to have an array with two indices, one is count and another is average time, update average with each addition
  if (this.ids[id]) {
    if (this.stations[`${this.ids[id][0]}${stationName}`]) {
      this.stations[`${this.ids[id][0]}${stationName}`].count++;
      this.stations[`${this.ids[id][0]}${stationName}`].total =
        this.stations[`${this.ids[id][0]}${stationName}`].total +
        (t - this.ids[id][1]);
    } else {
      this.stations[`${this.ids[id][0]}${stationName}`] = {};
      this.stations[`${this.ids[id][0]}${stationName}`].count = 1;
      this.stations[`${this.ids[id][0]}${stationName}`].total =
        t - this.ids[id][1];
    }
  }
};

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function (
  startStation,
  endStation
) {
  return (
    this.stations[`${startStation}${endStation}`].total /
    this.stations[`${startStation}${endStation}`].count
  );
};

//tests

var obj = new UndergroundSystem();
obj.checkIn(45, "Leyton", 3);
obj.checkOut(45, "Waterloo", 15);
obj.checkIn(27, "Leyton", 10);
obj.checkOut(27, "Waterloo", 20);
var param_3 = obj.getAverageTime("Leyton", "Waterloo");

console.log(param_3);
