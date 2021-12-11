

import {ToolItem} from './ToolItem.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';

export class BuildBlock extends ToolItem {

    constructor( game ){
        super( game )

        //this.image = this.game.image_library.get_image( './img/illustya/food_fish_kirimi_red.png');
        this.ship_block = null;
    }
    set_ship_block( new_ship_block ){
        this.ship_block = new_ship_block;
        this.image = this.ship_block.image;

    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('block onclick!')

        let local_x_in_ship = cursor_x + (this.game.world.ship.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = cursor_y + (this.game.world.ship.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;

        // 触れているブロックの座標
        let block_x = Math.floor( local_x_in_ship / ShipBlock.BLOCK_SIZE);
        let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
        if( 0 <= block_x && block_x < this.game.world.ship.block_array.length &&
            0 <= block_y && block_y < this.game.world.ship.block_array[0].length){
            if( this.game.world.ship.block_array[block_x][block_y] == null ){
                this.game.world.ship.block_array[block_x][block_y] = this.ship_block;
                this.is_consumed = true;
            }
        }
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
