
import {BuildBlock} from '../tool_item/BuildBlock.js'

import {ShipFloor} from '../ship_block/ShipFloor.js';
import {FirePlace} from '../ship_block/FirePlace.js';
import {DroneHome} from '../ship_block/DroneHome.js';
import {DryLack} from '../ship_block/DryLack.js';
import {ShipFrame} from '../ship_block/ShipFrame.js';
import {WaterPlace} from '../ship_block/WaterPlace.js';
import {ShipFarm} from '../ship_block/ShipFarm.js';
import {VictoryRocket} from '../ship_block/VictoryRocket.js';

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
            ['船に設置する焚き火です。',
            '配置して、生の食材を調理できます。'],
            ['wood'],
            [10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new FirePlace( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['ヴィクトリーロケット。','これを設置して作動させたら*勝利*です。'],
            ['bone'],
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
            ['食材を乾燥させます。'],
            ['wood', 'cloth'],
            [5, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new DryLack( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['1機のドローンを放出・維持する基地です。'],
            ['metal', 'plastic','mech_parts'],
            [5, 5, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new DroneHome( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['水飲み場です。 時間経過で飲み水がたまります。'],
            ['metal', 'plastic'],
            [10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WaterPlace( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['作物を育てます。'],
            ['leftover', 'wood'],
            [5, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFarm( game ) ); },
            ''
        );

    }
}
