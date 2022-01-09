
import {BuildBlock} from '../tool_item/BuildBlock.js'

import {ShipFloor} from '../ship_block/ShipFloor.js';
import {FirePlace} from '../ship_block/FirePlace.js';
import {DroneHome} from '../ship_block/DroneHome.js';
import {DryLack} from '../ship_block/DryLack.js';
import {ShipFrame} from '../ship_block/ShipFrame.js';
import {WaterPlace} from '../ship_block/WaterPlace.js';
import {WaterPlace2} from '../ship_block/WaterPlace2.js';
import {ShipFarm} from '../ship_block/ShipFarm.js';
import {ShipFarmWet} from '../ship_block/ShipFarmWet.js';
import {VictoryRocket} from '../ship_block/VictoryRocket.js';
import {FuelEngine} from '../ship_block/FuelEngine.js';
import {WeaponAirCannon} from '../ship_block/WeaponAirCannon.js';
import {LevelFlag1} from '../ship_block/LevelFlag1.js';
import {LevelFlag2} from '../ship_block/LevelFlag2.js';
import {LevelFlag3} from '../ship_block/LevelFlag3.js';

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
            ['燃料で動く自動空気砲です。','燃料を投入すると、自動で敵を攻撃します。'],
            ['metal','mech_parts'],
            [10,10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponAirCannon( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['燃料式のエンジンです。','燃料を投入すると、舟を前に進めます。'],
            ['metal','mech_parts'],
            [10,10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new FuelEngine( game ) ); },
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
            ['設置すると舟レベルを[1]に上げます。','上位の敵が出現します。'],
            ['wood', 'cloth'],
            [5, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag1( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['設置すると舟レベルを[2]に上げます。','上位の敵が出現します。'],
            ['wood', 'cloth'],
            [5, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag2( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['設置すると舟レベルを[3]に上げます。','上位の敵が出現します。'],
            ['wood', 'cloth'],
            [5, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new LevelFlag3( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['1機のドローンを放出・維持する基地です。','(まだ)'],
            ['metal', 'plastic','mech_parts'],
            [5, 5, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new DroneHome( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['水飲み場です。', 'より短い時間経過で飲み水がたまります。'],
            ['metal', 'plastic'],
            [10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WaterPlace( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['水が自然にたまるバケツです。', '時間経過で飲み水がたまります。'],
            ['metal', 'plastic'],
            [10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WaterPlace2( game ) ); },
            ''
        );


        c_r.add_recipe( category,
            ['作物を育てます。'],
            ['leftover', 'wood'],
            [5, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFarmWet( game ) ); },
            '2'
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
