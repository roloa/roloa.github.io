
import {Game} from './game.js';
import {Control} from './control.js';

let game = new Game()
let control = new Control()

//document.game = game

control.init( game )

game.reset()
//game.test()
game.start()
