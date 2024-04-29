
try {
    var game = new Game();

    window.game = game;

    //document.getElementById("start_button").onclick = function(){
    //}

    game.init();
    // game.test();
    // game.start();
} catch (e) {
    alert(e);
    throw e;
}
