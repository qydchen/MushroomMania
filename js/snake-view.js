const Board = require('./board');

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

View.STEP_MILLISECOND = 100;

module.exports = View;
