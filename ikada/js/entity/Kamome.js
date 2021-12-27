
import {Enemy} from './Enemy.js';
import {DropItem} from './DropItem.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

import {ChickenRawMoto} from '../tool_item/d_foods/ChickenRawMoto.js';
import {ChickenRawSaki} from '../tool_item/d_foods/ChickenRawSaki.js';



export class Kamome extends Enemy {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'bird_kamome' )

        this.name = 'カモメ';
        this.strength_lv = 3;

        this.width = 64;
        this.height = 40;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;

        this.max_hp = 100;
        this.hp = 100;

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 0.1;

        this.direct_damage = 9;
        this.knock_back_rate = 1.0;

        this.target_vx = -3;
        this.target_vy = 0;
        this.target_height = -200;
    }

    get_drop_tool_item(){
        let rand = Math.random() * 2
        if( rand < 1){
            let new_tool_item = new ResourceItem( this.game );
            new_tool_item.set_image( 'feather_white' );
            new_tool_item.add_material( 'feather',  Math.floor(Math.random() * 3) + 3 );
            return new_tool_item;
        } else {
            if( Math.random() < 0.5 ){
                return new ChickenRawMoto( this.game );
            } else {
                return new ChickenRawSaki( this.game );
            }
        }
    }

    enemy_move_ai(){
        // 怒っている場合
        if( this.is_angry ){
            if( this.is_preparing_jump){
                // 助走をつけようとする状態
                // プレイヤーとは反対側に進む
                let vec = this.get_vector_to_player_with_bias(0, 64);
                this.vx += -vec.x * this.dash_speed;
                this.vy += -(vec.y - 0.1) * this.dash_speed;
                if( Math.random() < 0.1 ){
                    if( 40000 < this.get_distance_p2_to_player()){
                        this.is_preparing_jump = false;
                    }
                }
            } else {
                // プレイヤーの方に向かう
                let vec = this.get_vector_to_player_with_bias(0, 0)
                this.vx += vec.x * this.dash_speed;
                this.vy += vec.y * this.dash_speed;
                if( Math.random() < 0.01){
                        this.is_preparing_jump = true;
                }
            }
            if( 0 < this.y  ){
                // 海
                this.is_preparing_jump = true;
            }

            // 弾を撃つ
        } else {
            // 平常時
            if( this.vx < this.target_vx ){
                this.vx += this.dash_speed;
            } else {
                this.vx -= this.dash_speed;
            }
            if( this.y < this.target_height ){
                this.vy += this.dash_speed;
            } else {
                this.vy -= this.dash_speed;
            }
            if( Math.random() < 0.3 ){
                this.target_vy += this.dash_speed;
            }
            if( Math.random() < 0.3 ){
                this.target_vy -= this.dash_speed;
            }
        }
    }


    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

        if( 0 < this.y  ){
            // 海
            this.vy -= 2;
            this.target_vy = -2;
        }
    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}
