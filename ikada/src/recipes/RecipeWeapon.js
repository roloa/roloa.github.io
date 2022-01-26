
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
            ['基本的な遠距離武器です。','Lv2'],
            ['wood', 'cloth', 'feather'],
            [20, 10, 1],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'クロスボウ';
                new_item.set_image( 'yumiya_bowgun' );

                new_item.saving_data.basic_power = 10;
                new_item.saving_data.cool_time = 20;
                return new_item; },
            ''
        );

        // 速射型
        // ドライヤー Lv1
        // エアブラシ Lv2

        // バランス型
        // ピストル Lv1
        // 光線銃

        // 狙撃型
        //
        // ライフル Lv1-2

        // 状態異常
        // グルーガン Lv2
        // 毒矢 Lv2

        // 近接
        // 槍類 Lv0
        // 火炎放射 Lv1
        // チェーンソー Lv2

        c_r.add_recipe( category,
            ['遠距離武器です。','連射が早いです。'],
            ['parts', 'cloth', 'plastic'],
            [20, 20, 30],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '空気銃';
                new_item.set_image( 'hair_drier' );
                new_item.set_bullet_image('air_ball');

                new_item.saving_data.basic_power = 5;
                new_item.saving_data.cool_time = 7;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','連射が早いです。'],
            ['circuit', 'silver'],
            [20, 20],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'エアブラシ';
                new_item.set_image( 'tosou_airbrush' );
                new_item.set_bullet_image('air_ball');

                new_item.saving_data.basic_power = 9;
                new_item.saving_data.cool_time = 3;
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
                new_item.saving_data.basic_power = 16;
                new_item.saving_data.cool_time = 20;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','バランスの取れた性能です。'],
            ['circuit', 'lead', 'plastic'],
            [17, 17, 17],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '光線銃';
                new_item.set_image( 'kousenju' );
                new_item.set_bullet_image('bullet_thunder');

                new_item.saving_data.basic_power = 32;
                new_item.saving_data.cool_time = 20;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','大量の弾をばらまきます。'],
            ['plastic', 'iron', 'feather' ],
            [30, 30, 100],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'ラッパ銃';
                new_item.set_image( 'soccer_vuvuzela_music' );
                new_item.set_bullet_image('bullet_feather_white');

                new_item.saving_data.basic_power = 5;
                new_item.saving_data.cool_time = 20;
                new_item.saving_data.fire_spread = 5;
                new_item.saving_data.fire_spread_angle = 0.2;
                new_item.saving_data.bullet_lifetime = 25;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','大量の弾をばらまきます。'],
            ['silver', 'iron', 'feather' ],
            [30, 30, 100],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '3連ラッパ銃';
                new_item.set_image( 'soccer_cheer_horn_music' );
                new_item.set_bullet_image('bullet_feather_white');

                new_item.saving_data.basic_power = 5;
                new_item.saving_data.cool_time = 20;
                new_item.saving_data.fire_spread = 15;
                new_item.saving_data.fire_spread_angle = 0.1;
                new_item.saving_data.bullet_lifetime = 25;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','高威力ですが、連射が遅いです。'],
            ['parts', 'wood', 'iron'],
            [15, 50, 50],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'ライフル';
                new_item.set_image( 'hinawaju' );
                new_item.set_bullet_image('bullet_right');

                new_item.saving_data.basic_power = 110;
                new_item.saving_data.cool_time = 100;
                new_item.saving_data.bullet_velocity = 30;

                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['近距離武器です。',''],
            ['parts', 'iron', 'fuel'],
            [1, 20, 150],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'バーナー缶';
                new_item.set_image( 'gas_burner' );
                new_item.set_bullet_image('bullet_fire');

                new_item.saving_data.basic_power = 8;
                new_item.saving_data.cool_time = 5;
                new_item.saving_data.fire_spread = 2;
                new_item.saving_data.fire_spread_angle = 0.1;
                new_item.saving_data.bullet_velocity = 2;
                new_item.saving_data.bullet_lifetime = 50;

                return new_item;
            },
            ''
        );

        c_r.add_recipe( category,
            ['近距離武器です。',''],
            ['circuit', 'parts', 'iron'],
            [10, 10, 50],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = 'チェーンソー';
                new_item.set_image( 'chain_saw' );
                new_item.set_bullet_image('attack_effect');

                new_item.saving_data.basic_power = 20;
                new_item.saving_data.cool_time = 5;
                new_item.saving_data.fire_spread = 8;
                new_item.saving_data.fire_spread_angle = 0.5;
                new_item.saving_data.bullet_velocity = 20;
                new_item.saving_data.bullet_lifetime = 5;

                return new_item;
            },
            ''
        );

        c_r.add_recipe( category,
            ['近距離武器です。',''],
            ['wood', 'iron'],
            [10, 10],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.item_name = '槍';
                new_item.set_image( 'buki_yari' );
                new_item.set_bullet_image('attack_effect');

                new_item.saving_data.basic_power = 8;
                new_item.saving_data.cool_time = 20;
                new_item.saving_data.bullet_lifetime = 10;
                return new_item;
            },
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

                new_item.saving_data.basic_power = 8;
                new_item.saving_data.fire_spread = 3;
                new_item.saving_data.fire_spread_angle = 0.3;
                new_item.saving_data.cool_time = 20;
                new_item.saving_data.bullet_lifetime = 10;
                return new_item;
            },
            ''
        );
    }
}
