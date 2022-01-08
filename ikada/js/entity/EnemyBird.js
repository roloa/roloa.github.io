
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

        // Lv = (高度10m)の2乗 x 0.1 + 10
        // 100m = Lv10
        // 200m = Lv40
        // 300m = Lv90
        // 400m = Lv160
        // 500m = Lv250
        //1000m = Lv1000
        this.strength_lv = Math.floor((( altitude*0.1 ) ** 2)*0.1 + 10);

        // HP = Lv x (9~10)
        this.max_hp = this.strength_lv * (10 - Math.random())
        this.hp = this.max_hp;
        // 攻撃力 = Lv
        this.power = this.strength_lv;

        if( altitude > -100 ){
            this.image = this.game.image_library.get_image( 'bird_hachidori' )
            this.name = 'ハチドリ';
        } else if( altitude > -200){
            this.image = this.game.image_library.get_image( 'bird_toki_fly' )
            this.name = 'トキ';
        } else if( altitude > -300){
            this.image = this.game.image_library.get_image( 'bird_tonbi' )
            this.name = 'トビ';
        } else if( altitude > -400){
            this.image = this.game.image_library.get_image( 'animal_washi' )
            this.name = 'ワシ';
        } else if( altitude > -500){
            this.image = this.game.image_library.get_image( 'fantasy_griffon' )
            this.name = 'グリフォン';
        } else if( altitude > -600){
            this.image = this.game.image_library.get_image( 'fantasy_peryton' )
            this.name = 'ペリュトン';
        } else if( altitude > -700){
            this.image = this.game.image_library.get_image( 'fantasy_dragon_wyvern' )
            this.name = 'ワイバーン';
        } else if( altitude > -800){
            this.image = this.game.image_library.get_image( 'fantasy_dragon' )
            this.name = 'ドラゴン';
        } else if( altitude > -900){
            this.image = this.game.image_library.get_image( 'youkai_suzaku' )
            this.name = '朱雀';
        } else if( altitude > -1000){
            this.image = this.game.image_library.get_image( 'fantasy_ryu_doragon_asia' )
            this.name = '龍';
        } else {
            this.image = this.game.image_library.get_image( 'fantasy_ryu_doragon_asia' )
        }

        // 空中戦を調整するまで、無条件で朱雀
        this.image = this.game.image_library.get_image( 'youkai_suzaku' )
        this.name = '朱雀';

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
