
import {Game} from './Game.js';

try{
    var game = new Game();

    window.game = game;

    // game.reset();
    // game.test();
    game.start();
} catch( e ){
    alert( e );
    throw e;
}
