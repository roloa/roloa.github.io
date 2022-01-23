
import {HudMenu} from './HudMenu.js'
import {TutorialData} from '../tutorial_data/TutorialData.js'

export class MenuTutorial {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(20,20,20)';
    static TITLE_FONT = 'bold 32px monospace'

    static LIST_X = 20;
    static LIST_Y = 60;
    static LIST_WIDTH = 300;
    static LIST_HEIGHT = 320;

    static LIST_TEXT_MARGIN_LEFT = 32;
    static LIST_TEXT_MARGIN_TOP = 12;
    static LIST_TEXT_FONT = 'bold 20px monospace';
    static LIST_TEXT_COLOR = 'rgb(240,240,240)';
    static LIST_TEXT_COLOR_DISABLE = 'rgb(100,100,100)'
    static LIST_TEXT_HEIGHT = 30;

    static LIST_CURSOR_COLOR = 'rgb(20,20,150)';
    static LIST_CURSOR_ADJUST = -6;

    static DESC_TEXT_X = 360;
    static DESC_TEXT_Y = 80;
    static DESC_TEXT_FONT = 'bold 18px monospace';
    static DESC_TEXT_COLOR = 'rgb(20,20,20)';
    static DESC_TEXT_COLOR_GREEN = 'rgb(20,200,20)';
    static DESC_TEXT_COLOR_RED = 'rgb(200,20,20)';
    static DESC_TEXT_HEIGHT = 28;

    static REWORD_TEXT_X = 330;
    static REWORD_TEXT_Y = 300;
    static REWORD_ICON_X = 420;
    static REWORD_NAME_X = 470;

    static CONFIG_BUTTON_X = 400;
    static CONFIG_BUTTON_Y = 330;
    static CONFIG_BUTTON_HEIGHT = 50;
    static CONFIG_BUTTON_WIDTH =  200;
    static CONFIG_BUTTON_COLOR = 'rgb(160,160,160)';
    static CONFIG_BUTTON_TEXT_COLOR = 'rgb(20,20,20)';
    static CONFIG_BUTTON_TEXT_COLOR_DISABLE = 'rgb(120,120,120)';
    static CONFIG_BUTTON_FONT = 'bold 24px monospace';
    static CONFIG_BUTTON_TEXT_Y = 12;
    static CONFIG_BUTTON_TEXT_X = 100;

    static ARROW_1_X = 30;
    static ARROW_2_X = 230;
    static DOWN_ARROW_INDEX = 9;


    constructor( game ){
        this.game = game;


        this.tutorial_data = new TutorialData( this.game );
        this.tutorial_list = this.game.tutorial_data.get_list();

        this.config_cursor = 0;
        this.config_scroll = -1;
        this.menu_icon = this.game.image_library.get_image( 'setsumeisyo_manual' );

        this.batsu_icon = this.game.image_library.get_image( 'batsu' );
        this.check_icon = this.game.image_library.get_image( 'check' );

        this.arrow_up_icon = this.game.image_library.get_image( 'arrow_up' );
        this.arrow_down_icon = this.game.image_library.get_image( 'arrow_down' );

        this.scroll_amount = 0;

    }

    get_menu_icon(){
        return this.menu_icon;
    }

