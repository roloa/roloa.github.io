
import {Enemy} from './Enemy.js';
import {FishKirimi} from '../tool_item/d_foods/FishKirimi.js';

export class EnemySurfaceBird extends Enemy {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'bird_kamome' )

        this.width = 64;
        this.height = 64;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;
        this.max_hp = 100;
        this.hp = 100;

        this.is_angry = true;
        this.angry_timer_max = 500;
        this.angry_timer_count = this.angry_timer_max;

        this.showing_hp_timer = 0;

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 0.2;

        this.position_x = 0;
        this.position_y = 0;

        // 射撃系ステータス
        this.do_fire_attack = false;
        this.fire_spread = 1;
        this.bullet_lifetime = 100;
        this.bullet_velocity = 5;

        // AI属性
        // 突進
        this.do_tackle_attack = false;
        this.tackle_timer_max = 200;
        this.tackle_timer_count = 0;
        this.is_in_tackle = false;

        // 移動系
        // 舟との間合い
        this.distance_from_ship = 100;
        // 上空型かどうか
        this.is_fly_above = false;
        // 裏取り型かどうか
        this.is_back_attack = false;

        // 撃破報酬
        this.drop_tool_item = new FishKirimi( this.game );

        this.reset_position();
    }
    reset_position(){
        // 位置取りを再設定

        if( this.is_fly_above ){
            // 上空型
            this.position_x = Math.random() * 200;
            this.position_y = this.game.world.ship.get_top_y() - this.distance_from_ship;
            return;
        }
        if( this.is_back_attack ){
            // 裏取り型
            this.position_x = this.game.world.ship.get_left_side_x() - this.distance_from_ship;
            this.position_y = Math.random() * -300 - 100;
            return;
        }
        // それ以外
        this.position_x = this.game.world.ship.get_right_side_x() + this.distance_from_ship;
        this.position_y = Math.random() * -300 - 100;
    }
    get_drop_tool_item(){
        return this.drop_tool_item;
    }
    enemy_move_ai(){

        // 前に決めた目的地に向かう
        let vec = this.get_vector_to_point( this.position_x, this.position_y );
        this.vx += vec.x * this.dash_speed;
        this.vy += vec.y * this.dash_speed;

        if( this.is_in_tackle ){
            // タックル中、軌道修正はしない
            if( Math.abs(this.position_x - this.x) + Math.abs(this.position_y - this.y) < 50 ){
                // 目的地に十分近づいたら、タックルを中止する
                this.reset_position();
                this.is_in_tackle = false;
            }
        } else if( Math.random() < 0.01 ){
            // 時々位置変えする
            this.reset_position();
        }

        // 突進する
        if( this.do_tackle_attack ){
            if( 0 < this.tackle_timer_count ){
                this.tackle_timer_count -= 1;
            } else {
                this.tackle_timer_count = this.tackle_timer_max;
                // タックル対象の座標を決める
                this.position_x = 0;
                this.position_y = -50;
                this.is_in_tackle = true;
            }
        }

        // 弾を撃つ
        if( this.do_fire_attack ){
            if( 0 < this.fire_cool_time_count ){
                this.fire_cool_time_count -= 1;
            } else {
                this.fire_bullet();
                this.fire_cool_time_count = this.fire_cool_time;
            }
        }
    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;

    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}