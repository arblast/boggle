const randArray = require('./helpers.js').randArray;

class Dice {

  constructor(sides) {
    this.sides = sides;
    this.roll();
  }

  roll() { //randomly assigns the dice value
    this.value = randArray(this.sides);
  }

  val() {
    if(this.value === "q") {
      return "Qu";
    } else {
      return this.value.toUpperCase();
    }
  }
}

module.exports = Dice;
