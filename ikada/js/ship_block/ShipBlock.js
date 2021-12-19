
import {BuildBlock} from '../tool_item/BuildBlock.js'

export class ShipBlock {

    static BLOCK_RADIUS = 16
    static BLOCK_SIZE = ShipBlock.BLOCK_RADIUS + ShipBlock.BLOCK_RADIUS

    constructor( game ){
        this.game = game;

        this.saving_data = {}

        this.is_floor = false
        this.image = null;
        this.is_removed = false;
    }
    on_click(){
        // プレイヤーがハンマーを構えているなら、自壊してアイテム化する
        let item = this.game.hud.item_slot.get_active_item();
        if( item && item.is_hammer ){
            this.is_removed = true;
            let new_item = new BuildBlock( this.game );
            new_item.set_ship_block( this );
            this.game.world.give_tool_item_player( new_item );
            // 処理完了のため、trueを返す
            return true;
        }
        return this.on_interact();
    }
    on_interact(){
        // 下位クラスでブロックの機能を実装する
        return false;
    }
    on_update(){

    }
    get_image(){
        return this.image;
    }
    on_draw( canvas ){
        if( this.image != null ) {
            canvas.drawImage( this.get_image(), -ShipBlock.BLOCK_RADIUS, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_SIZE, ShipBlock.BLOCK_SIZE);
        }
    }
    save_data(){
        let data = {};
        data.class_name = this.constructor.name;
        data.saving_data_serial = JSON.stringify( this.saving_data );
        return data;
    }
    load_data( data ){
        this.saving_data = JSON.parse( data.saving_data_serial );
    }
}