    on_update(){

        if( this.game.input_controller.get_press_up() ){
            if( 2 < this.config_cursor ){
                this.config_cursor -= 1;
            } else if ( 0 <= this.scroll_amount ){
                this.scroll_amount -= 1;
            } else if( 0 < this.config_cursor){
                this.config_cursor -= 1;
            }
        }
        if( this.game.input_controller.get_press_down() ){
            if( this.config_cursor < MenuTutorial.DOWN_ARROW_INDEX - 2){
                this.config_cursor += 1;
            } else if ( this.scroll_amount + MenuTutorial.DOWN_ARROW_INDEX < this.tutorial_list.length ){
                this.scroll_amount += 1;
            } else if( this.config_cursor < MenuTutorial.DOWN_ARROW_INDEX - 1 ){
                this.config_cursor += 1;
            }
        }
        if( this.game.input_controller.get_wheel_up() ){
            if ( 0 <= this.scroll_amount ){
                this.scroll_amount -= 1;
            } else if( 1 < this.config_cursor){
                this.config_cursor -= 1;
            }
        }
        if( this.game.input_controller.get_wheel_down() ){
            if ( this.scroll_amount + MenuTutorial.DOWN_ARROW_INDEX < this.tutorial_list.length ){
                this.scroll_amount += 1;
            } else if( this.config_cursor < MenuTutorial.DOWN_ARROW_INDEX - 1 ){
                this.config_cursor += 1;
            }
        }

        if( this.game.input_controller.get_mouse_press() ){
            this.on_click(
                this.game.input_controller.mouse_x - HudMenu.MENU_MARGIN_LEFT,
                this.game.input_controller.mouse_y - HudMenu.MENU_MARGIN_TOP );
        }

    }
    on_click( mouse_x, mouse_y ){
        // リスト
        for( let i = 0 ; i <= MenuTutorial.DOWN_ARROW_INDEX ; i++ ){
            let frame_y = MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_CURSOR_ADJUST +
            MenuTutorial.LIST_TEXT_HEIGHT * i;
            if( MenuTutorial.LIST_X < mouse_x && mouse_x < MenuTutorial.LIST_X + MenuTutorial.LIST_WIDTH &&
                frame_y < mouse_y && mouse_y < frame_y + MenuTutorial.LIST_TEXT_HEIGHT
            ){
                // スクロール
                if( i == 0 ){
                    if ( 0 <= this.scroll_amount ){
                        this.scroll_amount -= 1;
                    } else if( 1 < this.config_cursor){
                        this.config_cursor -= 1;
                    }
                } else if( i == MenuTutorial.DOWN_ARROW_INDEX ) {
                    if ( this.scroll_amount + MenuTutorial.DOWN_ARROW_INDEX < this.tutorial_list.length ){
                        this.scroll_amount += 1;
                    } else if( this.config_cursor < MenuTutorial.DOWN_ARROW_INDEX - 1 ){
                        this.config_cursor += 1;
                    }
                } else {
                    // カーソル移動
                    if( i == this.config_cursor ){

                    } else {
                        this.config_cursor = i;
                    }
                }
            }
        }
        // 完了ボタン
        if( MenuTutorial.CONFIG_BUTTON_X < mouse_x && mouse_x < MenuTutorial.CONFIG_BUTTON_X + MenuTutorial.CONFIG_BUTTON_WIDTH &&
            MenuTutorial.CONFIG_BUTTON_Y < mouse_y && mouse_y < MenuTutorial.CONFIG_BUTTON_Y + MenuTutorial.CONFIG_BUTTON_HEIGHT ){
            if( this.check_can_get_reword( this.tutorial_list[ this.calc_cursor_in_scroll() ] )){
                this.tutorial_list[ this.calc_cursor_in_scroll() ].cleared = true;
                this.game.world.give_tool_item_player( this.tutorial_list[ this.calc_cursor_in_scroll() ].reword_tool_item );
            } else {

            }
        }
    }
    check_can_get_reword( tutorial_item ){
        // スクロールボタンはダメ
        if( this.config_cursor <= 0 || MenuTutorial.DOWN_ARROW_INDEX <= this.config_cursor){
            return false;
        }
        // クリア済み
        if( tutorial_item.cleared ){
            return false;
        }
        for( let check_item of tutorial_item.check_list ){
            if( check_item.is_need_check && !check_item.checked ){
                // 完了してない
                return false;
            }
        }
        return true;
    }
    calc_cursor_in_scroll(){
        return this.config_cursor + this.scroll_amount;
    }
    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuTutorial.TITLE_COLOR;
        canvas.font = MenuTutorial.TITLE_FONT
        canvas.fillText( 'チュートリアル Tutorial' ,
            MenuTutorial.TITLE_X ,MenuTutorial.TITLE_Y);

        canvas.textBaseline = 'top';

