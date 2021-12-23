
import {Spear} from '../tool_item/Spear.js';
import {Bow} from '../tool_item/Bow.js';

// import {} from '../tool_item/.js';

export class RecipeWeapon extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category){


        c_r.add_recipe( category,
            ['遠距離武器です。','Lv1'],
            ['wood', 'cloth'],
            [3, 1],
            function( game ){
                let new_item = new Bow( game );
                new_item.saving_data.power = 11;
                return new_item; },
            'Lv1'
        );
        c_r.add_recipe( category,
            ['遠距離武器です。','Lv2'],
            ['wood', 'cloth'],
            [3, 1],
            function( game ){
                let new_item = new Bow( game );
                new_item.saving_data.power = 33;
                return new_item; },
            'Lv2'
        );

        c_r.add_recipe( category,
            ['遠距離武器です。','Lv5'],
            ['wood', 'cloth'],
            [3, 1],
            function( game ){
                let new_item = new Bow( game );
                new_item.saving_data.power = 2000;
                return new_item; },
            'Lv5'
        );

        c_r.add_recipe( category,
            ['近接武器です。','Lv1'],
            ['wood', 'metal'],
            [3, 1],
            function( game ){
                let new_item = new Spear( game );
                new_item.saving_data.power = 25;
                return new_item;
            },
            'Lv1'
        );

        c_r.add_recipe( category,
            ['近接武器です。','Lv2'],
            ['wood', 'metal'],
            [3, 1],
            function( game ){
                let new_item = new Spear( game );
                new_item.saving_data.power = 51;
                return new_item;
            },
            'Lv1'
        );
    }
}
