/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Grid = __webpack_require__(1);
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
	  grid.placeDice();
	
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
	        displayError();
	      }
	    }
	  }
	
	  submit.onclick = () => { //logic to handle submit button
	    let word = getCurrentWord();
	    if(word && isValidWord(word)) {
	      addScore(word);
	      clearBlocks();
	      updateCurrentWord();
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
	
	  function isValidWord(word) { //placeholder for validating word
	    return true;
	  }
	
	  function getCurrentWord() {
	    let word = selectedWord.join("");
	    word = word.toLowerCase();
	    return word;
	  }
	
	  function lastSelected() {
	    return selectedBlocks[selectedBlocks.length - 1];
	  }
	
	  function displayError() {
	    error.innerHTML = "Invalid move! Please try again.";
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
	
	  function addScore() {
	    let word = getCurrentWord();
	    let length = word.length;
	    if (length > HIGHEST_SCORE_LENGTH) {length = HIGHEST_SCORE_LENGTH;}
	    let score = SCORE[length];
	    totalScore += score;
	    createScoreElement(word, score);
	    totalScoreDisplay.innerHTML = totalScore;
	  }
	
	  function createScoreElement(word, score) {
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Dice = __webpack_require__(2);
	const randArrayRemove = __webpack_require__(3).randArrayRemove;
	
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
	
	  blockVal(id) {
	    let index = this.parseID(id);
	    let row = index[0];
	    let col = index[1];
	    return this.grid[row][col].val();
	  }
	
	  isAdjacent(id1, id2) {
	    let index1 = this.parseID(id1);
	    let index2 = this.parseID(id2); 
	    if(Math.abs(index1[0] - index2[0]) <= 1 && Math.abs(index1[1] - index2[1]) <= 1) {
	      return true;
	    } else {
	      return false;
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
	
	  parseID(id) {
	    let row = Math.floor(id/this.rows);
	    let col = id%this.rows;
	    return [row,col];
	  }
	
	}
	
	module.exports = Grid;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const randArray = __webpack_require__(3).randArray;
	
	class Dice {
	
	  constructor(sides) {
	    this.sides = sides;
	    this.roll();
	  }
	
	  roll() {
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	function randArray(array) {
	  return array[Math.floor(Math.random() * array.length)];
	}
	
	function randArrayRemove(array) {
	  let index = Math.floor(Math.random() * array.length);
	  return array.splice(index,1)[0];
	}
	
	module.exports = {
	  randArray,
	  randArrayRemove
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map