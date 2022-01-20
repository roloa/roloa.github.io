
import {HudMenu} from './HudMenu.js'

export class MenuConfig {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(20,20,20)';
    static TITLE_FONT = 'bold 32px monospace'

    static LIST_X = 20;
    static LIST_Y = 60;
    static LIST_WIDTH = 400;
    static LIST_HEIGHT = 320;

    static LIST_TEXT_MARGIN_LEFT = 24;
    static LIST_TEXT_MARGIN_TOP = 30;
    static LIST_TEXT_FONT = 'bold 20px monospace';
    static LIST_TEXT_COLOR = 'rgb(240,240,240)';
    static LIST_TEXT_COLOR_DISABLE = 'rgb(100,100,100)'
    static LIST_TEXT_HEIGHT = 30;

    static LIST_CURSOR_COLOR = 'rgb(20,150,20)';
    static LIST_CURSOR_ADJUST = 6;

    static DESC_TEXT_X = 340;
    static DESC_TEXT_Y = 60;
    static DESC_TEXT_FONT = 'bold 18px monospace';
    static DESC_TEXT_COLOR = 'rgb(20,20,20)';
    static DESC_TEXT_COLOR_GREEN = 'rgb(20,200,20)';
    static DESC_TEXT_COLOR_RED = 'rgb(200,20,20)';
    static DESC_TEXT_HEIGHT = 28;

    static CONFIG_BUTTON_X = 400;
    static CONFIG_BUTTON_Y = 330;
    static CONFIG_BUTTON_HEIGHT = 50;
    static CONFIG_BUTTON_WIDTH =  200;
    static CONFIG_BUTTON_COLOR = 'rgb(160,160,160)';
    static CONFIG_BUTTON_TEXT_COLOR = 'rgb(20,20,20)';
    static CONFIG_BUTTON_FONT = 'bold 24px monospace';
    static CONFIG_BUTTON_TEXT_Y = 32;
    static CONFIG_BUTTON_TEXT_X = 45;




    constructor( game ){
        this.game = game;

        this.config_list = []
        this.config_list[0] = '---'
        this.config_list[1] = 'オートセーブデータにセーブする'
        this.config_list[2] = 'データ[1]にセーブする'
        this.config_list[3] = 'データ[2]にセーブする'
        this.config_list[4] = '---'
        this.config_list[5] = '仮想キーボード(試作)'
        this.config_list[6] = 'マテリアルの自動解体'
        this.config_list[7] = '---'

        this.function_list = [];
        this.function_list[0] = function(){ }.bind(this);
        this.function_list[1] = this.save_game_auto.bind(this);
        this.function_list[2] = this.save_game_1.bind(this);
        this.function_list[3] = this.save_game_2.bind(this);
        this.function_list[4] = function(){ }.bind(this);
        this.function_list[5] = this.toggle_virtual_key.bind(this);
        this.function_list[6] = this.toggle_material_auto_destruct.bind(this);
        this.function_list[7] = function(){ }.bind(this);


        this.config_cursor = 0;
        this.config_scroll = 0;
        this.menu_icon = this.game.image_library.get_image( 'haguruma' );
    }

    toggle_virtual_key(){
        this.game.hud_virtual_input.toggle_enable();
    }
    toggle_material_auto_destruct(){
        if (this.game.hud.item_slot.is_config_auto_material_deconstruct){
            this.game.hud.item_slot.is_config_auto_material_deconstruct = false;
            this.game.log('マテリアル自動解体をオフにしました。');
        } else {
            this.game.hud.item_slot.is_config_auto_material_deconstruct = true;
            this.game.log('マテリアル自動解体をオンにしました。');
        }
    }
    save_game_auto(){
        this.game.save_data_manager.save_game('save_data_auto')
        this.game.log('オートセーブにセーブしました。')
    }
    save_game_1(){
        this.game.save_data_manager.save_game('save_data_1')
        this.game.log('データ[1]にセーブしました。')
        this.game.tutorial_data.complete('データ[1]にセーブする');
    }
    save_game_2(){
        this.game.save_data_manager.save_game('save_data_2')
        this.game.log('データ[2]にセーブしました。')
    }

    get_menu_icon(){
        return this.menu_icon;
    }

