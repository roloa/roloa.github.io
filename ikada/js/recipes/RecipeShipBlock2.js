
import {BuildBlock} from '../tool_item/BuildBlock.js'

import {BotHouseDog} from '../ship_block/BotHouseDog.js';
import {BotHouseCat} from '../ship_block/BotHouseCat.js';

// import {} from '../tool_item/.js';

export class RecipeShipBlock2 extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category ){

        c_r.add_recipe( category,
            ['イヌ型ロボットです。','砲撃を優先して手伝ってくれます。'],
            ['mech_parts'],
            [10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new BotHouseDog( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['ネコ型ロボットです。','弾薬や燃料の補給を優先して手伝ってくれます。'],
            ['mech_parts'],
            [10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new BotHouseCat( game ) ); },
            ''
        );


    }
}
