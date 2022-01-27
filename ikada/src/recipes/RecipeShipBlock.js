
import {BuildBlock} from '../tool_item/BuildBlock.js'


import {ShipFloor} from '../ship_block/ShipFloor.js';
import {CommonBlock} from '../ship_block/CommonBlock.js';
import {ShipFrame} from '../ship_block/ShipFrame.js';




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


    }
}
