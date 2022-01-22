
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
            [5, 3],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.name = '弓矢';
                new_item.set_image( 'yumiya' );

                new_item.saving_data.basic_power = 12;
                new_item.saving_data.cool_time = 25;
                return new_item; },
            ''
        );
        c_r.add_recipe( category,
            ['遠距離武器です。','Lv2'],
            ['wood', 'cloth', 'feather'],
            [10, 5, 3],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.name = 'クロスボウ';
                new_item.set_image( 'yumiya_bowgun' );

                new_item.saving_data.basic_power = 21;
                new_item.saving_data.cool_time = 20;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','Lv5'],
            ['parts', 'iron', 'lead'],
            [2, 10, 10],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.name = 'ライフル';
                new_item.set_image( 'hinawaju' );
                new_item.saving_data.basic_power = 150;
                return new_item; },
            ''
        );

        c_r.add_recipe( category,
            ['近距離武器です。',''],
            ['wood', 'stone'],
            [5, 1],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.name = '槍';
                new_item.set_image( 'buki_yari' );

                new_item.saving_data.basic_power = 35;
                new_item.saving_data.bullet_lifetime = 10;
                return new_item;
            },
            ''
        );

        c_r.add_recipe( category,
            ['近距離武器です。','3方向に一度に攻撃できます。'],
            ['wood', 'iron', 'feather'],
            [15, 5, 3],
            function( game ){
                let new_item = new WeaponItem( game );
                new_item.saving_data.name = '三叉槍';
                new_item.set_image( 'war_trident' );

                new_item.saving_data.basic_power = 35;
                new_item.saving_data.fire_spread = 3;
                new_item.saving_data.fire_spread_angle = 0.3;
                new_item.saving_data.bullet_lifetime = 10;
                return new_item;
            },
            ''
        );
    }
}
