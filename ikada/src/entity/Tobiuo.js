
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
        this.max_hp = 30;
        this.hp = 30;

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 0.2;
        this.is_angry = false;

        this.showing_hp_timer = 0;
        this.is_angry = false;

        this.is_preparing_jump = false;
        this.preparing_jump_minimum_time = 50;
        this.preparing_jump_timer = 0;

        this.direct_damage = 9;
        this.knock_back_rate = 1.0;

        this.target_vy = 0;
        this.target_vx = -99;

        this.reset_target_coodinate();
    }

    reset_target_coodinate(){
        this.target_x = Math.random() * 50 + 200 + this.game.world.ship.get_right_side_x();
        this.target_y = Math.random() * 50 + 100;
        if( this.x < 0 ){
            this.target_x = Math.random() * -50 - 200 + this.game.world.ship.get_left_side_x();
        }
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
        if( this.is_angry ){
            // 怒っている場合
            if( this.is_in_sea ){
                if( this.is_preparing_jump ){
                    // 助走をつけようとする状態

                    let dist_x = this.target_x - this.x;
                    let dist_y = this.target_y - this.y;
                    if( Math.abs( dist_x ) < 10 && Math.abs( dist_y ) < 10){
                        // 突進のスタート地点に着いた
                        this.is_preparing_jump = false;
                        this.target_vy = -99;
                        this.target_vx = -99;
                        if( this.x < 0 ){
                            this.target_vx = 99;
                        }
                    } else {
                        // 突進のスタート地点に向かう
                        this.target_vx = dist_x;
                        this.target_vy = dist_y;
                    }
                } else {
                    // 突進している
                }
            } else {
                this.is_preparing_jump = true;
            }
            // 弾を撃つ
        } else {
            // 平常時
            if( this.target_vy < 10 && this.y < 300 && Math.random() < 0.1 ){
                this.target_vy += 2;
            }
            if( -10 < this.target_vy && Math.random() < 0.1 ){
                this.target_vy -= 2;
            }
            this.target_vx = -10;
        }

        if( this.is_in_sea ) {
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
        }
    }
    take_damage( taken_damage ){
        super.take_damage( taken_damage );
        // ダメージを受けた時に助走のスタート地点を設定する
        this.reset_target_coodinate();
    }
    on_hit_ship(){
        this.is_preparing_jump = true;
        this.target_vx = -this.target_vx;
        this.target_vy = 10;
    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;

        if( 0 < this.y ){
            this.is_in_sea = true;
            this.vx *= 0.95;
            this.vy *= 0.95;

        } else {
            this.is_in_sea = false;
            let gravity = 0.1;
            gravity = Math.max( 0.01, gravity );
            this.vy += gravity;
            this.target_vy = 5;
        }

    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}
