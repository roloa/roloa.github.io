
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
            ['遠距離武器です。',''],
            ['wood', 'cloth'],
            [3, 1],
            function( game ){ return new Bow( game ); },
            'Lv1'
        );

        c_r.add_recipe( category,
            ['近接武器です。',''],
            ['wood', 'metal'],
            [3, 1],
            function( game ){ return new Spear( game ); },
            'Lv1'
        );
    }
}
