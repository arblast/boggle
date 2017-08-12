const Grid = require('./grid.js');
const NUM_ROWS = 5;
const NUM_COLS = 5;
const SCORE = {
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 2,
  6: 3,
  7: 5,
  8: 11
}

const HIGHEST_SCORE_LENGTH = 8;

document.addEventListener("DOMContentLoaded", () => {

  let selectedBlocks = [];
  let selectedWord = [];
  let scoredWords = {};
  let totalScore = 0;
  const htmlGrid = document.getElementById("grid");
  const blocks = document.getElementsByClassName('block');
  const currentDisplay = document.getElementById("current");
  const error = document.getElementById('error');
  const submit = document.getElementById('submit');
  const scoreTable = document.getElementById('score').getElementsByTagName('tbody')[0];
  const total = document.getElementById('total');
  const totalScoreDisplay = document.getElementById('totalScoreDisplay');

  let grid = new Grid(NUM_ROWS,NUM_COLS);

  grid.placeDice(); //randomly generate the board based on dice options

  for(let i = 0; i < NUM_ROWS*NUM_COLS; i++) { //place letters on blocks
    let htmlBlock = blocks[i];
    htmlBlock.innerHTML = grid.blockVal(i);
    setTimeout(() => {htmlBlock.style.color = "black";}, 200);
  }

  htmlGrid.onclick = (e) => { //logic to handle click on grid
    if(e.target.className.includes("block")) {
      let block = e.target;
      clearError();
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
        displayError("Invalid move! Please try again.");
      }
    }
  }

  submit.onclick = () => { //logic to handle submit button
    let word = getCurrentWord();
    if(word && isValidWord(word)) {
      addScore(word);
      clearError();
      clearBlocks();
      updateCurrentWord();
    } else {
      displayError("Word has already been used, or no word is currently selected.")
    }
  }

  //game functions

  function updateCurrentWord() { //updates display of current word
    currentDisplay.innerHTML = getCurrentWord().toUpperCase();
  }

  function isValidMove(id) { //ensures block is not already been selected and is adjacent to previous block
    if(selectedBlocks.includes(id)) {
      return false;
    } else if(selectedBlocks.length === 0 || grid.isAdjacent(lastSelected(), id)) {
      return true;
    }  else {
      return false;
    }
  }

  function isValidWord(word) {
    if(scoredWords[word]) {
      return false;
    } else {
      return true;
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

  function displayError(message) {
    error.innerHTML = message;
  }

  function clearError() {
    error.innerHTML = "";
  }

  function clearBlocks() {
    selectedBlocks = [];
    selectedWord = [];
    for(let i = 0; i < blocks.length; i++) {
      blocks[i].className = "block";
    }
  }

  function addScore(word) {  //adds to score count and adds table row
    scoredWords[word] = true;
    let length = word.length;
    if (length > HIGHEST_SCORE_LENGTH) {length = HIGHEST_SCORE_LENGTH;}
    let score = SCORE[length];
    totalScore += score;
    createScoreElement(word, score);
    totalScoreDisplay.innerHTML = totalScore;
  }

  function createScoreElement(word, score) { //creates and adds the table row
    let tr = scoreTable.insertRow(1);
    let tdWord = document.createElement("td");
    let tdScore = document.createElement("td");
    tdWord.className = "word-column";
    tdWord.innerHTML = word;
    tdScore.innerHTML = score;
    tr.appendChild(tdWord);
    tr.appendChild(tdScore);
  }

});
