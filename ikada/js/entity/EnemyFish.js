
import {Enemy} from './Enemy.js';
import {EnemyBullet} from './EnemyBullet.js';

export class EnemyFish extends Enemy {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'fish_sakana_iwashi' )

        this.width = 128;
        this.height = 128;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;
        this.max_hp = 100;
        this.hp = 100;

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 0.1;
        this.is_angry = false;

        this.showing_hp_timer = 0;

    }

    generate_enemy_fish(){
        // 鳥の敵を生成する
        // 座標が設定済みの前提で、高度に応じたレベルの敵になる
        let depth = this.y / 32;

        if( depth < 100 ){
            this.image = this.game.image_library.get_image( 'fish_sakana_sake' )
        } else if( depth < 200){
            this.image = this.game.image_library.get_image( 'fish_salmon' )
        } else if( depth < 300){
            this.image = this.game.image_library.get_image( 'fish_maguro2' )

        } else if( depth < 400){
            this.image = this.game.image_library.get_image( 'fish_mola2' )

        } else if( depth < 500){
            this.image = this.game.image_library.get_image( 'fish_minokasago' )

        } else if( depth < 600){
            this.image = this.game.image_library.get_image( 'cthulhu_deep_ones' )

        } else if( depth < 700){
            this.image = this.game.image_library.get_image( 'animal_shachi_killer_whale' )

        } else if( depth < 800){
            this.image = this.game.image_library.get_image( 'character_cthulhu_kuturufu' )

        } else if( depth < 900){
            this.image = this.game.image_library.get_image( 'fantasy_genbu' )

        } else if( depth < 1000){
            this.image = this.game.image_library.get_image( 'fantasy_seiryu' )
        } else {
            this.image = this.game.image_library.get_image( 'fantasy_seiryu' )
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
            if( this.y < 0 ){
                // 海から飛び出した
                this.is_preparing_jump = true;
            }

            // 弾を撃つ
            if( 0 < this.fire_cool_time_count ){
                this.fire_cool_time_count -= 1;
            } else {
                this.fire_bullet();
                this.fire_cool_time_count = this.fire_cool_time;
            }
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
        }
    }

    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

        if( this.y < 0 ){
            // 海から飛び出した
            this.vy += 2;
            this.target_vy = 1;
        }

    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}
