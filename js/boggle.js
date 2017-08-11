const Grid = require('./grid.js');

document.addEventListener("DOMContentLoaded", () => {
  let grid = new Grid(5,5);
  grid.placeDice();
  window.g = grid.grid;
});
