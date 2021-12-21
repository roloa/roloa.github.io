
import {MenuUpgrade} from './MenuUpgrade.js'
import {MenuInventory} from './MenuInventory.js'
import {MenuCraft} from './MenuCraft.js'
import {MenuMaterial} from './MenuMaterial.js'
import {MenuConfig} from './MenuConfig.js'


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
        this.menu_inventory = new MenuInventory( game )
        this.menu_list[0] = this.menu_inventory;
        this.menu_list[1] = new MenuCraft( game )
        this.menu_list[2] = new MenuMaterial( game )
        this.menu_list[3] = new MenuConfig( game )

        this.menu_list_cursor = 0

    }
    on_update(){

        if( this.is_menu_open ){
            // メニューが開いている時
            if( this.game.input_controller.get_press_tab() || this.game.input_controller.get_press_esc()){
                    this.is_menu_open = false;
            }
            if( this.game.input_controller.is_pressed_key['KeyQ'] ){
                if( -1 < this.menu_list_cursor ){
                    this.menu_list_cursor -= 1;
                }
            }
            if( this.game.input_controller.is_pressed_key['KeyE'] ){
                if( this.menu_list_cursor < this.menu_list.length - 1 ){
                    this.menu_list_cursor += 1;
                }
            }
            // マウス操作
            if( this.game.input_controller.is_mouse_press ){
                if( this.game.input_controller.is_mouse_press ){
                    // 閉じるボタン
                    if ( this.hittest_menu_open_button( this.game.input_controller.mouse_x, this.game.input_controller.mouse_y ) ){
                        this.is_menu_open = false;
                    }
                    for( let i = 0 ; i < this.menu_list.length ; i++){
                        if( this.hittest_menu_tabs( i, this.game.input_controller.mouse_x, this.game.input_controller.mouse_y ) ){
                            this.menu_list_cursor = i;
                            break;
                        }
                    }
                }
            }
            // メニューの操作
            if( this.menu_list[ this.menu_list_cursor ] ) {
                this.menu_list[ this.menu_list_cursor ].on_update();
            }
        } else {
            // メニューが閉じている時
            if( this.game.input_controller.get_press_tab() ){
                this.is_menu_open = true;
            }
            // マウス操作
            if( this.game.input_controller.is_mouse_press ){
                if ( this.hittest_menu_open_button( this.game.input_controller.mouse_x, this.game.input_controller.mouse_y ) ){
                    this.is_menu_open = true;
                }
            }
        }


    }
    hittest_menu_open_button( mouse_x, mouse_y ){
        let frame_x = HudMenu.MENU_ICON_MARGIN_LEFT - (HudMenu.MENU_ICON_SIZE + HudMenu.MENU_ICON_SPACING);
        return (
            frame_x < mouse_x && mouse_x < frame_x + HudMenu.MENU_ICON_SIZE &&
            HudMenu.MENU_ICON_MARGIN_TOP < mouse_y &&
            mouse_y < HudMenu.MENU_ICON_MARGIN_TOP + HudMenu.MENU_ICON_SIZE )
    }
    hittest_menu_tabs( index, mouse_x, mouse_y ){
        let frame_x = HudMenu.MENU_ICON_MARGIN_LEFT + index * (HudMenu.MENU_ICON_SIZE + HudMenu.MENU_ICON_SPACING);
        return (
            frame_x < mouse_x && mouse_x < frame_x + HudMenu.MENU_ICON_SIZE &&
            HudMenu.MENU_ICON_MARGIN_TOP < mouse_y &&
            mouse_y < HudMenu.MENU_ICON_MARGIN_TOP + HudMenu.MENU_ICON_SIZE )
    }

    on_draw( canvas ){


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
                if( this.menu_list[ i ] != null ){
                    canvas.drawImage( this.menu_list[ i ].get_menu_icon(),
                        HudMenu.MENU_ICON_MARGIN_LEFT + i * (HudMenu.MENU_ICON_SIZE + HudMenu.MENU_ICON_SPACING),
                        HudMenu.MENU_ICON_MARGIN_TOP,
                        HudMenu.MENU_ICON_SIZE,
                        HudMenu.MENU_ICON_SIZE
                    );
                }
            }
        }

    }
}
