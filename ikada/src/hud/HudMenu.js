
import {MenuUpgrade} from './MenuUpgrade.js'
import {MenuInventory} from './MenuInventory.js'
import {MenuCraft} from './MenuCraft.js'
import {MenuMaterial} from './MenuMaterial.js'
import {MenuConfig} from './MenuConfig.js'
import {MenuTutorial} from './MenuTutorial.js'



export class HudMenu {

    static MENU_WIDTH =  700;
    static MENU_HEIGHT = 400;
    static MENU_MARGIN_TOP =  100;
    static MENU_MARGIN_LEFT = 130;
    static MENU_ICON_SIZE = 70;
    static MENU_ICON_MARGIN_LEFT = 100;
    static MENU_ICON_MARGIN_TOP = 20;
    static MENU_ICON_SPACING = 10;

    constructor( game ){
        this.game = game
        this.is_menu_open = false;
        this.is_menu_open_keep_press = false;

        this.menu_list = []
        this.menu_inventory = new MenuInventory( game )
        this.menu_list[0] = new MenuTutorial( game );
        this.menu_list[1] = this.menu_inventory;
        this.menu_list[2] = new MenuCraft( game )
        this.menu_list[3] = new MenuMaterial( game )
        this.menu_list[4] = new MenuConfig( game )
        this.menu_count = 5;

        this.menu_list_cursor = 0

        this.menu_open_icon = this.game.image_library.get_image('menu');
        this.menu_close_icon = this.game.image_library.get_image('batsu');

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

            // メニューの操作
            if( this.menu_list[ this.menu_list_cursor ] ) {
                this.menu_list[ this.menu_list_cursor ].on_update();
            }

            // マウス操作
            if( this.game.input_controller.get_mouse_press() ){
                if( this.game.input_controller.get_mouse_press() ){
                    // 閉じるボタン
                    if ( this.hittest_menu_open_button( this.game.input_controller.mouse_x, this.game.input_controller.mouse_y ) ){
                        this.is_menu_open = false;
                        this.game.sound_library.play_sound('513/kick/C5');
                    }
                    for( let i = 0 ; i < this.menu_list.length ; i++){
                        if( this.hittest_menu_tabs( i, this.game.input_controller.mouse_x, this.game.input_controller.mouse_y ) ){
                            this.menu_list_cursor = i;
                            break;
                        }
                    }
                }
            }
        } else {
            // メニューが閉じている時
            if( this.game.input_controller.get_press_tab() ){
                // タブキーでメニューを開く
                this.open_menu();
                this.game.sound_library.play_sound('513/tom/G3');
            }
            // マウス操作
            if( this.game.input_controller.get_mouse_press() ){
                if ( this.hittest_menu_open_button( this.game.input_controller.mouse_x, this.game.input_controller.mouse_y ) ){
                    this.open_menu();
                    this.game.sound_library.play_sound('513/tom/G3');
                }
            }
        }

        // プレイヤーが海に落下したらメニューを閉じる
        if( this.game.world.player.is_in_ship() == false) {
            this.is_menu_open = false;
        }
    }
    open_menu(){
        if( this.game.world.player.is_in_ship() || this.game.input_controller.is_down_key['KeyG']){
            this.is_menu_open = true;
        } else {
            this.game.log('メニューは舟の上でのみ開けます。');
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
        canvas.drawImage( this.menu_open_icon,
            HudMenu.MENU_ICON_MARGIN_LEFT - (HudMenu.MENU_ICON_SIZE + HudMenu.MENU_ICON_SPACING),
            HudMenu.MENU_ICON_MARGIN_TOP,
            HudMenu.MENU_ICON_SIZE,
            HudMenu.MENU_ICON_SIZE );
        canvas.fillText( '[Tab]: メニュー',
            HudMenu.MENU_ICON_MARGIN_LEFT - (HudMenu.MENU_ICON_SIZE + HudMenu.MENU_ICON_SPACING),
            HudMenu.MENU_ICON_MARGIN_TOP + HudMenu.MENU_ICON_SIZE + 20)

        if( this.is_menu_open ){

            // メニューの画面
            canvas.save()
            canvas.translate( HudMenu.MENU_MARGIN_LEFT, HudMenu.MENU_MARGIN_TOP )
            canvas.fillStyle = 'rgb(210,205,200)';
            canvas.fillRect( 0, 0, HudMenu.MENU_WIDTH, HudMenu.MENU_HEIGHT );
            canvas.strokeStyle = 'rgb(100,90,70)';
            canvas.lineWidth = 2;
            canvas.strokeRect( 0, 0, HudMenu.MENU_WIDTH, HudMenu.MENU_HEIGHT );

            if( this.menu_list[ this.menu_list_cursor ] ) {
                this.menu_list[ this.menu_list_cursor ].on_draw( canvas );
            }

            canvas.restore()

            // 閉じるボタン
            canvas.drawImage( this.menu_close_icon,
                HudMenu.MENU_ICON_MARGIN_LEFT - (HudMenu.MENU_ICON_SIZE + HudMenu.MENU_ICON_SPACING),
                HudMenu.MENU_ICON_MARGIN_TOP,
                HudMenu.MENU_ICON_SIZE,
                HudMenu.MENU_ICON_SIZE );


            // メニューのアイコン
            for( let i = 0 ; i < this.menu_list.length ; i++ ){
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
