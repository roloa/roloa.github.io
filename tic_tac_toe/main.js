
import {Game} from './game.js';

var game = new Game();

window.mygame = game;

//document.getElementById('app_version').innerHTML = game.version


game.reset();
game.test();
game.start();
