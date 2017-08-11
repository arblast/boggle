const Grid = require('./grid.js');
const NUM_ROWS = 5;
const NUM_COLS = 5;

document.addEventListener("DOMContentLoaded", () => {

  const blocks = document.getElementsByClassName('block');
  let grid = new Grid(NUM_ROWS,NUM_COLS);
  grid.placeDice();
  for(let r = 0; r < NUM_ROWS; r++) {
    for(let c = 0; c < NUM_COLS; c++) {
      blocks[r*NUM_COLS + c].innerHTML = grid.blockVal(r,c);
    }
  }
});
