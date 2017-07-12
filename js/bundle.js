/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Coord {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  plus(coordinate) {
    return new Coord(this.x + coordinate.x, this.y + coordinate.y);
  }

  equals(coordinate) {
    return (this.x === coordinate.x) && (this.y === coordinate.y);
  }

  isOpposite(coordinate) {
    return (this.x === (-1 * coordinate.x)) && (this.y === (-1 * coordinate.y));
  }
}

module.exports = Coord;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(2);

$l(function () {
  const rootEl = $l(".snake-game");
  var un_mute = document.getElementById('un-mute');
  un_mute.onclick = function() {
    let songs = document.getElementsByTagName('audio');
    for (var j = 0; j < songs.length; j++) {
      songs[j].muted = true;
    }
  };
  new View(rootEl);
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);

class View {
  constructor($el) {
    this.$el = $el;

    this.board = new Board(20);
    this.setupGrid();

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLISECOND
    );

    this.score = $l('.score');

    $l(window).on("keydown", this.handleKeyEvent.bind(this));

  }

  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      window.alert("You lose!");
      window.clearInterval(this.intervalId);
    }
  }

  setupGrid() {
    let html = "";

    for (let i = 0; i < this.board.dimension; i++) {
      html += "<ul>";
      for (let j = 0; j < this.board.dimension; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }
    this.$el.html(html);
    this.$li = this.$el.find("li");
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  updateClasses(coords, className) {
    let els = $l(`.${className}`);
    els.removeClass(`${className}`);

    coords.forEach( coord => {
      const flatCoord = (coord.x * this.board.dimension) + coord.y;
      this.$li.eq(flatCoord).addClass(className);
    })
  }

  render() {
    let score = Math.floor(this.board.snake.segments.length/3);
    this.score.html(score);

    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  }
  
}

View.KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
}

View.STEP_MILLISECOND = 200;

module.exports = View;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(4);
const Apple = __webpack_require__(5);

class Board {
  constructor(dimension) {
    this.dimension = dimension;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }

  static blankGrid(dimension) {
    const grid = [];

    for (let i = 0; i < dimension; i++) {
      const row = [];
      for (let j = 0; j < dimension; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  }

  render() {
    const grid = Board.blankGrid(this.dimension);

    this.snake.segments.forEach( segment => {
      grid[segment.x][segment.y] = Snake.SYMBOL;
    });

    grid[this.apple.position.x][this.apple.position.y] = Apple.SYMBOL;

    const rowStrs = [];
    grid.map( row => row.join("") ).join("\n");
  }

  validPosition(coord) {
    return (coord.x >= 0) && (coord.x < this.dimension) &&
      (coord.y >= 0) && (coord.y < this.dimension);
  }
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(0);


class Snake {
  constructor(board) {
    this.direction = 'N';
    this.turning = false;
    this.board = board;
    const center = new Coord(Math.floor(board.dimension/2), Math.floor(board.dimension/2));
    this.segments = [center];

    this.growTurns = 0;
  }

  eatApple() {
    if (this.head().equals(this.board.apple.position)) {
      this.growTurns += 3;
      return true;
    } else {
      return false;
    }
  }

  isOccupying(array) {
    let result =  false;
    this.segments.forEach( segment => {
      if (segment.x === array[0] && segment.y === array[1]) {
        result = true;
        return result;
      }
    });
    return result;
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  isValid() {
    const head = this.head();

    if (!this.board.validPosition(this.head())) {
      return false;
    }

    for (let i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }
    return true;
  }

  turn(direction) {
    // prevent opposite turning
    //  {x: 1, y: 0}
    //  {x: -1, y: 0}
    console.log(Snake.DIRECTION[this.direction]);
    if (Snake.DIRECTION[this.direction].isOpposite(Snake.DIRECTION[direction]) ||
      this.turning) {
        return;
      } else {
        this.turning = true;
        this.direction = direction;
      }
    }


  move() {
    //move in the same direction
    this.segments.push(this.head().plus(Snake.DIRECTION[this.direction]));
    // allow turning
    this.turning = false;

    if (this.eatApple()) {
      this.board.apple.replace();
    }

    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    if (!this.isValid()) {
      this.segments = [];
    }
  }
}

Snake.DIRECTION = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};

Snake.SYMBOL = "S";
Snake.GROW_TURNS = 3;

module.exports = Snake;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Coord = __webpack_require__(0);

class Apple {
  constructor(board) {
    this.board = board;
    this.replace();
  }

  replace() {
    let x = Math.floor(Math.random() * this.board.dimension);
    let y = Math.floor(Math.random() * this.board.dimension);

    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dimension);
      y = Math.floor(Math.random() * this.board.dimension);
    }

    this.position = new Coord(x, y);
  }

}

module.exports = Apple;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map