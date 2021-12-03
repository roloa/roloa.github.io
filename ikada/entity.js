
//import {Entity} from './entity.js';
import {ShipBlock} from './ship_block.js';

export class Entity {
    constructor( game ){
        this.name = 'noname_entity';

        this.game = game;

        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;

        this.is_alive = true;

        this.is_landing = false;
        this.is_in_sea = false;

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
        let local_x_in_ship = this.x + (this.game.world.ship.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = this.y + (this.game.world.ship.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;

        // 触れているブロックの座標
        let block_x = Math.floor( local_x_in_ship / ShipBlock.BLOCK_SIZE);
        let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
        if( 0 <= block_x && block_x < this.game.world.ship.block_array.length &&
            0 <= block_y && block_y < this.game.world.ship.block_array[0].length){
            if( local_y_in_ship % ShipBlock.BLOCK_SIZE < 8 && // 床の厚さ
                this.game.world.ship.block_array[block_x][block_y] != null &&
                this.game.world.ship.block_array[block_x][block_y].is_floor
            ){
                // 着地判定を得る
                this.y = ( block_y - this.game.world.ship.ship_offset_y) * ShipBlock.BLOCK_SIZE - ShipBlock.BLOCK_RADIUS;
                this.vy = 0;
                this.is_landing = true;
            }
        }
        // 海との当たり判定
        if( 16 <= this.y ){
                //this.y = 0
                this.vy -= 1;
                this.vy *= 0.8;
                this.is_landing = false;
                this.is_in_sea = true;
        } else {
            // 海の中にいない
            this.is_in_sea = false;
        }

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,0,0)'
        canvas.strokeRect( this.x - 16, this.y - 32, 32, 32)

    }
}
