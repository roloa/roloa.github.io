
import {Game} from './game.js';
import {Control} from './control.js';

let game = new Game()
let control = new Control()

//document.game = game

document.getElementById('app_version').innerHTML = game.version

control.init( game )

game.reset()
//game.test()
game.start()
