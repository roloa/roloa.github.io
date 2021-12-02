
import {World} from './world.js';
import {Hud} from './hud.js';
import {InputController} from './input_controller.js'

export class Template {
    constructor(){
    }
    on_update(){
    }
    on_draw(){
    }
}

export class Game {

    constructor(){
        this.name = 'ikada';
        this.version = '0.1';


        this.canvas_element = document.getElementById('my_canvas');
        this.canvas = this.canvas_element.getContext('2d');

        this.SCREEN_WIDTH = 960;
        this.SCREEN_HEIGHT = 600;
        this.SCREEN_WIDTH_HALF = this.SCREEN_WIDTH / 2;
        this.SCREEN_HEIGHT_HALF = this.SCREEN_HEIGHT / 2;


        this.input_controller = new InputController( this );
        this.hud = new Hud( this );
        this.world = new World( this );

    }


    reset(){
        console.log('game reset!')
        console.log(this.name, this.version)
    }
    start(){
        this.input_controller.setup()
        setInterval( this.on_update.bind(this), 20 )
    }


    test(){
        console.log('game test!')
    }

    on_update(){
        this.world.on_update()
//        this.hud.on_update()

        this.on_draw()
    }
    on_draw(){

        this.canvas.fillStyle = 'rgb(0,0,30)'
        this.canvas.fillRect(0,0, this.canvas_element.width, this.canvas_element.height )

        this.world.on_draw( this.canvas )
        this.hud.on_draw( this.canvas )

    }

}