        // チュートリアル項目リスト
        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.fillRect( MenuTutorial.LIST_X, MenuTutorial.LIST_Y, MenuTutorial.LIST_WIDTH, MenuTutorial.LIST_HEIGHT　);
        for( let i = 0 ; i <= MenuTutorial.DOWN_ARROW_INDEX ; i++ ){
            // カーソル
            if( i == this.config_cursor ){
                canvas.fillStyle = MenuTutorial.LIST_CURSOR_COLOR;
                canvas.fillRect( MenuTutorial.LIST_X ,
                MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_CURSOR_ADJUST +
                MenuTutorial.LIST_TEXT_HEIGHT * i ,
                MenuTutorial.LIST_WIDTH, MenuTutorial.LIST_TEXT_HEIGHT );
            }
            if( this.tutorial_list[ i + this.scroll_amount ] && 0 < i && i < MenuTutorial.DOWN_ARROW_INDEX ){
                canvas.fillStyle = MenuTutorial.LIST_TEXT_COLOR;
                canvas.font = MenuTutorial.LIST_TEXT_FONT;
                canvas.fillText( this.tutorial_list[  i + this.scroll_amount  ].title ,
                    MenuTutorial.LIST_X + MenuTutorial.LIST_TEXT_MARGIN_LEFT,
                    MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_TEXT_HEIGHT * i);
                // 完了マーク
                if( this.tutorial_list[  i + this.scroll_amount  ].cleared ){
                    canvas.drawImage( this.check_icon,
                        MenuTutorial.LIST_X, MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_TEXT_HEIGHT * i
                        - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
                        MenuTutorial.LIST_TEXT_HEIGHT, MenuTutorial.LIST_TEXT_HEIGHT );
                } else {
                    // canvas.drawImage( this.batsu_icon,
                    //     MenuTutorial.LIST_X, MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_TEXT_HEIGHT * i,
                    //     MenuTutorial.LIST_TEXT_HEIGHT, MenuTutorial.LIST_TEXT_HEIGHT );
                }
            }
        }

        // 内容リスト

