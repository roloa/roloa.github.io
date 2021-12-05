
import {CatchNet} from './tool_item/catch_net.js';
import {FishKirimi} from './tool_item/fish_kirimi.js';
import {EquipmentItem} from './tool_item/equipment_item.js';

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

        this.item_slot[1] = new CatchNet( game );
        this.item_slot[2] = new FishKirimi( game );

        this.item_slot_cursor = 0;


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

    get_active_item(){
        return this.item_slot[ this.item_slot_cursor ];
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
        return false;
    }

    calc_itemslot_coodinate(){
        // アイテムスロットの描画位置を再計算する
        this.itemslot_start_y = this.game.SCREEN_HEIGHT - this.itemslot_margin_bottom - this.itemslot_size;
        this.itemslot_start_x = (this.game.SCREEN_WIDTH / 2) - ((this.itemslot_size + this.itemslot_spacing) * this.itemslot_count / 2);
    }

    on_update(){

        if( this.game.input_controller.is_wheel_up ){
            this.item_slot_cursor -= 1;
            if( this.item_slot_cursor < 0){
                this.item_slot_cursor = ItemSlot.ITEM_SLOT_COUNT - 1;
            }
        }
        if( this.game.input_controller.is_wheel_down ){
            this.item_slot_cursor += 1;
            if( ItemSlot.ITEM_SLOT_COUNT <= this.item_slot_cursor){
                this.item_slot_cursor = 0;
            }
        }


    }
    on_draw( canvas ){
        for(let slot_no = 0 ; slot_no <= 8 ; slot_no++ ){

            // アイテムの画像
            if( this.item_slot[ slot_no ] ){
                canvas.drawImage(
                    this.item_slot[ slot_no ].image,
                    this.itemslot_start_x + slot_no * (this.itemslot_size + this.itemslot_spacing),
                    this.itemslot_start_y,
                    this.itemslot_size,
                    this.itemslot_size )

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
    }
}