    on_update(){

        if( this.game.input_controller.get_press_up() ){
            if( 0 < this.config_cursor ){
                this.config_cursor -= 1;
            }
        }
        if( this.game.input_controller.get_press_down() ){
            if( this.config_cursor < this.config_list.length - 1){
                this.config_cursor += 1;
            }
        }
        if( this.game.input_controller.get_press_enter() || this.game.input_controller.get_press_space() ){
            this.function_list[ this.config_cursor ]();
        }

        if( this.game.input_controller.get_mouse_press() ){
            this.on_click(
                this.game.input_controller.mouse_x - HudMenu.MENU_MARGIN_LEFT,
                this.game.input_controller.mouse_y - HudMenu.MENU_MARGIN_TOP );
        }
    }
    on_click( mouse_x, mouse_y ){
        for( let i = 0 ; i < 10 ; i++ ){
            let frame_y = MenuConfig.LIST_Y + MenuConfig.LIST_TEXT_MARGIN_TOP + MenuConfig.LIST_CURSOR_ADJUST +
            MenuConfig.LIST_TEXT_HEIGHT * i;
            if( MenuConfig.LIST_X < mouse_x && mouse_x < MenuConfig.LIST_X + MenuConfig.LIST_WIDTH &&
                frame_y - MenuConfig.LIST_TEXT_HEIGHT < mouse_y && mouse_y < frame_y
            ){
                if( i == this.config_cursor ){
                    this.function_list[ this.config_cursor ]();
                } else {
                    this.config_cursor = i;
                }
            }
        }
    }
    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuConfig.TITLE_COLOR;
        canvas.font = MenuConfig.TITLE_FONT
        canvas.fillText( 'コンフィグ Config' ,
            MenuConfig.TITLE_X ,MenuConfig.TITLE_Y);

        // アプグレリスト
        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.fillRect( MenuConfig.LIST_X, MenuConfig.LIST_Y, MenuConfig.LIST_WIDTH, MenuConfig.LIST_HEIGHT　);

        for( let i = 0 ; i < 10 ; i++ ){
            // カーソル
            if( i == this.config_cursor ){
                canvas.fillStyle = MenuConfig.LIST_CURSOR_COLOR;
                canvas.fillRect( MenuConfig.LIST_X ,
                MenuConfig.LIST_Y + MenuConfig.LIST_TEXT_MARGIN_TOP + MenuConfig.LIST_CURSOR_ADJUST +
                MenuConfig.LIST_TEXT_HEIGHT * i ,
                MenuConfig.LIST_WIDTH, - MenuConfig.LIST_TEXT_HEIGHT );
            }
            if( this.config_list[ i ] ){
                canvas.fillStyle = MenuConfig.LIST_TEXT_COLOR;
                canvas.font = MenuConfig.LIST_TEXT_FONT;
                canvas.fillText( this.config_list[ i ] ,
                    MenuConfig.LIST_X + MenuConfig.LIST_TEXT_MARGIN_LEFT,
                    MenuConfig.LIST_Y + MenuConfig.LIST_TEXT_MARGIN_TOP + MenuConfig.LIST_TEXT_HEIGHT * i);
            }
        }
        // アプグレ説明文など
        canvas.font = MenuConfig.DESC_TEXT_FONT;

        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR;
        // canvas.fillText( '・アップグレード名' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 1);
        //
        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR;
        // canvas.fillText( '  グライダーを強化します。' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 2);
        //
        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR;
        // canvas.fillText( '  上昇力がさらにアップします。' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 3);
        //
        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR;
        // canvas.fillText( '  (説明文3)' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 4);
        //
        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR;
        // canvas.fillText( '・必要資材' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 5);
        //
        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR_GREEN;
        // canvas.fillText( '  資材1 ....   7 / (  42 )' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 6);
        //
        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR_RED;
        // canvas.fillText( '  資材2 ....   7 / ( 3  )' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 7);
        //
        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR_RED;
        // canvas.fillText( '  資材3 ....   7 / ( 3  )' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 8);
        //
        // canvas.fillStyle = MenuConfig.DESC_TEXT_COLOR_RED;
        // canvas.fillText( '  資材4 ....   7 / ( 3  )' ,
        // MenuConfig.DESC_TEXT_X,
        // MenuConfig.DESC_TEXT_Y + MenuConfig.DESC_TEXT_HEIGHT * 9);
        //
        // // アップグレードボタン
        // canvas.fillStyle = MenuConfig.CONFIG_BUTTON_COLOR;
        // canvas.fillRect( MenuConfig.CONFIG_BUTTON_X, MenuConfig.CONFIG_BUTTON_Y, MenuConfig.CONFIG_BUTTON_WIDTH, MenuConfig.CONFIG_BUTTON_HEIGHT )
        // canvas.fillStyle = MenuConfig.CONFIG_BUTTON_TEXT_COLOR;
        // canvas.font = MenuConfig.CONFIG_BUTTON_FONT;
        // canvas.fillText(
        //     '実行! (X)',
        //     MenuConfig.CONFIG_BUTTON_X + MenuConfig.CONFIG_BUTTON_TEXT_X,
        //     MenuConfig.CONFIG_BUTTON_Y + MenuConfig.CONFIG_BUTTON_TEXT_Y
        // );

    }
}
