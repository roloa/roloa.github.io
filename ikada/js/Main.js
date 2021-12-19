
import {Game} from './Game.js';

var game = new Game();

window.game = game;

//document.getElementById('app_version').innerHTML = game.version


game.reset();
game.test();
game.start();
