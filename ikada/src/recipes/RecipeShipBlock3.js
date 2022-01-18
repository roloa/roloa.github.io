
import {Scouter} from '../tool_item/Scouter.js';

// import {} from '../tool_item/.js';

export class RecipeShipBlock3 extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category ){

        c_r.add_recipe( category,
            ['クリックした敵の情報を調べることが出来ます。'],
            ['mech_parts'],
            [3],
            function( game ){ return new Scouter( game ); },
            ''
        );


    }
}
