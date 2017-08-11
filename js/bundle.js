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
	
	document.addEventListener("DOMContentLoaded", () => {
	  let grid = new Grid(5,5);
	  console.log(grid.diceArray);
	  grid.placeDice();
	  console.log(grid.diceArray);
	  window.g = grid.grid;
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