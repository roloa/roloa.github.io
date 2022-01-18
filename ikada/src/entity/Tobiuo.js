
import {Enemy} from './Enemy.js';
import {FishKirimi} from '../tool_item/d_foods/FishKirimi.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

export class Tobiuo extends Enemy {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'fish_tobiuo2' )
        //this.image = this.game.image_library.get_image( 'fish_tobiuo' )

        this.width = 64;
        this.height = 40;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;
        this.max_hp = 100;
        this.hp = 100;

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 0.1;
        this.is_angry = false;

        this.showing_hp_timer = 0;
        this.is_angry = false;

        this.is_preparing_jump = false;
        this.preparing_jump_minimum_time = 50;
        this.preparing_jump_timer = 0;

        this.direct_damage = 9;
        this.knock_back_rate = 1.0;

        this.target_vy = 0;
        this.target_vx = -3;
    }

    get_drop_tool_item(){
        let rand = Math.random() * 2
        if( rand < 1){
            let new_tool_item = new ResourceItem( this.game );
            new_tool_item.set_image( 'fish_fin' );
            new_tool_item.add_material( 'fin',  Math.floor(Math.random() * 3) + 3 );
            return new_tool_item;
        } else {
            return new FishKirimi( this.game );
        }
    }

    enemy_move_ai(){
        // 怒っている場合
        if( this.is_angry ){

            if( this.is_in_sea ){
                if( this.is_preparing_jump || 0 < this.preparing_jump_timer ){
                    this.preparing_jump_timer -= 1;
                    // 助走をつけようとする状態
                    // プレイヤーとは反対側に進む
                    let vec = this.get_vector_to_player_with_bias(0, -64);
                    this.vx += -vec.x * this.dash_speed * 0.7;
                    this.vy += (-vec.y + 0.3) * this.dash_speed * 0.7;
                    if( Math.random() < 0.1 ){
                        if( 40000 < this.get_distance_p2_to_player() ){
                            this.is_preparing_jump = false;
                        }
                    }
                } else {
                    // プレイヤーの方に向かう,すこし上を狙う
                    let vec = this.get_vector_to_player_with_bias(0, -64)
                    this.vx += vec.x * this.dash_speed;
                    this.vy += vec.y * this.dash_speed;
                }
            } else {
                this.is_preparing_jump = true;
                this.preparing_jump_timer = this.preparing_jump_minimum_time;
            }
            // 弾を撃つ
        } else {
            // 平常時
            if( this.vx < this.target_vx ){
                this.vx += this.dash_speed;
            } else {
                this.vx -= this.dash_speed;
            }
            if( this.vy < this.target_vy ){
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

        if( 0 < this.y ){
            this.is_in_sea = true;
            this.vx *= 0.99;
            this.vy *= 0.99;

        } else {
            this.is_in_sea = false;
            let gravity = 0.2 - Math.abs( this.vx * 0.1)
            gravity = Math.max( 0.01, gravity );
            this.vy += gravity;
            this.target_vy = 1;
        }

    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}
