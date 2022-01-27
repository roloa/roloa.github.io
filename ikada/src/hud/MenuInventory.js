
import {HudMenu} from './HudMenu.js';

export class MenuInventory {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(40,30,20)';
    static TITLE_FONT = 'bold 32px monospace'

    static LIST_X = 20;
    static LIST_Y = 80;
    static LIST_ICON_SIZE = 50;
    static LIST_SPACING = 10;
    static LIST_X_COUNT = 5;
    static LIST_Y_COUNT = 4;
    static LIST_ICON_FRAME_COLOR = 'rgb(40,30,20)';
    static LIST_ICON_FRAME_COLOR_SELECTED = 'rgb(200,20,20)';

    static TRASH_X = 560;
    static TRASH_Y = 20;

    constructor( game ){
        this.game = game;

        this.cursor_index = 0;

        this.menu_icon = this.game.image_library.get_image( 'kaizoku_takarabako' );

        this.mouse_holding_index = -1;
        this.trashed_item = null;
        this.trash_icon = this.game.image_library.get_image('gomi_poribaketsu_close')
    }
    get_menu_icon(){
        return this.menu_icon;
    }
    on_update(){

        // カーソル操作
        // TODO 範囲外
        if( this.game.input_controller.get_press_right() ){
            this.cursor_index += 1;
        }
        if( this.game.input_controller.get_press_left() ){
            this.cursor_index -= 1;
        }
        if( this.game.input_controller.get_press_up() ){
            if( MenuInventory.LIST_X_COUNT < this.cursor_index ){
                this.cursor_index -= MenuInventory.LIST_X_COUNT;
            }
        }
        if( this.game.input_controller.get_press_down() ){
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
        if( this.game.input_controller.get_press_enter() || this.game.input_controller.get_press_space() ){
            this.mouse_holding_index = -1;
            this.swap_item_slot( this.game.hud.item_slot.item_slot_cursor )
        }

        // マウスクリック
        if( this.game.input_controller.get_mouse_press() ){
            let m_x = this.game.input_controller.mouse_x - HudMenu.MENU_MARGIN_LEFT;
            let m_y = this.game.input_controller.mouse_y - HudMenu.MENU_MARGIN_TOP;

            for( let i = 0 ; i < this.game.inventory.item_inventory_size ; i++ ){
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
            // ゴミ箱
            if( MenuInventory.TRASH_X < m_x && m_x < MenuInventory.TRASH_X + MenuInventory.LIST_ICON_SIZE &&
                MenuInventory.TRASH_Y < m_y && m_y < MenuInventory.TRASH_Y + MenuInventory.LIST_ICON_SIZE
            ){

                if ( this.mouse_holding_index < 0){
                    // アイテムを持ってない場合
                    if( this.game.hud.item_slot.is_mouse_holding ){
                        // アイテムスロットがアイテムを持っている場合
                        // それをゴミ箱に入れる
                        this.trashed_item = this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ];
                        this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ] = null;
                        this.game.hud.item_slot.is_mouse_holding = false;
                    } else {
                        // ゴミ箱のアイテムをアイテムスロットに送ろうとする
                        if( this.trashed_item != null ){
                            if ( this.game.hud.item_slot.put_pickup_item( this.trashed_item, true ) ){
                                this.trashed_item = null;
                            } else {
                                this.game.log('アイテムスロットに空きを作ってください。');
                            }
                        } else {
                            // 空のゴミ箱をクリックした
                            this.game.log('それはゴミ箱スロットです。')
                            this.game.log('いらないアイテムを置いて消去できます。')
                            this.game.log('間違ったものを捨てた場合、次のゴミを捨てるまでは、')
                            this.game.log('クリックすることで取り戻せます。')
                        }
                    }
                } else {
                    // アイテムを持っている場合、ゴミ箱に入れる
                    this.trashed_item = this.game.inventory.tool_item_inventory[ this.mouse_holding_index ];
                    this.game.inventory.tool_item_inventory[ this.mouse_holding_index ] = null;
                    this.mouse_holding_index = -1;
                }
                // 即消しの草案？
                // if( 0 <= this.mouse_holding_index ){
                //     this.game.inventory.tool_item_inventory[ this.mouse_holding_index ] = null;
                // }
                // if( this.game.hud.item_slot.is_mouse_holding ){
                //     this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ] = null;
                // }
            }
        }
    }

    click_inventory( index ){
        if ( this.mouse_holding_index < 0){
            // アイテムを持ってない場合
            if( this.game.hud.item_slot.is_mouse_holding ){
                // アイテムスロットがアイテムを持っている場合
                if( this.game.inventory.tool_item_inventory[ index ] &&
                    this.game.inventory.tool_item_inventory[ index ].try_stack_marge( this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ] ) ) {
                    // スタックできた
                    this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ] = null;
                } else {
                    // アイテムスロットとカーソル位置のアイテムを入れ替える
                    let swap = this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ];
                    this.game.hud.item_slot.item_slot[ this.game.hud.item_slot.item_slot_cursor ] = this.game.inventory.tool_item_inventory[ index ];
                    this.game.inventory.tool_item_inventory[ index ] = swap;
                }
                // アイテムスロットのつかみ状態を解除
                this.game.hud.item_slot.is_mouse_holding = false;
            } else {
                // カーソルのアイテムを拾い上げる
                if( this.game.inventory.tool_item_inventory[ index ] != null ){
                    this.mouse_holding_index = index;
                }
            }
        } else {
            if( this.game.inventory.tool_item_inventory[ index ] &&
                this.game.inventory.tool_item_inventory[ index ].try_stack_marge( this.game.inventory.tool_item_inventory[ this.mouse_holding_index ] ) ) {
                // スタックできた
                this.game.inventory.tool_item_inventory[ this.mouse_holding_index ] = null;
            } else {
                // アイテムを入れ替える
                let swap = this.game.inventory.tool_item_inventory[ index ];
                this.game.inventory.tool_item_inventory[ index ] = this.game.inventory.tool_item_inventory[ this.mouse_holding_index ];
                this.game.inventory.tool_item_inventory[ this.mouse_holding_index ] = swap;
            }
            // つかみ状態解除
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
        for( let i = 0 ; i < this.game.inventory.item_inventory_size ; i++ ){
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
                        this.game.inventory.tool_item_inventory[ i ].draw_item(
                        canvas,
                        frame_x, frame_y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );
                    }
                }
            }
            canvas.strokeRect( frame_x, frame_y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );


        }

        // ゴミ箱
        if( this.trashed_item != null ){
            this.trashed_item.draw_item( canvas ,
            MenuInventory.TRASH_X, MenuInventory.TRASH_Y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE);
            canvas.font = 'bold 16px monospace';
            canvas.fillStyle = 'rgb(100,100,100)';
            canvas.fillText( this.trashed_item.get_subtitle(),
                MenuInventory.TRASH_X + 3,
                MenuInventory.TRASH_Y + MenuInventory.LIST_ICON_SIZE - 3);
        } else {
            canvas.drawImage( this.trash_icon,
            MenuInventory.TRASH_X, MenuInventory.TRASH_Y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE);

        }
        canvas.strokeRect( MenuInventory.TRASH_X, MenuInventory.TRASH_Y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );

        // マウスでつかんでいるアイテム
        if( 0 <= this.mouse_holding_index ){
            this.game.inventory.tool_item_inventory[ this.mouse_holding_index ].draw_item(
            canvas ,
            this.game.input_controller.mouse_x - HudMenu.MENU_MARGIN_LEFT,
            this.game.input_controller.mouse_y - HudMenu.MENU_MARGIN_TOP,
            MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );
        }

    }
}
