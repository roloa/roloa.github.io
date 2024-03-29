

import {CatchNet} from '../tool_item/CatchNet.js';
import {FishKirimi} from '../tool_item/d_foods/FishKirimi.js';

import {EquipmentItem} from '../tool_item/EquipmentItem.js';

export class Inventory {

    constructor( game ){
        this.game = game;

        this.item_inventory_size = 25;

        this.tool_item_inventory = []
        for( let i = 0 ; i < this.item_inventory_size ; i++ ){
            this.tool_item_inventory[ i ] = null;
        }

        //this.tool_item_inventory[0] = new CatchNet( game );





    }
    on_update(){


    }
    put_pickup_item( new_item, not_stack ){
        if( !not_stack ){
            // スタックマージできる場所を探す
            for( let i = 0 ; i < this.tool_item_inventory.length ; i++ ){
                if( this.tool_item_inventory[ i ] ){
                    if( this.tool_item_inventory[ i ].try_stack_marge( new_item ) ){
                        return true;
                    }
                }
            }
        }
        // アイテムスロットの前側から入る場所を探す
        for( let i = 0 ; i < this.tool_item_inventory.length ; i++ ){
            if( this.tool_item_inventory[ i ] == null ){
                this.tool_item_inventory[ i ] = new_item;
                return true;
            }
        }
        // 入る場所が無かったらfalseを返す
        return false;
    }
    has_empty_space(){
        // アイテムスロットがいっぱいならfalse
        for( let i = this.tool_item_inventory.length - 1 ; 0 <= i ; i-- ){
            if( this.tool_item_inventory[ i ] == null ){
                return true;
            }
        }
    }
    on_draw(){

    }
    cheat(){
        // テスト用の装備品
        let new_item = null;
        new_item = new EquipmentItem( game );
        new_item.set_image( './img/illustya/rain_kasa_red.png' );
        new_item.equip_part = EquipmentItem.EQUIP_GLIDER;
        new_item.riseup_power = 10;
        this.tool_item_inventory[2] = new_item;

        new_item = new EquipmentItem( game );
        new_item.set_image( './img/illustya/feather_red.png' );
        new_item.equip_part = EquipmentItem.EQUIP_WING;
        new_item.midair_speed = 2;
        new_item.fall_speed = 0.8;
        this.tool_item_inventory[3] = new_item;

        new_item = new EquipmentItem( game );
        new_item.set_image( './img/illustya/snorkel_goggle.png' );
        new_item.equip_part = EquipmentItem.EQUIP_GOGGLE;
        new_item.underwater_speed = 1;
        this.tool_item_inventory[4] = new_item;

        new_item = new EquipmentItem( game );
        new_item.set_image( './img/illustya/snorkel_fin.png' );
        new_item.equip_part = EquipmentItem.EQUIP_FIN;
        new_item.underwater_speed = 1;
        this.tool_item_inventory[5] = new_item;

        new_item = new FishKirimi( game );
        this.tool_item_inventory[8] = new_item;
        new_item = new FishKirimi( game );
        this.tool_item_inventory[9] = new_item;
        new_item = new FishKirimi( game );
        this.tool_item_inventory[10] = new_item;
    }

    load_data( item_slot_data ){
        for( let i = 0 ; i < this.item_inventory_size ; i++ ){
            this.tool_item_inventory[i] = this.game.save_data_manager.deserialize_item( item_slot_data[i] )
        }
    }
    save_data(){
        let item_slot_data = [];
        for( let i = 0 ; i < this.item_inventory_size ; i++ ){
            if( this.tool_item_inventory[i] ){
                item_slot_data.push( this.tool_item_inventory[i].save_data() )
            } else {
                item_slot_data.push( null )
            }
        }
        return item_slot_data;
    }
}
