
//import {Entity} from './entity.js';
import {ShipBlock} from './ship_block.js';

export class Entity {
    constructor( world ){
        this.name = 'noname_entity';

        this.world = world;

        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;

        this.is_landing = false;

    }

    on_update(){

        this.vy += 0.5
        this.x += this.vx;
        this.y += this.vy;

        if( 1 < this.vy ){
            this.is_landing = false;
        }

        // 船との当たり判定
        // 船から見たローカル座標
        let local_x_in_ship = this.x + (this.world.ship.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = this.y + (this.world.ship.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;

        // 触れているブロックの座標
        let block_x = Math.floor( local_x_in_ship / ShipBlock.BLOCK_SIZE);
        let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
        if( 0 <= block_x && block_x < this.world.ship.block_array.length &&
            0 <= block_y && block_y < this.world.ship.block_array[0].length){
            if( this.world.ship.block_array[block_x][block_y] != null &&
                this.world.ship.block_array[block_x][block_y].is_floor
            ){
                // 着地判定を得る
                this.y = ( block_y - this.world.ship.ship_offset_y) * ShipBlock.BLOCK_SIZE - ShipBlock.BLOCK_RADIUS;
                this.vy = 0;
                this.is_landing = true;
            }
        }
        // 海との当たり判定
        if( 0 <= this.y ){
                //this.y = 0
                this.vy -= 1
        }

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,0,0)'
        canvas.strokeRect( this.x - 16, this.y - 32, 32, 32)

    }
}
