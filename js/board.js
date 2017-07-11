const Snake = require('./snake');
const Apple = require('./apple');

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
