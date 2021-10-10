

import {Game} from './game.js';

// フルスクリーンキャンバス
let make_canvas_fullscreen = function(){
    let canvas = document.getElementById('my_canvas')
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight - 10

}
make_canvas_fullscreen()
window.onresize = make_canvas_fullscreen


let game = new Game()

game.reset()
