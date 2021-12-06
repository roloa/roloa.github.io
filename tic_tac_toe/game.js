
import {InputController} from './input_controller.js'
import {Board} from './board.js'

export class Template {
    constructor( game ){
        this.game = game;
    }
    on_update(){

    }
    on_draw( canvas ){

    }
}

export class Game {

    static PROC_TIME_X = 40;
    static PROC_TIME_Y = 40;
    static PROC_TIME_SPACING = 20;
    static PROC_TIME_COLOR = 'rgb(222,222,222)';
    static PROC_TIME_FONT = 'bold 12px monospace';


    constructor(){
        this.name = 'tictactoe';
        this.version = '0.1';


        this.display_canvas_element = document.getElementById('my_canvas');
        this.display_canvas = this.display_canvas_element.getContext('2d');

        this.SCREEN_WIDTH = 800;
        this.SCREEN_HEIGHT = 600;
        this.SCREEN_WIDTH_HALF = this.SCREEN_WIDTH / 2;
        this.SCREEN_HEIGHT_HALF = this.SCREEN_HEIGHT / 2;

        this.input_controller = new InputController( this );
        this.board = new Board( this );

        this.interval_handle = 0;
    }

    reset(){
        console.log('game reset!')
        console.log(this.name, this.version)
    }
    start(){

        this.input_controller.setup()
        this.interval_handle = setInterval( this.on_update.bind(this), 20 )
    }

    test(){
        console.log('game test!')
    }

    on_update(){
        try {
            this.input_controller.on_update();

            this.board.on_update();
            this.on_draw();

        } catch ( e ) {
            // なんかエラーが起きたら、ゲーム動作を止める
            clearInterval( this.interval_handle );
            console.log('game halted on error!');
            throw e;
        }
    }
    on_draw(){

            this.display_canvas.fillStyle = 'rgb(100,100,100)';
            this.display_canvas.fillRect(0,0, this.SCREEN_WIDTH,  this.SCREEN_HEIGHT );

            this.board.on_draw( this.display_canvas );

    }

}
