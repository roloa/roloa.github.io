
import {BuildBlock} from '../tool_item/BuildBlock.js'


import {ShipFloor} from '../ship_block/ShipFloor.js';
import {CommonBlock} from '../ship_block/CommonBlock.js';
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
            ['船の床ブロックです。',
            '使用して配置できます。'],
            ['stone'],
            [10],
            function( game ){
                let block = new CommonBlock( game );
                block.set_image( 'ship_floor_stone' );
                block.name = '石製ブロック';
                return new BuildBlock( game ).set_ship_block( block ); },
            ''
        );
        c_r.add_recipe( category,
            ['船の床ブロックです。',
            '使用して配置できます。'],
            ['jar'],
            [10],
            function( game ){
                let block = new CommonBlock( game );
                block.set_image( 'ship_floor_glass' );
                block.name = 'ガラスブロック';
                return new BuildBlock( game ).set_ship_block( block ); },
            ''
        );
        c_r.add_recipe( category,
            ['船の床ブロックです。',
            '使用して配置できます。'],
            ['iron'],
            [10],
            function( game ){
                let block = new CommonBlock( game );
                block.set_image( 'ship_floor_iron' );
                block.name = '鉄製ブロック';
                return new BuildBlock( game ).set_ship_block( block ); },
            ''
        );
        c_r.add_recipe( category,
            ['船の床ブロックです。',
            '使用して配置できます。'],
            ['plastic'],
            [10],
            function( game ){
                let block = new CommonBlock( game );
                block.set_image( 'ship_floor_plastic' );
                block.name = 'プラ製ブロック';
                return new BuildBlock( game ).set_ship_block( block ); },
            ''
        );
        c_r.add_recipe( category,
            ['船の床ブロックです。',
            '使用して配置できます。'],
            ['silver'],
            [10],
            function( game ){
                let block = new CommonBlock( game );
                block.set_image( 'ship_floor_silver' );
                block.name = '銀製ブロック';
                return new BuildBlock( game ).set_ship_block( block ); },
            ''
        );


        c_r.add_recipe( category,
            ['舟の骨組みです。','床と違って上に乗れません。'],
            ['wood'],
            [5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFrame( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['舟の骨組みです。','床と違って上に乗れません。'],
            ['iron'],
            [5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFrame( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['舟の骨組みです。','床と違って上に乗れません。'],
            ['silver'],
            [5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFrame( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['設置すると舟レベルを[1]に上げます。','上位の敵が出現します。'],
            ['wood', 'cloth', 'feather'],
            [30, 20, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag1( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['設置すると舟レベルを[2]に上げます。','上位の敵が出現します。'],
            ['plastic', 'lead'],
            [100, 100],
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
