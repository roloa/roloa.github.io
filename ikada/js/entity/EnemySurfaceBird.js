
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
        this.dash_speed = 2;
        this.is_angry = false;

        this.showing_hp_timer = 0;

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
