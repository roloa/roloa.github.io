
import {MenuUpgrade} from './menu_upgrade.js'


export class HudMenu {

    static MENU_WIDTH =  700;
    static MENU_HEIGHT = 400;
    static MENU_MARGIN_TOP =  100;
    static MENU_MARGIN_LEFT = 130;
    static MENU_ICON_SIZE = 50;
    static MENU_ICON_MARGIN_LEFT = 130;
    static MENU_ICON_MARGIN_TOP = 25;
    static MENU_ICON_SPACING = 10;

    constructor( game ){
        this.game = game
        this.is_menu_open = false;
        this.is_menu_open_keep_press = false;

        this.menu_list = []
        this.menu_list[0] = new MenuUpgrade( game )

        this.menu_list_cursor = 0

    }
    on_update(){

        if( this.is_menu_open ){
            // メニューが開いている時
            if( this.game.input_controller.is_pressed_key['KeyZ'] ){
                    this.is_menu_open = false;
            }
            if( this.game.input_controller.is_pressed_key['KeyQ'] ){
                if( -1 < this.menu_list_cursor ){
                    this.menu_list_cursor -= 1;
                }
            }
            if( this.game.input_controller.is_pressed_key['KeyE'] ){
                if( this.menu_list_cursor < 4 ){
                    this.menu_list_cursor += 1;
                }
            }
        } else {
            // メニューが閉じている時
            if( this.game.input_controller.is_pressed_key['KeyZ'] ){
                    this.is_menu_open = true;
            }
        }


    }
    on_draw( canvas ){

        if( this.is_menu_open ){

            // メニューの画面
            canvas.save()
            canvas.translate( HudMenu.MENU_MARGIN_LEFT, HudMenu.MENU_MARGIN_TOP )
            canvas.fillStyle = 'rgb(200,200,200)';
            canvas.fillRect( 0, 0, HudMenu.MENU_WIDTH, HudMenu.MENU_HEIGHT );

            if( this.menu_list[ this.menu_list_cursor ] ) {
                this.menu_list[ this.menu_list_cursor ].on_draw( canvas );
            }

            canvas.restore()
            // 閉じるボタン

            if( this.menu_list_cursor == -1 ){
                canvas.strokeStyle = 'rgb(250,0,0)';
            } else {
                canvas.strokeStyle = 'rgb(200,200,200)';
            }
            canvas.strokeRect(
                HudMenu.MENU_ICON_MARGIN_LEFT - (HudMenu.MENU_ICON_SIZE + HudMenu.MENU_ICON_SPACING),
                HudMenu.MENU_ICON_MARGIN_TOP,
                HudMenu.MENU_ICON_SIZE,
                HudMenu.MENU_ICON_SIZE );

            // メニューのアイコン
            for( let i = 0 ; i < 4 ; i++ ){
                if( i == this.menu_list_cursor ){
                    canvas.strokeStyle = 'rgb(250,0,0)';
                } else {
                    canvas.strokeStyle = 'rgb(200,200,200)';
                }
                canvas.strokeRect(
                    HudMenu.MENU_ICON_MARGIN_LEFT + i * (HudMenu.MENU_ICON_SIZE + HudMenu.MENU_ICON_SPACING),
                    HudMenu.MENU_ICON_MARGIN_TOP,
                    HudMenu.MENU_ICON_SIZE,
                    HudMenu.MENU_ICON_SIZE );
            }
        }

    }
}