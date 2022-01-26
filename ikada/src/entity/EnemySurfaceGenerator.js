
import {EnemySurfaceBird} from './EnemySurfaceBird.js';

import {ResourceItem} from '../tool_item/ResourceItem.js';

import {ChickenRawMoto} from '../tool_item/d_foods/ChickenRawMoto.js';
import {ChickenRawSaki} from '../tool_item/d_foods/ChickenRawSaki.js';
import {FishKirimi} from '../tool_item/d_foods/FishKirimi.js';

export class EnemySurfaceGenerator {

    constructor( game ){
        this.game = game;

    }

    generate_by_ship_level( ship_level ){
        // 鳥の敵を生成する
        let new_enemy = new EnemySurfaceBird( this.game );

        new_enemy.strength_lv = (ship_level + 1) * 10;

        // HP = Lv x (9~10)
        new_enemy.max_hp = new_enemy.strength_lv * (10 - Math.random())
        new_enemy.hp = new_enemy.max_hp;
        // 攻撃力 = Lv
        new_enemy.power = new_enemy.strength_lv;

        let enemy_type_value = 10;
        if( 3 <= ship_level ){
            enemy_type_value = 100;
        } else if( 2 <= ship_level ){
            enemy_type_value = 100;
        } else if( 1 <= ship_level){
            enemy_type_value = 50;
        } else {
            enemy_type_value = 10;
        }

        enemy_type_value = 50 + 50 * Math.random();
        if( enemy_type_value < 6 ){
            new_enemy.image = this.game.image_library.get_image( 'bird_hachidori' )
            new_enemy.name = 'ハチドリ';
            // 突撃タイプ
            new_enemy.do_tackle_attack = true;
            new_enemy.set_max_hp( 15 );
            new_enemy.direct_damage = 8;

            if( Math.random() < 0.5){
                new_enemy.drop_tool_item = this.drop_material( 'hachidori_wing',
                    ['feather', 'cloth'],
                    [10, 3] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }
        } else if( enemy_type_value < 11 ){
            new_enemy.image = this.game.image_library.get_image( 'bird_toki_fly' )
            new_enemy.name = 'トキ';
            // 突撃射撃タイプ
            new_enemy.do_fire_attack = true;
            new_enemy.do_tackle_attack = true;
            new_enemy.set_max_hp( 15 );
            new_enemy.direct_damage = 4;
            new_enemy.bullet_damage = 4;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_feather_white');

            if( Math.random() < 0.5){
                new_enemy.drop_tool_item = this.drop_material( 'toki_wing',
                    ['feather', 'stone'],
                    [10, 3] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 21 ){
            new_enemy.image = this.game.image_library.get_image( 'bird_tonbi' )
            new_enemy.name = 'トビ';
            // 頂点突撃射撃タイプ
            new_enemy.is_fly_above = true;
            new_enemy.do_fire_attack = true;
            new_enemy.do_tackle_attack = true;
            new_enemy.distance_from_ship = 250;

            new_enemy.set_max_hp( 30 );
            new_enemy.direct_damage = 12;
            new_enemy.bullet_damage = 12;

            new_enemy.bullet_image = this.game.image_library.get_image('bullet_feather_white');

            if( Math.random() < 0.8){
                new_enemy.drop_tool_item = this.drop_material( 'tonbi_wing',
                    ['feather', 'stone'],
                    [20, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }


        } else if( enemy_type_value < 31 ){
            new_enemy.image = this.game.image_library.get_image( 'animal_washi' )
            new_enemy.name = 'ワシ';
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_feather_white');
            // 後方射撃タイプ
            new_enemy.is_back_attack = true;
            new_enemy.do_fire_attack = true;
            new_enemy.set_max_hp( 30 );
            new_enemy.direct_damage = 12;
            new_enemy.bullet_damage = 12;

            if( Math.random() < 0.8){
                new_enemy.drop_tool_item = this.drop_material( 'washi_wing',
                    ['feather', 'cloth'],
                    [20, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 41 ){
            new_enemy.image = this.game.image_library.get_image( 'dinosaur_quetzalcoatlus' )
            new_enemy.name = 'ケツァルコアトル';
            // 遠距離射撃タイプ
            new_enemy.do_fire_attack = true;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_thunder');
            new_enemy.set_max_hp( 40 );
            new_enemy.direct_damage = 12;
            new_enemy.bullet_damage = 12;

            if( Math.random() < 0.99){
                new_enemy.drop_tool_item = this.drop_material( 'quetzalcoatlus_beak',
                ['parts', 'iron', 'lead'],
                [3, 10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 51 ){
            new_enemy.image = this.game.image_library.get_image( 'kodai_microraptor' )
            new_enemy.name = 'ミクロラプトル';
            // 突撃射撃タイプ
            new_enemy.do_fire_attack = true;
            new_enemy.do_tackle_attack = true;
            new_enemy.set_max_hp( 40 );
            new_enemy.direct_damage = 18;
            new_enemy.bullet_damage = 7;

            new_enemy.bullet_image = this.game.image_library.get_image('bullet_thunder');

            if( Math.random() < 0.99){
                new_enemy.drop_tool_item = this.drop_material( 'microraptor_wing',
                ['parts', 'iron', 'plastic'],
                [3, 10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 67 ){
            // レベル3
            new_enemy.image = this.game.image_library.get_image( 'fantasy_griffon' )
            new_enemy.name = 'グリフォン';
            // 頂点射撃タイプ
            new_enemy.set_max_hp( 90 );
            new_enemy.is_fly_above = true;
            new_enemy.do_fire_attack = true;

            new_enemy.direct_damage = 25;
            new_enemy.bullet_damage = 7;
            // グリフォンは3way弾
            new_enemy.fire_spread = 3;
            new_enemy.fire_spread_angle = 0.2;


            new_enemy.bullet_image = this.game.image_library.get_image('bullet_feather_white');


            if( Math.random() < 0.8){
                new_enemy.drop_tool_item = this.drop_material( 'griffon_wing',
                ['circuit', 'silver'],
                [10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 83 ){
            new_enemy.image = this.game.image_library.get_image( 'fantasy_peryton' )
            new_enemy.name = 'ペガシカ';
            // 遠距離射撃タイプ
            new_enemy.set_max_hp( 100 );
            new_enemy.do_fire_attack = true;
            new_enemy.distance_from_ship = 250;


            new_enemy.direct_damage = 25;
            new_enemy.bullet_damage = 7;
            // ペガシカは5連射
            new_enemy.burst_fire = 5;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_thunder');

            if( Math.random() < 0.9){
                new_enemy.drop_tool_item = this.drop_material( 'peryton_wing',
                ['circuit', 'silver'],
                [10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 101 ){
            new_enemy.image = this.game.image_library.get_image( 'youkai_suzaku' )
            new_enemy.name = '火の鳥';
            // 突撃射撃タイプ
            new_enemy.set_max_hp( 80 );
            new_enemy.do_fire_attack = true;
            new_enemy.do_tackle_attack = true;
            new_enemy.direct_damage = 25;
            new_enemy.bullet_damage = 20;
            new_enemy.bullet_lifetime = 20;
            // 火の鳥はブラスター弾
            new_enemy.is_blaster_bullet = true;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_fire');


            if( Math.random() < 0.9){
                new_enemy.drop_tool_item = this.drop_material( 'suzaku_wing',
                ['circuit', 'silver'],
                [10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 999 ){
            new_enemy.image = this.game.image_library.get_image( 'fantasy_dragon_wyvern' )
            new_enemy.name = 'ワイバーン';
        } else if( enemy_type < 999 ){
            new_enemy.image = this.game.image_library.get_image( 'fantasy_dragon' )
            new_enemy.name = 'ドラゴン';
        } else {
            new_enemy.image = this.game.image_library.get_image( 'fantasy_dragon' )
            new_enemy.name = 'ドラゴン';
        }
        return new_enemy;
    }
    drop_material( image_name, name_list, amount_list ){
        let new_item = new ResourceItem( this.game );
        new_item.set_image( image_name );
        for( let i = 0 ; i < name_list.length ; i++){
            let amount = Math.floor( Math.max( amount_list[i] * (Math.random() * 1.5 + 0.5), 1) );
            new_item.add_material( name_list[i], amount );
        }
        return new_item;
    }
    random_chicken(){
        if( Math.random() < 0.5 ){
            return new ChickenRawMoto( this.game );
        } else {
            return new ChickenRawSaki( this.game );
        }
    }
}
