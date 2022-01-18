

import {ToolItem} from './ToolItem.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';

export class BuildBlock extends ToolItem {

    constructor( game ){
        super( game )

        //this.image = this.game.image_library.get_image( './img/illustya/food_fish_kirimi_red.png');
        this.ship_block = null;
        this.saving_data.item_name = '船の建材';

    }
    set_ship_block( new_ship_block ){
        this.ship_block = new_ship_block;
        this.image = this.ship_block.image;
        return this; // レシピ記述を便利に！
    }
    on_click( cursor_x, cursor_y, player_x, player_y ){

        if ( this.game.world.ship.put_ship_block_coodinate(this.ship_block, cursor_x, cursor_y) ){
            this.is_consumed = true;
        }

    }
    get_name(){
        if( this.ship_block != null){
            return this.ship_block.get_name();
        }
        return super.get_name();
    }
    save_data(){
        let data = super.save_data();
        data.ship_block = this.ship_block.save_data();
        return data;
    }
    load_data( data ){
        this.set_ship_block( this.game.save_data_manager.deserialize_block( data.ship_block ));
    }
}
