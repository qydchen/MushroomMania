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
