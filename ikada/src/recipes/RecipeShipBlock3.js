
import {Scouter} from '../tool_item/Scouter.js';

import {VictoryRocket} from '../ship_block/VictoryRocket.js';
import {LevelFlag1} from '../ship_block/LevelFlag1.js';
import {LevelFlag2} from '../ship_block/LevelFlag2.js';
import {LevelFlag3} from '../ship_block/LevelFlag3.js';
import {BuildBlock} from '../tool_item/BuildBlock.js';

// import {} from '../tool_item/.js';

export class RecipeShipBlock3 extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category ){


        c_r.add_recipe( category,
            ['設置すると舟レベルを[1]に上げます。','上位の敵が出現します。'],
            ['wood', 'cloth', 'feather'],
            [30, 20, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag1( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['設置すると舟レベルを[2]に上げます。','上位の敵が出現します。'],
            ['plastic', 'lead', 'cloth'],
            [100, 100, 100],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag2( game ) ); },
            ''
        );
        // レベル3はまだ
        // c_r.add_recipe( category,
        //     ['設置すると舟レベルを[3]に上げます。','上位の敵が出現します。'],
        //     ['silver', 'fur', 'feather'],
        //     [50, 30, 100],
        //     function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag3( game ) ); },
        //     ''
        // );

        c_r.add_recipe( category,
            ['ヴィクトリーロケット。','これを設置して作動させたら*勝利*です。'],
            ['silver','wood','feather','fuel'],
            [100, 300, 300, 1000],
            function( game ){ return new BuildBlock( game ).set_ship_block( new VictoryRocket( game ) ); },
            ''
        );


    }
}
