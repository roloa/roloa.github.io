
import {Enemy} from './Enemy.js';

export class Kamome extends Enemy {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'bird_kamome' )

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

        this.is_preparing_jump = false;
        this.preparing_jump_minimum_time = 50;
        this.preparing_jump_timer = 0;

        this.showing_hp_timer = 0;

    }
    on_update(){
        super.on_update();

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
            if( 0 < this.y ){
                // 海につっこんだ
                this.vy -= 2;
                this.is_preparing_jump = true;
            }

            // 弾を撃つ
        } else {
            // 平常時
            this.vx = -3;
        }

        // プレイヤーとの当たり判定
        if( this.test_hit( this.game.world.player.x, this.game.world.player.y ) ){
            let knockback_vec = this.get_vector_to_player();
            knockback_vec.x *= 20;
            knockback_vec.y *= 20;
            let damage = 10;
            this.game.world.player.hit_damage( damage, knockback_vec, this );
        }

    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}
