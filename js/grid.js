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
    this.rows = rows;
    this.columns = columns;
    this.grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.grid[i] = new Array(columns);
      this.grid[i].fill(null);
    }
    this.diceArray = [];
    POSSIBLE_DICE.forEach((dice) => {
      this.diceArray.push(new Dice(dice));
    });
  }

  placeDice() {
    for(let r = 0; r < this.rows; r++) {
      for(let c = 0; c < this.columns; c++) {
        this.grid[r][c] = randArrayRemove(this.diceArray);
      }
    }
  }

  forEach(callback) {
    for(let r = 0; r < this.rows; r++) {
      for(let c = 0; c < this.columns; c++) {
        callback(this.grid[r][c]);
      }
    }
    return this.grid;
  }

}

module.exports = Grid;
