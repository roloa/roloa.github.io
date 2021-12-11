
import {BuildBlock} from '../tool_item/BuildBlock.js'

export class ShipBlock {

    static BLOCK_RADIUS = 16
    static BLOCK_SIZE = ShipBlock.BLOCK_RADIUS + ShipBlock.BLOCK_RADIUS

    constructor( game ){
        this.game = game;
        this.is_floor = false
        this.image = null;
        this.is_removed = false;
    }
    on_interact(){
        // プレイヤーがハンマーを構えているなら、自壊してアイテム化する
        let item = this.game.hud.item_slot.get_active_item();
        if( item && item.is_hammer ){
            this.is_removed = true;
            let new_item = new BuildBlock( this.game );
            new_item.set_ship_block( this );
            this.game.world.give_tool_item_player( new_item );
        }
        return false;
    }
    on_update(){

    }
    on_draw( canvas ){
        if( this.image != null ) {
            canvas.drawImage( this.image, -ShipBlock.BLOCK_RADIUS, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_SIZE, ShipBlock.BLOCK_SIZE);
        }
    }
    save_data(){
        let data = {};
        data.class_name = this.constructor.name;
        return data;
    }
    load_data( data ){

    }
}
