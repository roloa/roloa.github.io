
import {CatchNet} from '../tool_item/CatchNet.js';
import {FishKirimi} from '../tool_item/d_foods/FishKirimi.js';
import {FishRod} from '../tool_item/FishRod.js';
import {EquipmentItem} from '../tool_item/EquipmentItem.js';
import {Bow} from '../tool_item/Bow.js';

import {BuildBlock} from '../tool_item/BuildBlock.js';
import {VictoryRocket} from '../ship_block/VictoryRocket.js';


export class ItemSlot {

    static ITEM_SLOT_COUNT = 9;

    constructor( game ){
        this.game = game;

        this.itemslot_margin_bottom = 40;
        this.itemslot_size = 50;
        this.itemslot_spacing = 10;
        this.itemslot_count = 9;
        this.itemslot_start_x = 99;
        this.itemslot_start_y = 99;
        this.calc_itemslot_coodinate()


        this.item_slot = []
        this.is_equipped_slot = []
        for( let i = 0 ; i < ItemSlot.ITEM_SLOT_COUNT ; i++ ){
            this.item_slot[i] = null;
            this.is_equipped_slot[i] = false;
        }

        // this.item_slot[1] = new FishRod( this.game );
        // this.item_slot[2] = new BuildBlock( game ).set_ship_block( new VictoryRocket( game ));

        this.item_slot_cursor = 0;
        this.is_mouse_holding = false;
    }


    refresh(){
        // 装備アイテムの再適用などを行う

        this.game.world.player.clear_equip_status()
        for( let i = 0 ; i < ItemSlot.ITEM_SLOT_COUNT ; i++ ){
            if( this.item_slot[i] instanceof EquipmentItem ){
                let is_equip_success = this.game.world.player.equip_item( this.item_slot[i] );
                this.is_equipped_slot[i] = is_equip_success;
            } else {
                this.is_equipped_slot[i] = false;
            }
        }
    }

    activate_item( cursor_x, cursor_y, player_x, player_y ){
        ;
        if( this.item_slot[ this.item_slot_cursor ] ){
            this.item_slot[ this.item_slot_cursor ].on_click( cursor_x, cursor_y, player_x, player_y );
            if( this.item_slot[ this.item_slot_cursor ].is_consumed ) {
                this.item_slot[ this.item_slot_cursor ] = null;
            }
        }

    }
    get_active_item(){
         return this.item_slot[ this.item_slot_cursor ];
    }
    delete_active_item(){
         this.item_slot[ this.item_slot_cursor ] = null;
    }
    put_pickup_item( new_item ){
        // アイテムスロットの後側から入る場所を探す
        for( let i = ItemSlot.ITEM_SLOT_COUNT - 1 ; 0 <= i ; i-- ){
            if( this.item_slot[ i ] == null ){
                this.item_slot[ i ] = new_item;
                return true;
            }
        }
        // 入る場所が無かったらfalseを返す
        this.refresh();
        return false;
    }
    has_empty_space(){
        // アイテムスロットがいっぱいならfalse
        for( let i = ItemSlot.ITEM_SLOT_COUNT - 1 ; 0 <= i ; i-- ){
            if( this.item_slot[ i ] == null ){
                return true;
            }
        }
        return false;
    }

