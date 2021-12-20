
import {HudMenu} from './HudMenu.js';

export class MenuInventory {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(20,20,20)';
    static TITLE_FONT = 'bold 32px monospace'

    static LIST_X = 20;
    static LIST_Y = 60;
    static LIST_ICON_SIZE = 50;
    static LIST_SPACING = 10;
    static LIST_X_COUNT = 10;
    static LIST_Y_COUNT = 4;
    static LIST_ICON_FRAME_COLOR = 'rgb(20,20,20)';
    static LIST_ICON_FRAME_COLOR_SELECTED = 'rgb(200,20,20)';


    constructor( game ){
        this.game = game;

        this.cursor_index = 0;

        this.menu_icon = this.game.image_library.get_image( 'kaizoku_takarabako' );

        this.mouse_holding_index = -1;
    }
    get_menu_icon(){
        return this.menu_icon;
    }
    on_update(){

        // カーソル操作
        // TODO 範囲外
        if( this.game.input_controller.is_pressed_key['KeyD'] ){
            this.cursor_index += 1;
        }
        if( this.game.input_controller.is_pressed_key['KeyA'] ){
            this.cursor_index -= 1;
        }
        if( this.game.input_controller.is_pressed_key['KeyW'] ){
            if( MenuInventory.LIST_X_COUNT < this.cursor_index ){
                this.cursor_index -= MenuInventory.LIST_X_COUNT;
            }
        }
        if( this.game.input_controller.is_pressed_key['KeyS'] ){
            if( MenuInventory.LIST_X_COUNT + this.cursor_index < 25  ){
                this.cursor_index += MenuInventory.LIST_X_COUNT;
            }
        }

        // 1-9の数字キーで対応するアイテムスロットと中身を入れ替える
        if( this.game.input_controller.is_pressed_key['Digit1'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(0)
        }
        if( this.game.input_controller.is_pressed_key['Digit2'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(1)
        }
        if( this.game.input_controller.is_pressed_key['Digit3'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(2)
        }
        if( this.game.input_controller.is_pressed_key['Digit4'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(3)
        }
        if( this.game.input_controller.is_pressed_key['Digit5'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(4)
        }
        if( this.game.input_controller.is_pressed_key['Digit6'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(5)
        }
        if( this.game.input_controller.is_pressed_key['Digit7'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(6)
        }
        if( this.game.input_controller.is_pressed_key['Digit8'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(7)
        }
        if( this.game.input_controller.is_pressed_key['Digit9'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot(8)
        }
        if( this.game.input_controller.is_pressed_key['Enter'] || this.game.input_controller.is_pressed_key['Space'] ){
            this.mouse_holding_index = -1;
            this.swap_item_slot( this.game.hud.item_slot.item_slot_cursor )
        }

        // マウスクリック
        if( this.game.input_controller.is_mouse_press ){
            let m_x = this.game.input_controller.mouse_x - HudMenu.MENU_MARGIN_LEFT;
            let m_y = this.game.input_controller.mouse_y - HudMenu.MENU_MARGIN_TOP;

            for( let i = 0 ; i < 25 ; i++ ){
                let x = i % MenuInventory.LIST_X_COUNT;
                let y = Math.floor( i / MenuInventory.LIST_X_COUNT);
                let frame_x = MenuInventory.LIST_X + x * (MenuInventory.LIST_ICON_SIZE + MenuInventory.LIST_SPACING);
                let frame_y = MenuInventory.LIST_Y + y * (MenuInventory.LIST_ICON_SIZE + MenuInventory.LIST_SPACING);
                if( frame_x < m_x && m_x < frame_x + MenuInventory.LIST_ICON_SIZE &&
                    frame_y < m_y && m_y < frame_y + MenuInventory.LIST_ICON_SIZE ){
                        //this.game.log(i);
                        this.click_inventory( i );
                        break;
                }
            }
        }
    }

    click_inventory( index ){
        if ( this.mouse_holding_index < 0){
            // アイテムを持ってない場合
            if( this.game.hud.item_slot.is_mouse_holding ){
                // アイテムスロットがアイテムを持っている場合
                // アイテムスロットとカーソル位置のアイテムを入れ替える
                let swap = this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ];
                this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ] = this.game.inventory.tool_item_inventory[ index ];
                this.game.inventory.tool_item_inventory[ index ] = swap;
                this.game.hud.item_slot.is_mouse_holding = false;
            } else {
                // カーソルのアイテムを拾い上げる
                if( this.game.inventory.tool_item_inventory[ index ] != null ){
                    this.mouse_holding_index = index;
                }
            }
        } else {
            // アイテムを入れ替える
            let swap = this.game.inventory.tool_item_inventory[ index ];
            this.game.inventory.tool_item_inventory[ index ] = this.game.inventory.tool_item_inventory[ this.mouse_holding_index ];
            this.game.inventory.tool_item_inventory[ this.mouse_holding_index ] = swap;
            this.mouse_holding_index = -1;
        }
    }

    swap_item_slot( slot_no ){
        let swap = this.game.hud.item_slot.item_slot[ slot_no ];
        this.game.hud.item_slot.item_slot[ slot_no ] = this.game.inventory.tool_item_inventory[ this.cursor_index ];
        this.game.inventory.tool_item_inventory[ this.cursor_index ] = swap;
        this.game.hud.item_slot.refresh()
    }

    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuInventory.TITLE_COLOR;
        canvas.font = MenuInventory.TITLE_FONT
        canvas.fillText( 'インベントリ Inventory' ,
            MenuInventory.TITLE_X ,MenuInventory.TITLE_Y);

        // インベントリのアイテムリスト
        for( let i = 0 ; i < 25 ; i++ ){
            if( this.cursor_index == i ){
                canvas.strokeStyle = MenuInventory.LIST_ICON_FRAME_COLOR_SELECTED;
            } else {
                canvas.strokeStyle = MenuInventory.LIST_ICON_FRAME_COLOR;
            }
            let x = i % MenuInventory.LIST_X_COUNT;
            let y = Math.floor( i / MenuInventory.LIST_X_COUNT);
            let frame_x = MenuInventory.LIST_X + x * (MenuInventory.LIST_ICON_SIZE + MenuInventory.LIST_SPACING);
            let frame_y = MenuInventory.LIST_Y + y * (MenuInventory.LIST_ICON_SIZE + MenuInventory.LIST_SPACING);

            if( this.game.inventory.tool_item_inventory[ i ] != null ){
                if( this.game.inventory.tool_item_inventory[ i ].image ) {
                    if( i != this.mouse_holding_index ){
                        canvas.drawImage( this.game.inventory.tool_item_inventory[ i ].image ,
                        frame_x, frame_y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );
                    }
                }
            }
            canvas.strokeRect( frame_x, frame_y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );


        }
        // マウスでつかんでいるアイテム
        if( 0 <= this.mouse_holding_index ){
            canvas.drawImage( this.game.inventory.tool_item_inventory[ this.mouse_holding_index ].image ,
            this.game.input_controller.mouse_x - HudMenu.MENU_MARGIN_LEFT,
            this.game.input_controller.mouse_y - HudMenu.MENU_MARGIN_TOP,
            MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );
        }

    }
}
