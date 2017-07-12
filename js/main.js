const View = require('./snake-view');

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
