const Dice = require('./dice.js');
const randArrayRemove = require('./helpers.js').randArrayRemove;

const POSSIBLE_DICE = [
  "aaafrs",
  "aaeeee",
  "aafirs",
  "adennn",
  "aeeeem",
  "aeegmu",
  "aegmnn",
  "afirsy",
  "bjkqxz",
  "ccenst",
  "ceiilt",
  "ceilpt",
  "ceipst",
  "ddhnot",
  "dhhlor",
  "dhlnor",
  "dhlnor",
  "eiiitt",
  "emottt",
  "ensssu",
  "fiprsy",
  "gorrvw",
  "iprrry",
  "nootuw",
  "ooottu"
]

class Grid {

  constructor(rows,columns) {
    this.grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.grid[i] = new Array(columns);
    }
    this.diceArray = [];
    POSSIBLE_DICE.forEach((dice) => {
      this.diceArray.push(new Dice(dice));
    });
  }

}

module.exports = Grid;
