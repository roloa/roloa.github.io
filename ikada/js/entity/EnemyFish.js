
import {Enemy} from './Enemy.js';

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
        this.dash_speed = 2;
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

    on_update(){
        super.on_update();

        // 怒っている場合
        if( this.is_angry ){

            // プレイヤーの方に向かう
            let vec = this.get_vector_to_player();
            this.vx = vec.x * this.dash_speed;
            this.vy = vec.y * this.dash_speed;

            // 弾を撃つ
        } else {
            // 平常時
            this.vx = -1;
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
