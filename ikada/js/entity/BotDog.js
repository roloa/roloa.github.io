
import {Entity} from './Entity.js';
import {PathFinding} from './PathFinding.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

export class BotDog extends Entity {

    constructor( game ){

        super( game );

        this.name = 'イヌ型ロボット';

        this.x = 0;
        this.y = 0;

        this.vx = 0;
        this.vy = 0;
        this.is_landing = false;
        this.height = 32;
        this.height_half = this.height * 0.5;

        this.image = this.game.image_library.get_image('pet_robot_dog');

        this.path_finding = new PathFinding( this.game );
        this.path_leading_index = 0;

        this.dash_speed = 3;
    }

    on_update(){
        super.on_update();

        this.vy += 0.5
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.5;
        this.vy *= 0.99;

        if( 1 < this.vy ){
            this.is_landing = false;
        }

        // 船との当たり判定
        // 船から見たローカル座標
        let local_x_in_ship = this.x + (this.game.world.ship.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = this.y + (this.game.world.ship.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS + this.height_half;

        let ship_block = this.game.world.ship.get_ship_block( this.x, this.y + this.height_half);
        if( local_y_in_ship % ShipBlock.BLOCK_SIZE < 8 && // 床の厚さ
            ship_block != null &&
            ship_block.is_floor
        ){
            // 着地判定を得る
            if( this.is_off_platform ){
                // 床すりぬけ状態
            } else {
                let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
                this.y = ( block_y - this.game.world.ship.ship_offset_y) * ShipBlock.BLOCK_SIZE - ShipBlock.BLOCK_RADIUS - this.height_half;
                this.vy = 0;
                this.is_landing = true;
                this.is_on_ship = true;
            }
        }

        // 床すり抜けは押しっぱなしにしないと解除
        this.is_off_platform = false;

        // 海との当たり判定
        if( 0 <= this.y ){
            this.is_alive = false;
        }

        // AI

        // 目的地を決める
        if( this.path_finding.is_processing ){
            this.path_finding.process_finding();
        } else {
            if( this.path_finding.is_finding_success ){
                // 探索が成功しているなら、経路に沿って歩く
                this.on_lead_path();
            } else {
                // 目的地決め
                this.set_target_place();
            }
        }

    }
    set_target_place(){
        this.path_leading_index = 0;
        let sp = this.game.world.ship;
        this.path_finding.init_finding(
            sp.local_to_cell_x( sp.global_to_local_x( this.x )),
            sp.local_to_cell_y( sp.global_to_local_y( this.y )),
            Math.floor(Math.random() * 7),
            Math.floor(Math.random() * 7)
        );
    }
    // 経路に従って移動する
    on_lead_path(){
        if( this.path_finding.path.length <= this.path_leading_index ){
            // パスの最後まで来た
            this.set_target_place();
            return;
        }
        let next_x = this.game.world.ship.cell_to_global_x( this.path_finding.path[ this.path_leading_index ].x);
        let next_y = this.game.world.ship.cell_to_global_y( this.path_finding.path[ this.path_leading_index ].y);
        let x_dist = next_x - this.x;
        let y_dist = next_y - this.y;
        // x座標の差によって、左右に歩く
        const margin = 10;
        if( margin < x_dist ){
            this.vx += 1;
        }
        if( x_dist < -margin ){
            this.vx -= 1;
        }
        if( margin < y_dist ){
            // 床抜け
            this.is_off_platform = true;
        }
        if( y_dist < -margin ){
            // ジャンプ
            if( this.is_landing ){
                this.vy = -6;
                this.is_landing = false;
            }
        }
        if( Math.abs( x_dist ) <= margin && Math.abs( y_dist ) <= margin ){
            this.path_leading_index += 1;
        }
    }
    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,200,200)'
        //canvas.strokeRect( this.x - 16, this.y - 16, 32, 32)

        canvas.drawImage( this.image ,this.x - 16, this.y - 16, 32 , 32)

        this.path_finding.on_draw( canvas );
    }
}
