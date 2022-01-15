
import {HudMenu} from './HudMenu.js'
import {TutorialData} from './TutorialData.js'

export class MenuTutorial {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(20,20,20)';
    static TITLE_FONT = 'bold 32px monospace'

    static LIST_X = 20;
    static LIST_Y = 60;
    static LIST_WIDTH = 300;
    static LIST_HEIGHT = 320;

    static LIST_TEXT_MARGIN_LEFT = 24;
    static LIST_TEXT_MARGIN_TOP = 12;
    static LIST_TEXT_FONT = 'bold 20px monospace';
    static LIST_TEXT_COLOR = 'rgb(240,240,240)';
    static LIST_TEXT_COLOR_DISABLE = 'rgb(100,100,100)'
    static LIST_TEXT_HEIGHT = 30;

    static LIST_CURSOR_COLOR = 'rgb(20,150,20)';
    static LIST_CURSOR_ADJUST = -6;

    static DESC_TEXT_X = 380;
    static DESC_TEXT_Y = 100;
    static DESC_TEXT_FONT = 'bold 18px monospace';
    static DESC_TEXT_COLOR = 'rgb(20,20,20)';
    static DESC_TEXT_COLOR_GREEN = 'rgb(20,200,20)';
    static DESC_TEXT_COLOR_RED = 'rgb(200,20,20)';
    static DESC_TEXT_HEIGHT = 28;

    static REWORD_TEXT_X = 330;
    static REWORD_TEXT_Y = 280;
    static REWORD_ICON_X = 420;
    static REWORD_NAME_X = 480;

    static CONFIG_BUTTON_X = 400;
    static CONFIG_BUTTON_Y = 330;
    static CONFIG_BUTTON_HEIGHT = 50;
    static CONFIG_BUTTON_WIDTH =  200;
    static CONFIG_BUTTON_COLOR = 'rgb(160,160,160)';
    static CONFIG_BUTTON_TEXT_COLOR = 'rgb(20,20,20)';
    static CONFIG_BUTTON_FONT = 'bold 24px monospace';
    static CONFIG_BUTTON_TEXT_Y = 12;
    static CONFIG_BUTTON_TEXT_X = 100;




    constructor( game ){
        this.game = game;


        this.tutorial_data = new TutorialData( this.game );
        this.tutorial_list = this.tutorial_data.get_list();

        this.config_cursor = 0;
        this.config_scroll = 0;
        this.menu_icon = this.game.image_library.get_image( 'setsumeisyo_manual' );

        this.batsu_icon = this.game.image_library.get_image( 'batsu' );
        this.check_icon = this.game.image_library.get_image( 'check' );

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
            if( this.config_cursor < this.tutorial_list.length - 1){
                this.config_cursor += 1;
            }
        }
        if( this.game.input_controller.get_press_enter() || this.game.input_controller.get_press_space() ){
            // エンターキー
        }

