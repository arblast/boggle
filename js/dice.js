const randArray = require('./helpers.js').randArray;

class Dice {

  constructor(sides) {
    this.sides = sides;
    this.roll();
  }

  roll() {
    this.value = randArray(this.sides);
  }
}

module.exports = Dice;
