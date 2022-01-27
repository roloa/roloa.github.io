
import {Spear} from '../tool_item/Spear.js';
import {Bow} from '../tool_item/Bow.js';
import {WeaponItem} from '../tool_item/WeaponItem.js';

// import {} from '../tool_item/.js';

export class RecipeWeapon extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category){

        c_r.add_recipe( category,
            ['最も弱い近距離武器です。',''],
            ['wood', 'iron'],
            [10, 10],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '槍';
                new_item.set_image( 'buki_yari' );
                new_item.set_bullet_image('attack_effect');

                new_item.saving_data.basic_power = 6;
                new_item.saving_data.cool_time = 20;
                new_item.saving_data.bullet_lifetime = 10;
                return new_item;
            },
            ''
        );
        c_r.add_recipe( category,
            ['最も弱い遠距離武器です。','Lv1'],
            ['wood', 'cloth'],
            [10, 5],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '弓矢';
                new_item.set_image( 'yumiya' );

                new_item.saving_data.basic_power = 4;
                new_item.saving_data.cool_time = 25;
                return new_item; },
            ''
        );
        c_r.add_recipe( category,
            ['近距離武器です。','3方向に一度に攻撃できます。'],
            ['wood', 'iron', 'feather'],
            [30, 30, 3],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'トライデント';
                new_item.set_image( 'war_trident' );
                new_item.set_bullet_image('attack_effect');

                new_item.saving_data.basic_power = 6;
                new_item.saving_data.fire_spread = 3;
                new_item.saving_data.fire_spread_angle = 0.3;
                new_item.saving_data.cool_time = 20;
                new_item.saving_data.bullet_lifetime = 10;
                return new_item;
            },
            ''
        );
        c_r.add_recipe( category,
            ['基本的な遠距離武器です。',''],
            ['wood', 'cloth', 'feather'],
            [20, 10, 1],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'クロスボウ';
                new_item.set_image( 'yumiya_bowgun' );

                new_item.saving_data.basic_power = 7;
                new_item.saving_data.cool_time = 20;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['近距離武器です。',''],
            ['parts', 'iron', 'fuel'],
            [5, 30, 150],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'バーナー缶';
                new_item.set_image( 'gas_burner' );
                new_item.set_bullet_image('bullet_fire');

                new_item.saving_data.basic_power = 6;
                new_item.saving_data.cool_time = 10;
                new_item.saving_data.fire_spread = 2;
                new_item.saving_data.fire_spread_angle = 0.4;
                new_item.saving_data.bullet_velocity = 3;
                new_item.saving_data.bullet_lifetime = 30;

                return new_item;
            },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','連射が早いです。'],
            ['parts', 'cloth', 'plastic'],
            [5, 30, 10],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '空気銃';
                new_item.set_image( 'hair_drier' );
                new_item.set_bullet_image('air_ball');

                new_item.saving_data.basic_power = 3;
                new_item.saving_data.cool_time = 7;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['中距離武器です。','放射状に弾をばらまきます。'],
            ['plastic', 'iron', 'feather' ],
            [20, 20, 99],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'ラッパ銃';
                new_item.set_image( 'soccer_vuvuzela_music' );
                new_item.set_bullet_image('bullet_feather_white');

                new_item.saving_data.basic_power = 5;
                new_item.saving_data.cool_time = 30;
                new_item.saving_data.fire_spread = 5;
                new_item.saving_data.fire_spread_angle = 0.3;
                new_item.saving_data.bullet_lifetime = 25;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','バランスの取れた性能です。'],
            ['parts', 'lead', 'plastic'],
            [17, 17, 17],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'ピストル';
                new_item.set_image( 'starter_starting_pistol' );
                new_item.set_bullet_image('bullet_right');
                new_item.saving_data.basic_power = 10;
                new_item.saving_data.cool_time = 20;
                return new_item; },
            ''
        );
        c_r.add_recipe( category,
            ['高威力ですが、連射が遅いです。'],
            ['parts', 'wood', 'lead'],
            [15, 50, 50],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'ライフル';
                new_item.set_image( 'hinawaju' );
                new_item.set_bullet_image('bullet_right');

                new_item.saving_data.basic_power = 50;
                new_item.saving_data.cool_time = 100;
                new_item.saving_data.bullet_velocity = 30;

                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['最強の近距離武器です。',''],
            ['circuit', 'parts', 'iron', 'fuel'],
            [10, 20, 50, 100],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'チェーンソー';
                new_item.set_image( 'chain_saw' );
                new_item.set_bullet_image('attack_effect');

                new_item.saving_data.basic_power = 6;
                new_item.saving_data.cool_time = 10;
                new_item.saving_data.fire_spread = 7;
                new_item.saving_data.fire_spread_angle = 0.5;
                new_item.saving_data.bullet_velocity = 15;
                new_item.saving_data.bullet_lifetime = 4;

                return new_item;
            },
            ''
        );

        c_r.add_recipe( category,
            ['連射が最も早い銃です。'],
            ['silver', 'parts' ],
            [50, 20],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'エアブラシ';
                new_item.set_image( 'tosou_airbrush' );
                new_item.set_bullet_image('air_ball');

                new_item.saving_data.basic_power = 3;
                new_item.saving_data.cool_time = 5;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['中距離武器です。','大量の弾をばらまきます。'],
            ['silver', 'plastic', 'feather' ],
            [33, 33, 99],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '3連ラッパ銃';
                new_item.set_image( 'soccer_cheer_horn_music' );
                new_item.set_bullet_image('bullet_feather_white');

                new_item.saving_data.basic_power = 3    ;
                new_item.saving_data.cool_time = 40;
                new_item.saving_data.fire_spread = 15;
                new_item.saving_data.fire_spread_angle = 0.1;
                new_item.saving_data.bullet_lifetime = 25;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','ピストルの上位モデルです。'],
            ['circuit', 'lead', 'plastic'],
            [17, 17, 17],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '光線銃';
                new_item.set_image( 'kousenju' );
                new_item.set_bullet_image('bullet_thunder');

                new_item.saving_data.basic_power = 15;
                new_item.saving_data.cool_time = 20;
                return new_item; },
            ''
        );

    }
}
