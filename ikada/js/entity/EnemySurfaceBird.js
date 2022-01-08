
import {Enemy} from './Enemy.js';

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

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 0.2;
        this.is_angry = false;

        this.fire_spread = 1;
        this.bullet_lifetime = 100;
        this.bullet_velocity = 5;

        this.showing_hp_timer = 0;

        this.position_x = 0;
        this.position_y = 0;
        this.reset_position();
    }
    reset_position(){
        // 位置取りを再設定
        this.position_x = this.game.world.ship.get_left_side_x() + 100 + Math.random() * 100;
        this.position_y = Math.random() * -300 - 100;
    }
    generate_by_ship_level( ship_level ){
        // 鳥の敵を生成する
        // 座標が設定済みの前提で、高度に応じたレベルの敵になる


        this.strength_lv = (ship_level + 1) * 10;

        // HP = Lv x (9~10)
        this.max_hp = this.strength_lv * (10 - Math.random())
        this.hp = this.max_hp;
        // 攻撃力 = Lv
        this.power = this.strength_lv;

        if( 0.5 < Math.random() ){
            this.image = this.game.image_library.get_image( 'bird_hachidori' )
            this.name = 'ハチドリ';
        } else {
            this.image = this.game.image_library.get_image( 'bird_toki_fly' )
            this.name = 'トキ';
        }
    }
    enemy_move_ai(){

        // プレイヤーの方に向かう
        let vec = this.get_vector_to_point( this.position_x, this.position_y);
        this.vx += vec.x * this.dash_speed;
        this.vy += vec.y * this.dash_speed;
        // 時々位置変えする
        if( Math.random() < 0.01 ){
            this.reset_position();
        }
        // 弾を撃つ
        if( 0 < this.fire_cool_time_count ){
            this.fire_cool_time_count -= 1;
        } else {
            this.fire_bullet();
            this.fire_cool_time_count = this.fire_cool_time;
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
