
import {Entity} from './entity.js';
import {ShipBlock} from './ship_block.js';

export class Player extends Entity {
    constructor( game ){

        super( game );

        this.name = 'player';

        this.x = 0
        this.y = -60

        this.vx = 0;
        this.vy = 0;
        this.is_landing = false;
        this.is_in_sea = false;


        // 装備関係
        this.equip_list = []
        // 風を受けた時の上昇力
        this.riseup_power = 0;
        // 空中での移動力補正
        this.midair_speed = 0;
        // 水中での移動力補正
        this.underwater_speed = 0;

    }

    clear_equipped_Status(){
        this.equip_list = []
        // 装備をすべて外し、装備によるステータス上昇を取り消す
    }
    equip_item( new_equip ){
        // 装備する
        // 装備部位が重複したら装備せずにfalseを返す
        if( this.equip_list[ new_equip.equip_part ] ){
            return false;
        }
        this.equip_list[ new_equip.equip_part ] = new_equip;

        // ステータス上昇を適用する
        // 装備部位
        // 風を受けた時の上昇力
        this.riseup_power += new_equip.riseup_power;
        // 空中での移動力補正
        this.midair_speed += new_equip.midair_speed;
        // 水中での移動力補正
        this.underwater_speed += new_equip.underwater_speed ;

    }

    on_update(){
        super.on_update();

        // 物理法則
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

        // WASDで移動
        if( this.game.input_controller.is_down_right ){
            this.vx += 2
        }
        if( this.game.input_controller.is_down_left ){
            this.vx -= 2
        }
        this.vx *= 0.5;

        if( this.game.input_controller.is_down_up ){
            if( this.is_landing || this.is_in_sea ){
                this.vy = -8;
                this.is_landing = false;

            }
        }

        // マウスクリックでアイテムスロット
        if( this.game.input_controller.is_mouse_press ) {
            if( this.game.hud.item_slot.get_active_item() ){
                this.game.hud.item_slot.get_active_item().on_click();
            }
        }
    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,0,200)'
        canvas.strokeRect( this.x - 16, this.y - 32, 32, 32)

    }
}
