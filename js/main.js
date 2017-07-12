const View = require('./snake-view');

$l(function () {
  const rootEl = $l(".snake-game");
  window.clearInterval(new View(rootEl).intervalId);

  $l('.play').on("click", function() {
    new View(rootEl);
  })
});
