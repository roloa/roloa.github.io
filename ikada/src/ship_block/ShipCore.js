
import {ShipBlock} from './ShipBlock.js';

export class ShipCore extends ShipBlock{

    constructor( game ){
        super( game );

        this.name = '舟のコア';

        this.is_floor = true;
        this.image = this.game.image_library.get_image('ship_core');

        this.heartbeat_span_max = 50;
        this.heartbeat_span_count = this.heartbeat_span_max;
        this.is_core = true;

        this.current_heartbeat_id = 1;

    }


    on_update(){
        super.on_update();

        if( 0 < this.heartbeat_span_count ){
            this.heartbeat_span_count -= 1;
        } else {
            this.heartbeat_span_count = this.heartbeat_span_max;

            // 上下左右のブロックに新しいハートビートを与える
            this.current_heartbeat_id += 1;
            this.newest_heartbeat_id = this.current_heartbeat_id;

            let block = null;
            block = this.game.world.ship.get_ship_block_by_index(  this.cell_x - 1 , this.cell_y, true );
            if ( block ){
                block.give_heartbeat( this.current_heartbeat_id );
            }
            block = this.game.world.ship.get_ship_block_by_index( this.cell_x + 1 , this.cell_y, true );
            if ( block ){
                block.give_heartbeat( this.current_heartbeat_id );
            }
            block = this.game.world.ship.get_ship_block_by_index(    this.cell_x , this.cell_y - 1, true );
            if ( block ){
                block.give_heartbeat( this.current_heartbeat_id );
            }
            block = this.game.world.ship.get_ship_block_by_index(  this.cell_x , this.cell_y + 1, true );
            if ( block ){
                block.give_heartbeat( this.current_heartbeat_id );
            }
        }
    }

}