    calc_itemslot_coodinate(){
        // アイテムスロットの描画位置を再計算する
        this.itemslot_start_y = this.game.SCREEN_HEIGHT - this.itemslot_margin_bottom - this.itemslot_size;
        this.itemslot_start_x = (this.game.SCREEN_WIDTH / 2) - ((this.itemslot_size + this.itemslot_spacing) * this.itemslot_count / 2);
    }
    is_menu_open(){
        return this.game.hud.hud_menu.is_menu_open;
    }
    on_update(){

        // スロット内アイテムのアップデート処理
        for( let i = ItemSlot.ITEM_SLOT_COUNT - 1 ; 0 <= i ; i-- ){
            if( this.item_slot[ i ] != null ){
                this.item_slot[ i ].on_update();
            }
        }

        if( this.game.input_controller.is_wheel_up ){
            this.is_mouse_holding = false;
            this.item_slot_cursor -= 1;
            if( this.item_slot_cursor < 0){
                this.item_slot_cursor = ItemSlot.ITEM_SLOT_COUNT - 1;
            }
        }
        if( this.game.input_controller.is_wheel_down ){
            this.is_mouse_holding = false;
            this.item_slot_cursor += 1;
            if( ItemSlot.ITEM_SLOT_COUNT <= this.item_slot_cursor){
                this.item_slot_cursor = 0;
            }
        }

        if( this.game.input_controller.is_pressed_key['Digit1'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 0;
        }
        if( this.game.input_controller.is_pressed_key['Digit2'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 1;
        }
        if( this.game.input_controller.is_pressed_key['Digit3'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 2;
        }
        if( this.game.input_controller.is_pressed_key['Digit4'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 3;
        }
        if( this.game.input_controller.is_pressed_key['Digit5'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 4;
        }
        if( this.game.input_controller.is_pressed_key['Digit6'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 5;
        }
        if( this.game.input_controller.is_pressed_key['Digit7'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 6;
        }
        if( this.game.input_controller.is_pressed_key['Digit8'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 7;
        }
        if( this.game.input_controller.is_pressed_key['Digit9'] ){
            this.is_mouse_holding = false;
            this.item_slot_cursor = 8;
        }

        if( this.game.input_controller.get_mouse_press() ){
            let m_y = this.game.input_controller.mouse_y;
            let m_x = this.game.input_controller.mouse_x;
            if( this.itemslot_start_y < m_y && m_y < this.itemslot_start_y + this.itemslot_size ){
                for(let slot_no = 0 ; slot_no <= 8 ; slot_no++ ){
                    let frame_x = this.itemslot_start_x + slot_no * (this.itemslot_size + this.itemslot_spacing)
                    if( frame_x < m_x && m_x < frame_x + this.itemslot_size ){

                        if( this.is_menu_open() ){
                            if( this.is_mouse_holding ){
                                // アイテムを持ってる場合、マウスカーソル位置と交換する
                                let swap = this.item_slot[ slot_no ];
                                this.item_slot[ slot_no ] = this.item_slot[ this.item_slot_cursor ];
                                this.item_slot[ this.item_slot_cursor ] = swap;
                                this.is_mouse_holding = false;
                            } else {
                                // メニューインベントリがアイテムを持ってる場合、交換する
                                if( 0 <= this.game.hud.hud_menu.menu_inventory.mouse_holding_index ){
                                    let swap = this.game.inventory.tool_item_inventory[ this.game.hud.hud_menu.menu_inventory.mouse_holding_index ];
                                    this.game.inventory.tool_item_inventory[ this.game.hud.hud_menu.menu_inventory.mouse_holding_index ] = this.item_slot[ slot_no ];
                                    this.item_slot[ slot_no ] = swap;
                                    this.game.hud.hud_menu.menu_inventory.mouse_holding_index = -1;
                                } else {
                                    if( this.item_slot[ slot_no ] != null ){
                                        this.is_mouse_holding = true;
                                    }
                                }
                            }
                        } else {
                            this.is_mouse_holding = false;
                            if( this.item_slot_cursor == slot_no ){
                                if( this.item_slot[ this.item_slot_cursor ] != null ){
                                    // 同じアイテムを2回クリックしたら、詳細情報をログに出す
                                    this.item_slot[ this.item_slot_cursor ].dump_information_to_log();
                                }
                            }
                        }
                        this.item_slot_cursor = slot_no;
                        this.refresh();
                    }
                }
            }
        }

    }
    on_draw( canvas ){
        for(let slot_no = 0 ; slot_no <= 8 ; slot_no++ ){

            // アイテムの画像

            if( !(slot_no == this.item_slot_cursor && this.is_mouse_holding) ){
                if( this.item_slot[ slot_no ] ){
                    canvas.drawImage(
                        this.item_slot[ slot_no ].get_image(),
                        this.itemslot_start_x + slot_no * (this.itemslot_size + this.itemslot_spacing),
                        this.itemslot_start_y,
                        this.itemslot_size,
                        this.itemslot_size );
                    canvas.font = 'bold 16px monospace';
                    canvas.fillStyle = 'rgb(200,200,200)';
                    canvas.fillText( this.item_slot[ slot_no ].get_subtitle(),
                        this.itemslot_start_x + slot_no * (this.itemslot_size + this.itemslot_spacing) + 3,
                        this.itemslot_start_y + this.itemslot_size - 3);
                }
            }

            if( slot_no == this.item_slot_cursor ){
                // 選択中のスロット
                canvas.strokeStyle = 'rgb(222,30,30)'
                canvas.strokeRect(
                    this.itemslot_start_x + slot_no * (this.itemslot_size + this.itemslot_spacing),
                    this.itemslot_start_y,
                    this.itemslot_size,
                    this.itemslot_size )
            } else if( this.is_equipped_slot[ slot_no ] ){
                // 装備中のスロット
                canvas.strokeStyle = 'rgb(20,250,20)'
                canvas.strokeRect(
                    this.itemslot_start_x + slot_no * (this.itemslot_size + this.itemslot_spacing),
                    this.itemslot_start_y,
                    this.itemslot_size,
                    this.itemslot_size )
            } else {
                // 選択してないスロット
                canvas.strokeStyle = 'rgb(222,222,222)'
                canvas.strokeRect(
                    this.itemslot_start_x + slot_no * (this.itemslot_size + this.itemslot_spacing),
                    this.itemslot_start_y,
                    this.itemslot_size,
                    this.itemslot_size )
            }
        }

        // マウスでつかんでいるアイテム
        if( this.is_mouse_holding ){
            if( this.item_slot[ this.item_slot_cursor ] != null ) {
                canvas.drawImage( this.item_slot[ this.item_slot_cursor ].get_image() ,
                this.game.input_controller.mouse_x ,
                this.game.input_controller.mouse_y ,
                this.itemslot_size, this.itemslot_size );
            }
        }
    }
    load_data( item_slot_data ){
        for( let i = 0 ; i < this.itemslot_count ; i++ ){
            this.item_slot[i] = this.game.save_data_manager.deserialize_item( item_slot_data[i] )
        }
        this.refresh();
    }
    save_data(){
        let item_slot_data = [];
        for( let i = 0 ; i < this.itemslot_count ; i++ ){
            if( this.item_slot[i] ){
                item_slot_data.push( this.item_slot[i].save_data() )
            } else {
                item_slot_data.push( null )
            }
        }
        return item_slot_data;
    }
    cheat(){

        //this.item_slot[1] = new CatchNet( game );
        this.item_slot[1] = new FishRod( this.game );
        this.item_slot[2] = new FishKirimi( this.game );

        // let new_item = null;
        // new_item = new EquipmentItem( this.game );
        // new_item.set_image( './img/illustya/rain_kasa_red.png' );
        // new_item.equip_part = EquipmentItem.EQUIP_GLIDER;
        // new_item.riseup_power = 10;
        // this.item_slot[3] = new_item;
        //
        // new_item = new EquipmentItem( this.game );
        // new_item.set_image( './img/illustya/feather_red.png' );
        // new_item.equip_part = EquipmentItem.EQUIP_WING;
        // new_item.midair_speed = 2;
        // new_item.fall_speed = 0.8;
        // this.item_slot[4] = new_item;
        //
        // new_item = new EquipmentItem( this.game );
        // new_item.set_image( './img/illustya/snorkel_goggle.png' );
        // new_item.equip_part = EquipmentItem.EQUIP_GOGGLE;
        // new_item.underwater_speed = 0.1;
        // this.item_slot[5] = new_item;
        //
        // new_item = new EquipmentItem( this.game );
        // new_item.set_image( './img/illustya/snorkel_fin.png' );
        // new_item.equip_part = EquipmentItem.EQUIP_FIN;
        // new_item.underwater_speed = 0.1;
        // this.item_slot[6] = new_item;

        this.refresh()
    }


}
