
import {Entity} from './Entity.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

export class DropItem extends Entity {

    static IMAGE_LIST = [
        './img/illustya/tree_ryuuboku.png',
        './img/illustya/alohashirt_gray.png',
        './img/illustya/junk_kikai.png',
    ];

    constructor( game ){

        super( game );

        this.name = 'unknown item';

        this.x = 0;
        this.y = 0;

        this.vx = 0;
        this.vy = 0;
        this.is_landing = false;
        this.is_in_sea = false;

        this.item_to_pickup = null;



    }
    set_tool_item( new_item ){
        // 自身に引数のツールアイテムを設定する
        this.item_to_pickup = new_item;
        this.image = new_item.image;
    }

    on_update(){
        super.on_update();

        this.vy += 0.5
        this.x += this.vx;
        this.y += this.vy;

        if( 1 < this.vy ){
            this.is_landing = false;
        }

        // プレイヤーとの当たり判定
        let player = this.game.world.player;
        if( player.x - player.width_half - 16 < this.x && this.x < player.x + player.width_half + 16 &&
            player.y - player.height_half - 16 < this.y && this.y < player.y + player.height_half - 4
        ){
            let picked = player.hit_drop_item( this );
            if( picked ) {
                this.is_alive = false;
            }
        }

        if( this.x < -300 ){
            this.is_alive = false;
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
        if( 0 <= this.y ){
                //this.y = 0
                this.vy -= 1;
                this.vy *= 0.8;
                this.is_landing = false;
                this.is_in_sea = true;
        } else {
            // 海の中にいない
            this.is_in_sea = false;
        }

        if( this.is_in_sea ) {
            this.vx = -1;
        }

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,200,200)'
        //canvas.strokeRect( this.x - 16, this.y - 16, 32, 32)

        canvas.drawImage( this.image ,this.x - 16, this.y - 16, 32 , 32)

    }
}
