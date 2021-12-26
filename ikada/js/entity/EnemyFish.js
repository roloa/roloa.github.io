
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

        this.fire_spread = 3;
        this.fire_spread_angle = 0.1;
        this.bullet_lifetime = 100;
        this.bullet_velocity = 10;
        this.fire_cool_time = 100;
        this.fire_cool_time_count = 0;
        this.blast_lifetime = 0;

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
                this.vy += 2;
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
            this.vx = -3;
        }
    }
    fire_bullet(){

        let rad = Math.atan2(
            this.game.world.player.y - this.y,
            this.game.world.player.x - this.x
        );


        for( let i = 0 ; i < this.fire_spread ; i++ ){
            let bullet = new EnemyBullet( this.game );
            bullet.owner_enemy = this;

            let fire_rad = rad;
            if( 0 < i){
                let spread_direction = this.fire_spread_angle;
                for( let spread_num = 1 ; spread_num <= i ; spread_num++ ){
                    spread_direction = spread_direction * -spread_num;
                    fire_rad += spread_direction;
                }
            }
            bullet.vx = Math.cos(fire_rad) * this.bullet_velocity;
            bullet.vy = Math.sin(fire_rad) * this.bullet_velocity;
            bullet.x = this.x + bullet.vx;
            bullet.y = this.y + bullet.vy;

            bullet.life_time = this.bullet_lifetime;
            if( 0 < this.blast_lifetime ){
                bullet.is_blaster_bullet = true;
            }

            bullet.line_x = Math.cos(fire_rad) * 30;
            bullet.line_y = Math.sin(fire_rad) * 30;
            this.game.world.push_entity( bullet );
        }
    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}
