const Coord = require('./coord');


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
