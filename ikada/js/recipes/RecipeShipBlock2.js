
import {BuildBlock} from '../tool_item/BuildBlock.js'

import {BotHouseDog} from '../ship_block/BotHouseDog.js';
import {BotHouseCat} from '../ship_block/BotHouseCat.js';

import {FuelEngine} from '../ship_block/FuelEngine.js';
import {WeaponAirCannon} from '../ship_block/WeaponAirCannon.js';
import {WeaponCatapult} from '../ship_block/WeaponCatapult.js';
import {WeaponMachineGun} from '../ship_block/WeaponMachineGun.js';
import {WeaponMortorTube} from '../ship_block/WeaponMortorTube.js';

import {WaterPlace} from '../ship_block/WaterPlace.js';
import {WaterPlace2} from '../ship_block/WaterPlace2.js';
import {ShipFarm} from '../ship_block/ShipFarm.js';
import {ShipFarmWet} from '../ship_block/ShipFarmWet.js';

import {FirePlace} from '../ship_block/FirePlace.js';
import {DryLack} from '../ship_block/DryLack.js';

// import {} from '../tool_item/.js';

// 武装、生産系、家具

export class RecipeShipBlock2 extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category ){

        c_r.add_recipe( category,
            ['船に設置する焚き火です。',
            '配置して、生の食材を調理できます。'],
            ['wood', 'stone'],
            [10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new FirePlace( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['食材を乾燥させます。'],
            ['wood', 'cloth'],
            [10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new DryLack( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['自動で敵を撃つ空気砲です。','燃料を投入すると、自動で敵を攻撃します。'],
            ['parts', 'iron'],
            [3, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponAirCannon( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['自動で敵を撃つ投石機です。','カタパルト弾を投入すると、自動で敵を攻撃します。'],
            ['parts', 'wood'],
            [3, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponCatapult( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['自動で敵を撃つ機銃です。','弾薬を投入すると、自動で敵を攻撃します。'],
            ['circuit','parts', 'iron'],
            [3, 3, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponMachineGun( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['自動で敵を撃つ大砲です。','砲弾を投入すると、自動で敵を攻撃します。'],
            ['parts', 'lead', 'silver'],
            [5, 10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponMortorTube( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['燃料式のエンジンです。','燃料を投入すると、舟を前に進めます。'],
            ['iron', 'parts'],
            [10, 2],
            function( game ){ return new BuildBlock( game ).set_ship_block( new FuelEngine( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['水飲み場です。', 'より短い時間経過で飲み水がたまります。'],
            ['parts', 'stone', 'jar'],
            [1, 15, 1],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WaterPlace( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['水が自然にたまるバケツです。', '時間経過で飲み水がたまります。'],
            ['iron', 'stone'],
            [5, 1],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WaterPlace2( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['食用の作物を育てます。'],
            ['leftover', 'wood'],
            [10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFarmWet( game ) ); },
            '1'
        );
        c_r.add_recipe( category,
            ['食用の作物を育てます。'],
            ['leftover', 'plastic'],
            [10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFarmWet( game ) ); },
            '2'
        );
        c_r.add_recipe( category,
            ['木材を育てます。'],
            ['leftover', 'iron', 'stone'],
            [30, 10, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFarm( game ) ); },
            '3'
        );


        c_r.add_recipe( category,
            ['イヌ型ロボットです。','砲撃を優先して手伝ってくれます。'],
            ['parts', 'circuit', 'plastic', 'silver'],
            [10, 5, 10, 3],
            function( game ){ return new BuildBlock( game ).set_ship_block( new BotHouseDog( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['ネコ型ロボットです。','弾薬や燃料の補給を優先して手伝ってくれます。'],
            ['parts', 'circuit', 'plastic', 'silver'],
            [10, 5, 10, 3],
            function( game ){ return new BuildBlock( game ).set_ship_block( new BotHouseCat( game ) ); },
            ''
        );



    }
}
