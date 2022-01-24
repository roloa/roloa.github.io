
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
            enemy_type_value = 60;
        } else if( 1 <= ship_level){
            enemy_type_value = 50;
        } else {
            enemy_type_value = 10;
        }
        enemy_type_value = enemy_type_value * Math.random();
        if( enemy_type_value < 6 ){
            new_enemy.image = this.game.image_library.get_image( 'bird_hachidori' )
            new_enemy.name = 'ハチドリ';
            // 突撃タイプ
            new_enemy.do_tackle_attack = true;
            new_enemy.direct_damage = 8;

            if( Math.random() < 0.5){
                new_enemy.drop_tool_item = this.drop_material( 'hachidori_wing',
                    ['feather', 'seed', 'cloth'],
                    [10, 10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }
        } else if( enemy_type_value < 11 ){
            new_enemy.image = this.game.image_library.get_image( 'bird_toki_fly' )
            new_enemy.name = 'トキ';
            // 突撃射撃タイプ
            new_enemy.do_fire_attack = true;
            new_enemy.do_tackle_attack = true;
            new_enemy.direct_damage = 4;
            new_enemy.bullet_damage = 4;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_feather_white');

            if( Math.random() < 0.5){
                new_enemy.drop_tool_item = this.drop_material( 'toki_wing',
                    ['feather', 'stone', 'cloth'],
                    [10, 10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 21 ){
            new_enemy.image = this.game.image_library.get_image( 'bird_tonbi' )
            new_enemy.name = 'トビ';
            // 頂点射撃タイプ
            new_enemy.is_fly_above = true;
            new_enemy.do_fire_attack = true;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_feather_white');

            if( Math.random() < 0.8){
                new_enemy.drop_tool_item = this.drop_material( 'tonbi_wing',
                    ['feather', 'stone'],
                    [100, 100] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }


        } else if( enemy_type_value < 31 ){
            new_enemy.image = this.game.image_library.get_image( 'animal_washi' )
            new_enemy.name = 'ワシ';
            // 突撃射撃タイプ
            new_enemy.do_fire_attack = true;
            new_enemy.do_tackle_attack = true;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_feather_white');

            if( Math.random() < 0.8){
                new_enemy.drop_tool_item = this.drop_material( 'washi_wing',
                    ['feather', 'stone'],
                    [100, 100] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 41 ){
            new_enemy.image = this.game.image_library.get_image( 'dinosaur_quetzalcoatlus' )
            new_enemy.name = 'ケツァルコアトル';
            // 遠距離射撃タイプ
            new_enemy.do_fire_attack = true;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_thunder');

            if( Math.random() < 0.9){
                new_enemy.drop_tool_item = this.drop_material( 'quetzalcoatlus_beak',
                ['parts', 'iron', 'lead'],
                [10, 10, 10,] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 51 ){
            new_enemy.image = this.game.image_library.get_image( 'kodai_microraptor' )
            new_enemy.name = 'ミクロラプトル';
            // 後方射撃タイプ
            new_enemy.is_back_attack = true;
            new_enemy.do_fire_attack = true;
            new_enemy.bullet_image = this.game.image_library.get_image('bullet_thunder');

            if( Math.random() < 0.9){
                new_enemy.drop_tool_item = this.drop_material( 'microraptor_wing',
                ['parts', 'iron', 'plastic'],
                [10, 10, 10,] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 61 ){
            // レベル3
            new_enemy.image = this.game.image_library.get_image( 'fantasy_griffon' )
            new_enemy.name = 'グリフォン';

            if( Math.random() < 0.8){
                new_enemy.drop_tool_item = this.drop_material( 'griffon_wing',
                ['circuit', 'silver'],
                [10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 999 ){
            new_enemy.image = this.game.image_library.get_image( 'fantasy_peryton' )
            new_enemy.name = 'ペリュトン';

            if( Math.random() < 0.9){
                new_enemy.drop_tool_item = this.drop_material( 'peryton_wing',
                ['circuit', 'silver'],
                [10, 10] );
            } else {
                new_enemy.drop_tool_item = this.random_chicken();
            }

        } else if( enemy_type_value < 999 ){
            new_enemy.image = this.game.image_library.get_image( 'youkai_suzaku' )
            new_enemy.name = 'フェニックス';

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
