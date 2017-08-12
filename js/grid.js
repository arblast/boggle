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

  placeDice() { //randomly place the dice on the board
    for(let r = 0; r < this.rows; r++) {
      for(let c = 0; c < this.columns; c++) {
        this.grid[r][c] = randArrayRemove(this.diceArray);
      }
    }
  }

  blockVal(id) { //returns the value of the dice at the specified ID
    let index = this.parseID(id);
    let row = index[0];
    let col = index[1];
    return this.grid[row][col].val();
  }

  isAdjacent(id1, id2) { //checks if one dice is adjacent to another
    let index1 = this.parseID(id1);
    let index2 = this.parseID(id2);
    if(Math.abs(index1[0] - index2[0]) <= 1 && Math.abs(index1[1] - index2[1]) <= 1) {
      return true;
    } else {
      return false;
    }
  }

  parseID(id) { //parses the ID into rows and columns
    let row = Math.floor(id/this.rows);
    let col = id%this.rows;
    return [row,col];
  }

}

module.exports = Grid;
