
import {BuildBlock} from '../tool_item/BuildBlock.js'

import {ShipFloor} from '../ship_block/ShipFloor.js';
import {ShipFrame} from '../ship_block/ShipFrame.js';
import {VictoryRocket} from '../ship_block/VictoryRocket.js';
import {LevelFlag1} from '../ship_block/LevelFlag1.js';
import {LevelFlag2} from '../ship_block/LevelFlag2.js';
import {LevelFlag3} from '../ship_block/LevelFlag3.js';



// ブロック、構造物、基本設備、レベルアップ

// import {} from '../ship_block/.js';

export class RecipeShipBlock extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r, category ){

        c_r.add_recipe( category,
            ['船の床ブロックです。',
            '使用して配置できます。'],
            ['wood'],
            [10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFloor( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['ヴィクトリーロケット。','これを設置して作動させたら*勝利*です。'],
            ['fuel'],
            [99],
            function( game ){ return new BuildBlock( game ).set_ship_block( new VictoryRocket( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['舟の骨組みです。','床と違って上に乗れません。'],
            ['wood'],
            [1],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFrame( game ) ); },
            ''
        );


        c_r.add_recipe( category,
            ['設置すると舟レベルを[1]に上げます。','上位の敵が出現します。'],
            ['wood', 'cloth', 'feather'],
            [20, 15, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag1( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['設置すると舟レベルを[2]に上げます。','上位の敵が出現します。'],
            ['plastic', 'lead'],
            [30, 15],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag2( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['設置すると舟レベルを[3]に上げます。','上位の敵が出現します。'],
            ['silver', 'fur', 'feather'],
            [50, 30, 100],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag3( game ) ); },
            ''
        );


    }
}
