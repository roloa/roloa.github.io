
try {
    var game = new Game();

    window.game = game;

    game.init();
    // game.test();
    // game.start();
} catch (e) {
    alert(e);
    throw e;
}
