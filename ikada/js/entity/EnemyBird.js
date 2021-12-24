
import {Enemy} from './Enemy.js';

export class EnemyBird extends Enemy {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'bird_kamome' )

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

    generate_enemy_bird(){
        // 鳥の敵を生成する
        // 座標が設定済みの前提で、高度に応じたレベルの敵になる

        let altitude = this.y / 32;

        if( altitude > -100 ){
            this.image = this.game.image_library.get_image( 'bird_hachidori' )
        } else if( altitude > -200){
            this.image = this.game.image_library.get_image( 'bird_toki_fly' )
        } else if( altitude > -300){
            this.image = this.game.image_library.get_image( 'bird_tonbi' )

        } else if( altitude > -400){
            this.image = this.game.image_library.get_image( 'animal_washi' )

        } else if( altitude > -500){
            this.image = this.game.image_library.get_image( 'fantasy_griffon' )

        } else if( altitude > -600){
            this.image = this.game.image_library.get_image( 'fantasy_peryton' )

        } else if( altitude > -700){
            this.image = this.game.image_library.get_image( 'fantasy_dragon_wyvern' )

        } else if( altitude > -800){
            this.image = this.game.image_library.get_image( 'fantasy_dragon' )

        } else if( altitude > -900){
            this.image = this.game.image_library.get_image( 'youkai_suzaku' )

        } else if( altitude > -1000){
            this.image = this.game.image_library.get_image( 'fantasy_ryu_doragon_asia' )
        } else {
            this.image = this.game.image_library.get_image( 'fantasy_ryu_doragon_asia' )
        }
    }
    on_update(){
        super.on_update();


        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

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

    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}
