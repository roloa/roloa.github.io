
import {InputController} from './InputController.js'
import {ImageLibrary} from './ImageLibrary.js'
import {World} from './World.js'

export class Template extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    on_update(){

    }
    on_draw( canvas ){

    }
}

export class Game {

    static PROC_TIME_X = 40;
    static PROC_TIME_Y = 365;
    static PROC_TIME_SPACING = 14;
    static PROC_TIME_COLOR = 'rgb(22,22,22)';
    static PROC_TIME_FONT = 'bold 12px monospace';


    constructor(){
        this.name = 'fourth';
        this.version = '0.1';


        this.canvas_element = document.getElementById('my_canvas');
        this.canvas2d = this.canvas_element.getContext('2d');

        this.SCREEN_WIDTH = 576;
        this.SCREEN_HEIGHT = 384;

        this.performance_count = 0;
        this.update_process_time = 0;
        this.draw_process_time = 0;

        this.image_library = new ImageLibrary( this );
        this.image_library.load_images();

        this.input_controller = new InputController( this );
        this.in_co = this.input_controller;

        this.world = new World( this );

        this.interbal_handle = 0;
    }

    reset(){
        console.log('game reset!')
        console.log(this.name, this.version)
    }
    start(){

        this.input_controller.setup()
        this.interbal_handle = setInterval( this.on_update.bind(this), 20 );

    }
    test(){
        console.log('game test!')
    }
    log( msg ){
        console.log( msg );
    }
    on_update(){
        try {
            performance.mark('on_update_start')

            this.input_controller.on_update();

            this.world.on_update();
            this.on_draw( this.canvas2d );

            performance.mark('on_update_end')
            performance.measure('update', 'on_update_start', 'on_update_end')
            performance.measure('draw', 'on_draw_start', 'on_draw_end')
            if( 100 < this.performance_count){
                this.performance_count = 0;

                let sum = 0;
                let result = null;
                result = performance.getEntriesByName('update')
                sum = 0;
                for( let i = 0 ; i < result.length ; i++ ){
                    sum += result[i].duration;
                }
                this.update_process_time = Math.floor(sum * 10);

                result = performance.getEntriesByName('draw')
                sum = 0;
                for( let i = 0 ; i < result.length ; i++ ){
                    sum += result[i].duration;
                }
                this.draw_process_time = Math.floor(sum * 10);

                //console.log( 'update',  );
                performance.clearMeasures();
            } else {
                this.performance_count += 1;
            }
            if( this.input_controller.is_pressed_key['KeyP'] ){
                console.log('game stop!');
                throw new Exception();
            }
        } catch ( e ) {
            // なんかエラーが起きたら、ゲーム動作を止める
            clearInterval( this.interbal_handle );
            console.log('game halted on error!');
            throw e;
        }
    }
    draw_parformance( canvas ){
        canvas.fillStyle = Game.PROC_TIME_COLOR;
        canvas.font = Game.PROC_TIME_FONT;
        canvas.fillText( ' All: ' + this.update_process_time + '[us]' ,
        Game.PROC_TIME_X ,Game.PROC_TIME_Y + Game.PROC_TIME_SPACING * 0);
        canvas.fillText( 'Draw: ' + this.draw_process_time + '[us]' ,
        Game.PROC_TIME_X ,Game.PROC_TIME_Y + Game.PROC_TIME_SPACING * 1);
    }
    on_draw( canvas ){
        performance.mark('on_draw_start')

        // グラフィックコンテキストの初期化
        canvas.lineWidth = 2;

        canvas.fillStyle = 'rgb(150,250,200)';
        canvas.fillRect(0,0, this.SCREEN_WIDTH,  this.SCREEN_HEIGHT );

        this.world.on_draw( canvas );

        this.draw_parformance( canvas );

        performance.mark('on_draw_end')
    }

}