        if( this.game.input_controller.get_mouse_press() ){
            this.on_click(
                this.game.input_controller.mouse_x - HudMenu.MENU_MARGIN_LEFT,
                this.game.input_controller.mouse_y - HudMenu.MENU_MARGIN_TOP );
        }
    }
    on_click( mouse_x, mouse_y ){
        for( let i = 0 ; i < this.tutorial_list.length ; i++ ){
            let frame_y = MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_CURSOR_ADJUST +
            MenuTutorial.LIST_TEXT_HEIGHT * i;
            if( MenuTutorial.LIST_X < mouse_x && mouse_x < MenuTutorial.LIST_X + MenuTutorial.LIST_WIDTH &&
                frame_y < mouse_y && mouse_y < frame_y + MenuTutorial.LIST_TEXT_HEIGHT
            ){
                if( i == this.config_cursor ){

                } else {
                    this.config_cursor = i;
                }
            }
        }
    }
    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuTutorial.TITLE_COLOR;
        canvas.font = MenuTutorial.TITLE_FONT
        canvas.fillText( 'チュートリアル Tutorial' ,
            MenuTutorial.TITLE_X ,MenuTutorial.TITLE_Y);

        canvas.textBaseline = 'top';

        // アプグレリスト
        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.fillRect( MenuTutorial.LIST_X, MenuTutorial.LIST_Y, MenuTutorial.LIST_WIDTH, MenuTutorial.LIST_HEIGHT　);
        for( let i = 0 ; i < this.tutorial_list.length ; i++ ){
            // カーソル
            if( i == this.config_cursor ){
                canvas.fillStyle = MenuTutorial.LIST_CURSOR_COLOR;
                canvas.fillRect( MenuTutorial.LIST_X ,
                MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_CURSOR_ADJUST +
                MenuTutorial.LIST_TEXT_HEIGHT * i ,
                MenuTutorial.LIST_WIDTH, MenuTutorial.LIST_TEXT_HEIGHT );
            }
            if( this.tutorial_list[ i ] ){
                canvas.fillStyle = MenuTutorial.LIST_TEXT_COLOR;
                canvas.font = MenuTutorial.LIST_TEXT_FONT;
                canvas.fillText( this.tutorial_list[ i ].title ,
                    MenuTutorial.LIST_X + MenuTutorial.LIST_TEXT_MARGIN_LEFT,
                    MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_TEXT_HEIGHT * i);

            }
        }
        // タイトル
        canvas.fillStyle = MenuTutorial.DESC_TEXT_COLOR;
        canvas.fillText( this.tutorial_list[ this.config_cursor ].title ,
        MenuTutorial.DESC_TEXT_X,
        MenuTutorial.DESC_TEXT_Y );

        // 内容リスト
        canvas.font = MenuTutorial.DESC_TEXT_FONT;
        for( let row = 0 ; row < this.tutorial_list[ this.config_cursor ].check_list.length ; row++ ){
            // 説明
            canvas.fillStyle = MenuTutorial.DESC_TEXT_COLOR;
            canvas.fillText( this.tutorial_list[ this.config_cursor ].check_list[ row ].description ,
            MenuTutorial.DESC_TEXT_X,
            MenuTutorial.DESC_TEXT_Y + MenuTutorial.LIST_TEXT_HEIGHT * (row + 1) );

            // チェックマーク
            if( this.tutorial_list[ this.config_cursor ].check_list[ row ].is_need_check ){
                if( this.tutorial_list[ this.config_cursor ].check_list[ row ].checked ){
                    canvas.drawImage( this.check_icon ,
                    MenuTutorial.DESC_TEXT_X - MenuTutorial.LIST_TEXT_HEIGHT,
                    MenuTutorial.DESC_TEXT_Y + MenuTutorial.LIST_TEXT_HEIGHT * (row + 1) - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
                    MenuTutorial.LIST_TEXT_HEIGHT,  MenuTutorial.LIST_TEXT_HEIGHT );
                } else {
                    canvas.drawImage( this.check_icon ,
                    MenuTutorial.DESC_TEXT_X - MenuTutorial.LIST_TEXT_HEIGHT,
                    MenuTutorial.DESC_TEXT_Y + MenuTutorial.LIST_TEXT_HEIGHT * (row + 1) - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
                    MenuTutorial.LIST_TEXT_HEIGHT,  MenuTutorial.LIST_TEXT_HEIGHT );
                }
            }
        }
        // 達成報酬
        canvas.fillText(
            '達成報酬: ',
            MenuTutorial.REWORD_TEXT_X,
            MenuTutorial.REWORD_TEXT_Y );
        canvas.drawImage(
            this.tutorial_list[ this.config_cursor ].reword_tool_item.get_image(),
            MenuTutorial.REWORD_ICON_X,
            MenuTutorial.REWORD_TEXT_Y - 16,
            32,32
        );


        canvas.fillText(
            this.tutorial_list[ this.config_cursor ].reword_tool_item.get_name(),
            MenuTutorial.REWORD_NAME_X,
            MenuTutorial.REWORD_TEXT_Y );


        // アップグレードボタン
        canvas.fillStyle = MenuTutorial.CONFIG_BUTTON_COLOR;
        canvas.fillRect( MenuTutorial.CONFIG_BUTTON_X, MenuTutorial.CONFIG_BUTTON_Y, MenuTutorial.CONFIG_BUTTON_WIDTH, MenuTutorial.CONFIG_BUTTON_HEIGHT )
        canvas.fillStyle = MenuTutorial.CONFIG_BUTTON_TEXT_COLOR;
        canvas.font = MenuTutorial.CONFIG_BUTTON_FONT;
        canvas.textAlign = 'center';
        canvas.fillText(
            '完了! (Enter)',
            MenuTutorial.CONFIG_BUTTON_X + MenuTutorial.CONFIG_BUTTON_TEXT_X,
            MenuTutorial.CONFIG_BUTTON_Y + MenuTutorial.CONFIG_BUTTON_TEXT_Y
        );

    }
}