        // スクロールについて
        canvas.font = MenuTutorial.DESC_TEXT_FONT;
        canvas.fillStyle = MenuTutorial.DESC_TEXT_COLOR;
        if ( this.config_cursor == 0 ){
            canvas.fillText( 'リストを上にスクロールします。',
            MenuTutorial.DESC_TEXT_X,
            MenuTutorial.DESC_TEXT_Y + MenuTutorial.LIST_TEXT_HEIGHT * (1) );
        } else if( this.config_cursor == MenuTutorial.DOWN_ARROW_INDEX){
            canvas.fillText( 'リストを下にスクロールします。' ,
            MenuTutorial.DESC_TEXT_X,
            MenuTutorial.DESC_TEXT_Y + MenuTutorial.LIST_TEXT_HEIGHT * (1) );
        } else {
            // タイトル
            canvas.fillStyle = MenuTutorial.DESC_TEXT_COLOR;
            canvas.fillText( this.tutorial_list[ this.calc_cursor_in_scroll() ].title ,
            MenuTutorial.DESC_TEXT_X,
            MenuTutorial.DESC_TEXT_Y - 10);

            for( let row = 0 ; row < this.tutorial_list[ this.calc_cursor_in_scroll() ].check_list.length ; row++ ){
                // 説明
                canvas.fillText( this.tutorial_list[ this.calc_cursor_in_scroll() ].check_list[ row ].description ,
                MenuTutorial.DESC_TEXT_X,
                MenuTutorial.DESC_TEXT_Y + MenuTutorial.LIST_TEXT_HEIGHT * (row + 1) );

                // チェックマーク
                if( this.tutorial_list[ this.calc_cursor_in_scroll() ].check_list[ row ].is_need_check ){
                    if( this.tutorial_list[ this.calc_cursor_in_scroll() ].check_list[ row ].checked ){
                        canvas.drawImage( this.check_icon ,
                        MenuTutorial.DESC_TEXT_X - MenuTutorial.LIST_TEXT_HEIGHT,
                        MenuTutorial.DESC_TEXT_Y + MenuTutorial.LIST_TEXT_HEIGHT * (row + 1) - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
                        MenuTutorial.LIST_TEXT_HEIGHT,  MenuTutorial.LIST_TEXT_HEIGHT );
                    } else {
                        canvas.drawImage( this.batsu_icon ,
                        MenuTutorial.DESC_TEXT_X - MenuTutorial.LIST_TEXT_HEIGHT,
                        MenuTutorial.DESC_TEXT_Y + MenuTutorial.LIST_TEXT_HEIGHT * (row + 1) - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
                        MenuTutorial.LIST_TEXT_HEIGHT,  MenuTutorial.LIST_TEXT_HEIGHT );
                    }
                }
            }
            // 達成報酬
            canvas.fillText(
                '完了報酬: ',
                MenuTutorial.REWORD_TEXT_X,
                MenuTutorial.REWORD_TEXT_Y );
            canvas.drawImage(
                this.tutorial_list[ this.calc_cursor_in_scroll() ].reword_tool_item.get_image(),
                MenuTutorial.REWORD_ICON_X,
                MenuTutorial.REWORD_TEXT_Y - 16,
                32,32
            );
            canvas.fillText(
                this.tutorial_list[ this.calc_cursor_in_scroll() ].reword_tool_item.get_name(),
                MenuTutorial.REWORD_NAME_X,
                MenuTutorial.REWORD_TEXT_Y );
        }
        // スクロール用矢印
        canvas.drawImage( this.arrow_up_icon ,
            MenuTutorial.LIST_X + MenuTutorial.ARROW_1_X,
            MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_TEXT_HEIGHT * 0
            - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
            MenuTutorial.LIST_TEXT_HEIGHT, MenuTutorial.LIST_TEXT_HEIGHT
        );
        canvas.drawImage( this.arrow_up_icon ,
            MenuTutorial.LIST_X + MenuTutorial.ARROW_2_X,
            MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_TEXT_HEIGHT * 0
            - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
            MenuTutorial.LIST_TEXT_HEIGHT, MenuTutorial.LIST_TEXT_HEIGHT
        );
        canvas.drawImage( this.arrow_down_icon ,
            MenuTutorial.LIST_X + MenuTutorial.ARROW_1_X,
            MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_TEXT_HEIGHT * MenuTutorial.DOWN_ARROW_INDEX
            - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
            MenuTutorial.LIST_TEXT_HEIGHT, MenuTutorial.LIST_TEXT_HEIGHT
        );
        canvas.drawImage( this.arrow_down_icon ,
            MenuTutorial.LIST_X + MenuTutorial.ARROW_2_X,
            MenuTutorial.LIST_Y + MenuTutorial.LIST_TEXT_MARGIN_TOP + MenuTutorial.LIST_TEXT_HEIGHT * MenuTutorial.DOWN_ARROW_INDEX
            - MenuTutorial.LIST_TEXT_HEIGHT * 0.25,
            MenuTutorial.LIST_TEXT_HEIGHT, MenuTutorial.LIST_TEXT_HEIGHT
        );


        // アップグレードボタン
        canvas.fillStyle = MenuTutorial.CONFIG_BUTTON_COLOR;
        canvas.fillRect( MenuTutorial.CONFIG_BUTTON_X, MenuTutorial.CONFIG_BUTTON_Y, MenuTutorial.CONFIG_BUTTON_WIDTH, MenuTutorial.CONFIG_BUTTON_HEIGHT )
        canvas.fillStyle = MenuTutorial.CONFIG_BUTTON_TEXT_COLOR;
        canvas.font = MenuTutorial.CONFIG_BUTTON_FONT;
        canvas.textAlign = 'center';
        if( !this.check_can_get_reword( this.tutorial_list[ this.calc_cursor_in_scroll() ] ) ){
            canvas.fillStyle = MenuTutorial.CONFIG_BUTTON_TEXT_COLOR_DISABLE;
        }
        canvas.fillText(
            '完了! (Enter)',
            MenuTutorial.CONFIG_BUTTON_X + MenuTutorial.CONFIG_BUTTON_TEXT_X,
            MenuTutorial.CONFIG_BUTTON_Y + MenuTutorial.CONFIG_BUTTON_TEXT_Y
        );

    }
}
