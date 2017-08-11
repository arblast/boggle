const Grid = require('./grid.js');
const NUM_ROWS = 5;
const NUM_COLS = 5;

document.addEventListener("DOMContentLoaded", () => {

  let selectedBlocks = [];
  let selectedWord = [];
  const htmlGrid = document.getElementById("grid");
  const blocks = document.getElementsByClassName('block');
  const currentDisplay = document.getElementById("current");
  let grid = new Grid(NUM_ROWS,NUM_COLS);
  grid.placeDice();

  for(let i = 0; i < NUM_ROWS*NUM_COLS; i++) { //place letters on blocks
    let htmlBlock = blocks[i];
    htmlBlock.innerHTML = grid.blockVal(i);
    setTimeout(() => {htmlBlock.style.color = "black";}, 200);
  }

  htmlGrid.onclick = (e) => {
    if(e.target.className.includes("block")) {
      let block = e.target;
      if(block.id === lastSelected()) {
        block.className = "block";
        selectedBlocks.pop();
        selectedWord.pop();
        updateCurrentWord();
      } else if(isValidMove(block.id)) {
        block.className = "block selected";
        selectedBlocks.push(block.id);
        selectedWord.push(grid.blockVal(block.id));
        updateCurrentWord();
      } else {
        alert("invalid move!");
      }
    }
  }


  function updateCurrentWord() {
    currentDisplay.innerHTML = getCurrentWord().toUpperCase();
  }

  function isValidMove(id) {
    if(selectedBlocks.includes(id)) {
      return false;
    } else if(selectedBlocks.length === 0 || grid.isAdjacent(lastSelected(), id)) {
      return true;
    }  else {
      return false;
    }
  }

  function getCurrentWord() {
    let word = selectedWord.join("");
    word = word.toLowerCase();
    return word;
  }

  function lastSelected() {
    return selectedBlocks[selectedBlocks.length - 1];
  }


});
