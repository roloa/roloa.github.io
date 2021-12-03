
import {World} from './world.js';
import {Hud} from './hud.js';
import {InputController} from './input_controller.js'
import {ImageLibrary} from './image_library.js'
import {Inventory} from './inventory.js'



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
        this.name = 'ikada';
        this.version = '0.1';


        this.display_canvas_element = document.getElementById('my_canvas');
        this.display_canvas = this.display_canvas_element.getContext('2d');

        this.SCREEN_WIDTH = 960;
        this.SCREEN_HEIGHT = 600;
        this.SCREEN_WIDTH_HALF = this.SCREEN_WIDTH / 2;
        this.SCREEN_HEIGHT_HALF = this.SCREEN_HEIGHT / 2;

        //this.buffer_canvas_element = document.createElement("canvas");
        this.buffer_canvas_element = document.getElementById('my_buffer_canvas');

        this.buffer_canvas_element.width = this.SCREEN_WIDTH;
        this.buffer_canvas_element.height = this.SCREEN_HEIGHT;
        // this.buffer_canvas_element.hidden = true;
        this.buffer_canvas = this.buffer_canvas_element.getContext('2d')

        this.active_canvas = this.display_canvas;
        this.inactive_canvas = this.buffer_canvas;

        this.is_use_buffer = false;

        this.performance_count = 0;
        this.update_process_time = 0;
        this.draw_process_time = 0;

        this.input_controller = new InputController( this );
        this.hud = new Hud( this );
        this.world = new World( this );
        this.image_library = new ImageLibrary( this );

    }

    reset(){
        console.log('game reset!')
        console.log(this.name, this.version)
    }
    start(){

        this.image_library.load_images();

        this.input_controller.setup()
        setInterval( this.on_update.bind(this), 20 )
    }


    test(){
        console.log('game test!')
    }

    on_update(){

        performance.mark('on_update_start')

        this.input_controller.on_update();
        this.world.on_update();
        this.hud.on_update();

        this.on_draw();

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

    }
    draw_parformance( canvas ){
        canvas.fillStyle = Game.PROC_TIME_COLOR;
        canvas.font = Game.PROC_TIME_FONT;
        canvas.fillText( ' All: ' + this.update_process_time + '[us]' ,
        Game.PROC_TIME_X ,Game.PROC_TIME_Y + Game.PROC_TIME_SPACING * 0);
        canvas.fillText( 'Draw: ' + this.draw_process_time + '[us]' ,
        Game.PROC_TIME_X ,Game.PROC_TIME_Y + Game.PROC_TIME_SPACING * 1);
    }
    on_draw(){
        performance.mark('on_draw_start')

        if( this.is_use_buffer ){
            this.inactive_canvas.fillStyle = 'rgb(0,0,30)';
            this.inactive_canvas.fillRect(0,0, this.SCREEN_WIDTH,  this.SCREEN_HEIGHT );

            this.world.on_draw( this.inactive_canvas );
            this.hud.on_draw( this.inactive_canvas );

            this.draw_parformance( this.inactive_canvas )

            this.inactive_canvas.visible = true;
            this.active_canvas.visible = false;

            let swap = this.inactive_canvas;
            this.inactive_canvas = this.active_canvas ;
            this.active_canvas = swap;
        } else {

            this.display_canvas.fillStyle = 'rgb(0,0,30)';
            this.display_canvas.fillRect(0,0, this.SCREEN_WIDTH,  this.SCREEN_HEIGHT );

            this.world.on_draw( this.display_canvas );
            this.hud.on_draw( this.display_canvas );

            this.draw_parformance( this.display_canvas );
        }
        performance.mark('on_draw_end')
    }

}
