
import {World} from './World.js';
import {Hud} from './hud/Hud.js';
import {InputController} from './InputController.js'
import {ImageLibrary} from './ImageLibrary.js'
import {Inventory} from './Inventory.js'
import {Materials} from './Materials.js'
import {TitleScreen} from './TitleScreen.js'
import {SaveDataManager} from './SaveDataManager.js'
import {HudVirtualInput} from './hud/HudVirtualInput.js';
import {DebugCommands} from './DebugCommands.js';



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

    static PROC_TIME_X = 10;
    static PROC_TIME_Y = 10;
    static PROC_TIME_SPACING = 12;
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

        this.image_library = new ImageLibrary( this );
        this.image_library.load_images();

        this.input_controller = new InputController( this );
        this.world = new World( this );
        this.hud = new Hud( this );
        this.inventory = new Inventory( this );
        this.materials = new Materials( this );
        this.save_data_manager = new SaveDataManager( this );

        this.is_there_title = true;
        this.title_screen = new TitleScreen( this );

        this.movie_playing = null;
        this.hud_virtual_input = new HudVirtualInput( this );

        this.dc = new DebugCommands( this );
        this.interbal_handle = 0;
    }

    reset(){
        console.log('game reset!')
        console.log(this.name, this.version)
    }
    start(){

        this.log('welcome, drifter.');
        this.log('-----');
        this.log('主な操作(仮)');
        this.log('WASD: 移動、ジャンプ');
        this.log('マウスクリック: アイテムを使う');
        this.log('マウスホイール: アイテムスロットを選ぶ');
        this.log('Tabキー: メニューを開く');
        this.log('Q,E: メニューのタブ移動');
        this.log('X,スペース,エンター: メニューの決定');
        this.log('-----');
        this.input_controller.setup()
        this.interbal_handle = setInterval( this.on_update.bind(this), 20 )
    }


    test(){
        console.log('game test!')
    }

    log( message ){
        this.hud.hud_log.push_log( message );
    }
    on_update(){
        try {
            performance.mark('on_update_start')

            this.input_controller.on_update();
            this.hud_virtual_input.on_update()

            if( this.movie_playing != null ){
                this.movie_playing.on_update();
            } else if( this.is_there_title ){
                this.title_screen.on_update();
            } else {
                this.world.on_update();
                this.hud.on_update();
            }

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
        } catch ( e ) {
            // なんかエラーが起きたら、ゲーム動作を止める
            clearInterval( this.interbal_handle );
            console.log('game halted on error!');

            // ダメ元でエラーメッセージを画面に表示
            this.display_canvas.fillStyle = Game.PROC_TIME_COLOR;
            this.display_canvas.font = Game.PROC_TIME_FONT;
            this.display_canvas.fillText( 'エラー発生: ' + e ,
            200 ,200);
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
    on_draw(){
        performance.mark('on_draw_start')


        if( this.is_use_buffer ){
            // this.inactive_canvas.fillStyle = 'rgb(0,0,30)';
            // this.inactive_canvas.fillRect(0,0, this.SCREEN_WIDTH,  this.SCREEN_HEIGHT );
            //
            // this.world.on_draw( this.inactive_canvas );
            // this.hud.on_draw( this.inactive_canvas );
            //
            // this.draw_parformance( this.inactive_canvas )
            //
            // this.inactive_canvas.visible = true;
            // this.active_canvas.visible = false;
            //
            // let swap = this.inactive_canvas;
            // this.inactive_canvas = this.active_canvas ;
            // this.active_canvas = swap;
        } else {
            // グラフィックコンテキストの初期化
            this.display_canvas.lineWidth = 2;

            this.display_canvas.fillStyle = 'rgb(0,0,30)';
            this.display_canvas.fillRect(0,0, this.SCREEN_WIDTH,  this.SCREEN_HEIGHT );

            if( this.movie_playing != null ){
                this.movie_playing.on_draw( this.display_canvas );
            } else {
                this.world.on_draw( this.display_canvas );
            }
            this.hud.on_draw( this.display_canvas );
            // 仮想入力キーボード
            this.hud_virtual_input.on_draw( this.display_canvas );


            if( this.is_there_title ){
                this.title_screen.on_draw( this.display_canvas );
            }

            this.draw_parformance( this.display_canvas );

        }
        performance.mark('on_draw_end')
    }

}
