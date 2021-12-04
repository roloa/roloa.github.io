

import {CatchNet} from './tool_item/catch_net.js';

import {EquipmentItem} from './tool_item/equipment_item.js';

export class Inventory {

    constructor( game ){
        this.game = game;

        this.item_inventory_size = 32;

        this.tool_item_inventory = []
        for( let i = 0 ; i < this.item_inventory_size ; i++ ){
            this.tool_item_inventory[ i ] = null;
        }

        this.tool_item_inventory[0] = new CatchNet( game );

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
        new_item.midair_speed = 10;
        this.tool_item_inventory[3] = new_item;

        new_item = new EquipmentItem( game );
        new_item.set_image( './img/illustya/snorkel_goggle.png' );
        new_item.equip_part = EquipmentItem.EQUIP_GOGGLE;
        new_item.underwater_speed = 5;
        this.tool_item_inventory[4] = new_item;

        new_item = new EquipmentItem( game );
        new_item.set_image( './img/illustya/snorkel_fin.png' );
        new_item.equip_part = EquipmentItem.EQUIP_FIN;
        new_item.underwater_speed = 10;
        this.tool_item_inventory[5] = new_item;



    }
    on_update(){


    }
    on_draw(){

    }
}
